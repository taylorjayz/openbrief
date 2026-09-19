# OpenBrief — Scale Rules (post v0.1)

Decisions: **OB-004**, **OB-005**

## Goal

Grow from 8 → **~20+ briefs** without diluting license/attribution quality.

## Still required (unchanged from OB-001)

- Real FOSS/CC (or public-domain) source URL
- Own-words summary (80–180 words)
- Attribution + license on every card
- No invented copyrighted text / no all-rights-reserved sources

## Categories / filters

- **Categories** for UI filters = groupings of the **controlled tag list** (do not invent free-text categories that bypass tags).
- v0.1 tags remain: `software` · `systems` · `web` · `oss` · `electronics` · `networks` · `reliability` · `practices`
- New tags only via Kev (rules change) — Sarah proposes, Kev approves in `content-rules.md`
- Suggested filter chips (UI): map 1:1 to tags or small bundles (e.g. “Web” → `web`, “Systems” → `systems`+`networks`+`reliability`)

## Source diversity

- Prefer ≥3 distinct domains in the 20+ set (already MDN + Wikipedia — add more **approved** pools: project docs with clear CC/MIT/Apache)
- Cap: no more than ~40% of feed from a single domain unless Kev waives

## Feed.json

- Keep schema; bump `order` sequentially
- Henry’s sync path unchanged; no body invent in the app

## Out of scope for this scale pass

- User accounts / personalized recs
- Video
- Closed-license news aggregators
