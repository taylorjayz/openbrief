# Candidates queue

Worker (Henry) writes pending / rejected JSON here. **Sarah** edits and promotes to `briefs/`. **Never auto-publish** to `feed.json`.

## How to run the ingest stub

From the OpenBrief repo root:

```bash
python3 tools/ingest/cli.py run --limit 3
```

Steps separately: `discover` → `gate` → `draft`. See `tools/ingest/README.md`.

Promote (Sarah only; still does not write feed):

```bash
python3 tools/ingest/cli.py promote --i-am-sarah candidates/ob-cand-001.json
```

## Schema

`ob-cand-NNN.json` — see `specs/ingest-pipeline.md` (candidate schema).

## Reject reasons (Sarah)

| Code | Meaning |
|------|---------|
| `bad_license` | Not clearly FOSS/CC/PD |
| `too_thin` | Source or draft doesn’t teach enough |
| `duplicate_topic` | Too close to an existing brief |
| `out_of_scope` | Not engineering / wrong audience |
| `attribution_unclear` | Can’t form honest credit line |
| `url_dead` | Source not reachable |

Full table: [`specs/ingest-pipeline.md`](../specs/ingest-pipeline.md#reject-reasons-sarah).

## Layout

| Path | Purpose |
|------|---------|
| `ob-cand-*.json` | Pending or rejected candidates |
| `approved/` | Optional staging after Sarah `promote --copy-staging` |
| `_discover_queue.json` / `_gated_queue.json` | Worker scratch (safe to delete) |

Hard rules: link only (no full-article storage); tags from controlled list in `specs/content-rules.md`.
