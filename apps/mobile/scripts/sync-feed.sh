#!/usr/bin/env bash
# Refresh app-local feed copy from the shared briefs/ source of truth.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
SRC="$ROOT/briefs/feed.json"
DEST="$(cd "$(dirname "$0")/.." && pwd)/src/data/feed.json"
cp "$SRC" "$DEST"
echo "Synced $SRC -> $DEST"
node -e "const f=require('$DEST'); console.log('briefs:', f.briefs.length);"
