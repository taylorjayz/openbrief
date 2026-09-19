#!/usr/bin/env python3
"""OpenBrief ingest pipeline stub (Henry).

Stages: discover → gate → draft → write candidates/*.json
Hard rules: NEVER write briefs/feed.json or briefs/ob-*.md; only candidates/.
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path
from typing import Any

# Allow running as script from tools/ingest/
sys.path.insert(0, str(Path(__file__).resolve().parent))

from draft import attribution_text, draft_summary, filter_tags  # noqa: E402
from fetch_title import fetch_title  # noqa: E402
from license_gate import gate_url  # noqa: E402
from paths import CANDIDATES_DIR, FEED_JSON  # noqa: E402
from pools import SEED_POOL  # noqa: E402
from store import (  # noqa: E402
    ensure_approved_staging,
    iso_now,
    load_candidate,
    load_existing_candidate_urls,
    load_feed_source_urls,
    next_candidate_id,
    write_candidate,
)


def cmd_discover(args: argparse.Namespace) -> int:
    feed_urls = load_feed_source_urls()
    cand_urls = load_existing_candidate_urls()
    seen = feed_urls | cand_urls
    limit = args.limit
    picked: list[dict] = []
    for seed in SEED_POOL:
        u = seed["url"].rstrip("/")
        if u in seen or seed["url"] in seen:
            continue
        picked.append(seed)
        if len(picked) >= limit:
            break

    if not picked:
        print("discover: no new seed URLs (all deduped against feed + candidates)")
        return 0

    # Persist a lightweight discovery queue for gate/draft (still under candidates/)
    queue_path = CANDIDATES_DIR / "_discover_queue.json"
    CANDIDATES_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "found_at": iso_now(),
        "items": [
            {
                "url": s["url"],
                "pool": s["pool"],
                "fallback_title": s["fallback_title"],
                "proposed_tags": s["proposed_tags"],
            }
            for s in picked
        ],
    }
    queue_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"discover: queued {len(picked)} URL(s) → {queue_path.relative_to(CANDIDATES_DIR.parent)}")
    for s in picked:
        print(f"  - [{s['pool']}] {s['url']}")
    return 0


def _load_queue() -> list[dict]:
    queue_path = CANDIDATES_DIR / "_discover_queue.json"
    if not queue_path.exists():
        return []
    data = json.loads(queue_path.read_text(encoding="utf-8"))
    return list(data.get("items") or [])


def cmd_gate(args: argparse.Namespace) -> int:
    """License-gate queued URLs; write rejected candidates immediately."""
    items = _load_queue()
    if not items:
        print("gate: empty queue — run discover first")
        return 1

    gated: list[dict] = []
    for item in items:
        url = item["url"]
        ok, license_id, notes = gate_url(url, page_text=None)
        row = {**item, "license_ok": ok, "license": license_id, "gate_notes": notes}
        gated.append(row)
        if not ok:
            cid = next_candidate_id()
            doc = _rejected_doc(cid, item, notes)
            path = write_candidate(doc)
            print(f"gate: REJECT {url} → {path.name} ({notes})")
        else:
            print(f"gate: OK {url} ({license_id})")

    out = CANDIDATES_DIR / "_gated_queue.json"
    out.write_text(
        json.dumps({"found_at": iso_now(), "items": gated}, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"gate: wrote {out.name}")
    return 0


def _rejected_doc(cid: str, item: dict, notes: str) -> dict[str, Any]:
    title = item.get("fallback_title") or item["url"]
    tags = filter_tags(item.get("proposed_tags") or [])
    return {
        "candidate_id": cid,
        "status": "rejected",
        "proposed": {
            "title": title,
            "summary": "",
            "tags": tags,
            "source": {
                "title": title,
                "url": item["url"],
                "license": "",
                "attribution_text": "",
            },
        },
        "discovery": {
            "pool": item.get("pool") or "other_approved",
            "found_at": iso_now(),
        },
        "gate": {
            "license_ok": False,
            "notes": notes,
        },
        "reject_reason": "bad_license",
    }


def cmd_draft(args: argparse.Namespace) -> int:
    """Draft own-words summaries for license_ok queue items; write pending candidates."""
    gated_path = CANDIDATES_DIR / "_gated_queue.json"
    if gated_path.exists():
        items = [
            i
            for i in json.loads(gated_path.read_text(encoding="utf-8")).get("items", [])
            if i.get("license_ok")
        ]
    else:
        # Allow draft from discover queue + inline gate
        items = []
        for item in _load_queue():
            ok, license_id, notes = gate_url(item["url"])
            if ok:
                items.append({**item, "license_ok": True, "license": license_id, "gate_notes": notes})
            else:
                cid = next_candidate_id()
                path = write_candidate(_rejected_doc(cid, item, notes))
                print(f"draft: auto-reject {item['url']} → {path.name}")

    if not items:
        print("draft: nothing to draft (run discover + gate)")
        return 1

    limit = args.limit
    written: list[str] = []
    for item in items[:limit]:
        cid = next_candidate_id()
        url = item["url"]
        pool = item.get("pool") or "other_approved"
        fetched = fetch_title(url) if not args.offline else None
        source_title = fetched or item.get("fallback_title") or url
        license_id = item.get("license") or ""
        tags = filter_tags(item.get("proposed_tags") or [])
        summary = draft_summary(source_title, pool, url)
        proposed_title = f"[DRAFT] {source_title}"
        doc = {
            "candidate_id": cid,
            "status": "pending",
            "proposed": {
                "title": proposed_title,
                "summary": summary,
                "tags": tags,
                "source": {
                    "title": source_title,
                    "url": url,
                    "license": license_id,
                    "attribution_text": attribution_text(source_title, pool, license_id),
                },
            },
            "discovery": {
                "pool": pool,
                "found_at": iso_now(),
            },
            "gate": {
                "license_ok": True,
                "notes": item.get("gate_notes") or "",
            },
            "reject_reason": None,
        }
        path = write_candidate(doc)
        written.append(cid)
        print(f"draft: {cid} pending → {path.name} ({source_title})")

    print(f"draft: wrote {len(written)} candidate(s): {', '.join(written)}")
    return 0


def cmd_run(args: argparse.Namespace) -> int:
    """discover → gate → draft in one shot."""
    rc = cmd_discover(args)
    if rc != 0:
        return rc
    rc = cmd_gate(args)
    if rc != 0:
        return rc
    return cmd_draft(args)


def cmd_promote(args: argparse.Namespace) -> int:
    """Sarah-only promote stub — never writes feed.json."""
    if not args.i_am_sarah:
        print(
            "promote: REFUSED — requires --i-am-sarah and a path to an edited candidate.\n"
            "  This stub never auto-publishes. Example:\n"
            "  python cli.py promote --i-am-sarah candidates/ob-cand-001.json"
        )
        return 2

    cand_arg = args.candidate
    if not cand_arg:
        print("promote: REFUSED — pass path or id of an already-edited candidate")
        return 2

    path, data = load_candidate(cand_arg)
    # Validate schema (minimal)
    required_top = ["candidate_id", "status", "proposed", "discovery", "gate"]
    missing = [k for k in required_top if k not in data]
    if missing:
        print(f"promote: schema invalid — missing {missing}")
        return 1
    proposed = data["proposed"]
    for k in ("title", "summary", "tags", "source"):
        if k not in proposed:
            print(f"promote: schema invalid — proposed.{k} missing")
            return 1
    src = proposed["source"]
    for k in ("title", "url", "license", "attribution_text"):
        if k not in src:
            print(f"promote: schema invalid — proposed.source.{k} missing")
            return 1
    if not data.get("gate", {}).get("license_ok"):
        print("promote: REFUSED — gate.license_ok is not true")
        return 1
    if data.get("status") == "rejected":
        print("promote: REFUSED — candidate status is rejected")
        return 1

    staging = ensure_approved_staging()
    dest = staging / path.name
    if args.copy_staging:
        shutil.copy2(path, dest)
        print(f"promote: copied to staging {dest.relative_to(CANDIDATES_DIR.parent)}")
    else:
        print("promote: schema OK (no staging copy; pass --copy-staging to copy)")

    print()
    print("=== Sarah: next steps (manual — worker will NOT write feed.json) ===")
    print(f"1. Edit summary/tags/attribution in {path}")
    print("2. Copy approved content into briefs/ as ob-NNN-*.md (your process)")
    print("3. Rebuild briefs/feed.json yourself (or existing rebuild script)")
    print("4. Do NOT ask the ingest worker to auto-publish — auto-publish is forbidden")
    print(f"5. feed.json path (DO NOT let worker touch): {FEED_JSON}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="openbrief-ingest",
        description="OpenBrief ingest stub (Henry) — writes only under candidates/",
    )
    sub = p.add_subparsers(dest="cmd", required=True)

    d = sub.add_parser("discover", help="Seed candidate URLs from approved MDN/Wikipedia pools")
    d.add_argument("--limit", type=int, default=3, help="Max new URLs to queue (default 3)")
    d.set_defaults(func=cmd_discover)

    g = sub.add_parser("gate", help="License-gate queued URLs; reject bad_license")
    g.set_defaults(func=cmd_gate)

    dr = sub.add_parser("draft", help="Write pending candidate JSON with DRAFT summaries")
    dr.add_argument("--limit", type=int, default=3, help="Max pending candidates to write")
    dr.add_argument("--offline", action="store_true", help="Skip network title fetch")
    dr.set_defaults(func=cmd_draft)

    r = sub.add_parser("run", help="discover → gate → draft")
    r.add_argument("--limit", type=int, default=3)
    r.add_argument("--offline", action="store_true")
    r.set_defaults(func=cmd_run)

    pr = sub.add_parser("promote", help="Sarah-only stub: validate + instruct; never writes feed")
    pr.add_argument("--i-am-sarah", action="store_true", dest="i_am_sarah")
    pr.add_argument("candidate", nargs="?", help="candidate id or path")
    pr.add_argument(
        "--copy-staging",
        action="store_true",
        help="Copy to candidates/approved/ staging (still no feed.json write)",
    )
    pr.set_defaults(func=cmd_promote)

    return p


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
