# OpenBrief — Ingest Pipeline (scale)

Decisions: OB-001, OB-005 · Owners: Kev (rules), Henry (worker), Sarah (approve), Maya (filters UI)

## Goal

Automate **discovery + license gating + draft slots**. Never auto-publish to `feed.json`.

## Stages

```
discover → license_gate → draft_summary → candidates/ → Sarah approve → briefs/ + feed.json
```

| Stage | Who | Output |
|-------|-----|--------|
| 1. Discover | Worker | Candidate URLs from approved pools (Wikimedia, MDN, approved doc sites, GitHub repos with clear LICENSE) |
| 2. License gate | Worker | Pass only if SPDX/open license detectable on page or known pool policy; else `reject: bad_license` |
| 3. Draft summary | Worker (LLM ok) | Own-words draft 80–180 words + proposed tags from **controlled list only**; never paste full article |
| 4. Queue | Worker | Write `candidates/ob-cand-NNN.json` (schema below) |
| 5. Human approve | Sarah | Edit summary, fix tags/attribution, promote → `briefs/` + rebuild `feed.json`; or reject with reason |
| 6. App | Henry sync / Maya UI | Feed + tag filters only see approved briefs |

## Candidate schema

```json
{
  "candidate_id": "ob-cand-001",
  "status": "pending",
  "proposed": {
    "title": "",
    "summary": "",
    "tags": ["software"],
    "source": {
      "title": "",
      "url": "",
      "license": "",
      "attribution_text": ""
    }
  },
  "discovery": {
    "pool": "mdn|wikipedia|github_docs|other_approved",
    "found_at": "ISO-8601"
  },
  "gate": {
    "license_ok": true,
    "notes": ""
  },
  "reject_reason": null
}
```

## Reject reasons (Sarah)

| Code | Meaning |
|------|---------|
| `bad_license` | Not clearly FOSS/CC/PD |
| `too_thin` | Source or draft doesn’t teach enough |
| `duplicate_topic` | Too close to an existing brief |
| `out_of_scope` | Not engineering / wrong audience |
| `attribution_unclear` | Can’t form honest credit line |
| `url_dead` | Source not reachable |

## Hard rules

- Worker **must not** write `briefs/feed.json` or `briefs/ob-*.md`
- No full-article storage in repo (link only)
- Tags only from controlled list in `content-rules.md`
- Domain diversity soft cap (~40% one domain) checked at approve time
- Rate-limit external APIs; respect robots/ToS

## v0 folders

```
openbrief/
  candidates/     # pending + rejected
  briefs/         # approved only + feed.json
  specs/ingest-pipeline.md
```

## Henry stub (suggested)

1. CLI or cron: `discover` → `gate` → `draft` → write `candidates/*.json`
2. Script Sarah runs (or Henry provides): `promote <candidate_id>` after she edits → appends feed
3. Tests: bad license never reaches `pending` with `license_ok: true`

## Maya

No ingest UI required for v0. Filter chips read approved `feed.json` tags only.
