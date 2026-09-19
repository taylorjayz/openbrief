"""Repo-relative paths. Worker may only write under candidates/."""

from __future__ import annotations

from pathlib import Path

# tools/ingest/ -> openbrief/
REPO_ROOT = Path(__file__).resolve().parents[2]
BRIEFS_DIR = REPO_ROOT / "briefs"
FEED_JSON = BRIEFS_DIR / "feed.json"
CANDIDATES_DIR = REPO_ROOT / "candidates"
APPROVED_STAGING = CANDIDATES_DIR / "approved"
