# OpenBrief ingest worker (Henry stub)

Automates **discover → license gate → draft** into `candidates/`.  
**Never** writes `briefs/feed.json` or `briefs/ob-*.md`. Auto-discover yes; auto-publish no.

## Run

From repo root (`openbrief/`):

```bash
python3 tools/ingest/cli.py discover --limit 3
python3 tools/ingest/cli.py gate
python3 tools/ingest/cli.py draft --limit 3

# or one shot:
python3 tools/ingest/cli.py run --limit 3
```

Offline (skip title fetch):

```bash
python3 tools/ingest/cli.py run --limit 3 --offline
```

## Promote (Sarah only)

Refuses unless `--i-am-sarah` + edited candidate path. Still does **not** write `feed.json`.

```bash
python3 tools/ingest/cli.py promote --i-am-sarah candidates/ob-cand-001.json
# optional staging copy under candidates/approved/:
python3 tools/ingest/cli.py promote --i-am-sarah candidates/ob-cand-001.json --copy-staging
```

## Tests

```bash
python3 tools/ingest/test_license_gate.py
```

## Reject reasons

See table in `specs/ingest-pipeline.md` (Sarah codes: `bad_license`, `too_thin`, …).
