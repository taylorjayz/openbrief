"""Read feed + candidates; write only under candidates/."""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from paths import APPROVED_STAGING, CANDIDATES_DIR, FEED_JSON


def load_feed_source_urls() -> set[str]:
    if not FEED_JSON.exists():
        return set()
    data = json.loads(FEED_JSON.read_text(encoding="utf-8"))
    urls: set[str] = set()
    for b in data.get("briefs", []):
        src = b.get("source") or {}
        u = src.get("url")
        if u:
            urls.add(_norm_url(u))
    return urls


def _norm_url(url: str) -> str:
    return url.strip().rstrip("/")


def iter_candidate_files() -> list[Path]:
    if not CANDIDATES_DIR.exists():
        return []
    return sorted(CANDIDATES_DIR.glob("ob-cand-*.json"))


def load_existing_candidate_urls() -> set[str]:
    urls: set[str] = set()
    for path in iter_candidate_files():
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        proposed = data.get("proposed") or {}
        src = proposed.get("source") or {}
        u = src.get("url")
        if u:
            urls.add(_norm_url(u))
    return urls


def next_candidate_id() -> str:
    nums: list[int] = []
    for path in iter_candidate_files():
        m = re.search(r"ob-cand-(\d+)\.json$", path.name)
        if m:
            nums.append(int(m.group(1)))
    n = (max(nums) + 1) if nums else 1
    return f"ob-cand-{n:03d}"


def write_candidate(doc: dict[str, Any]) -> Path:
    CANDIDATES_DIR.mkdir(parents=True, exist_ok=True)
    cid = doc["candidate_id"]
    # Hard rule: never write briefs/
    path = CANDIDATES_DIR / f"{cid}.json"
    if not str(path.resolve()).startswith(str(CANDIDATES_DIR.resolve())):
        raise RuntimeError("refusing to write outside candidates/")
    path.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return path


def load_candidate(candidate_id: str) -> tuple[Path, dict[str, Any]]:
    path = CANDIDATES_DIR / f"{candidate_id}.json"
    if not path.exists():
        # also allow path-like argument
        alt = Path(candidate_id)
        if alt.exists():
            path = alt
        else:
            raise FileNotFoundError(f"candidate not found: {candidate_id}")
    data = json.loads(path.read_text(encoding="utf-8"))
    return path, data


def iso_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def ensure_approved_staging() -> Path:
    APPROVED_STAGING.mkdir(parents=True, exist_ok=True)
    return APPROVED_STAGING
