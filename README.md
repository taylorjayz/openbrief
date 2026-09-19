# OpenBrief

TikTok-style **vertical feed of short article summaries** that teach engineering topics — built only on **free & open-source / openly licensed** content. Attribution on every card.

**Status:** v0.1 kickoff  
**BrightPath:** paused at D-010 (separate)

## v0.1 done-when

- **Expo (or RN) app:** vertical feed (next/prev) on **iOS + Android** (shared content layer; mobile-web stretch only)
- ≥8 sample briefs from real FOSS/CC sources (link + license)
- Topic tags
- Clean mobile-web layout
- No accounts, no paywall, no invented copyrighted text

## Owners

| Lane | Owner |
|------|--------|
| Scope + content rules | Kev |
| Brief curation + summaries | Sarah |
| Feed UI/UX | Maya |
| Expo scaffold + feed data shape (iOS + Android) | Henry |
| QA | Tess |

## Folder map

| Path | Purpose |
|------|---------|
| `specs/content-rules.md` | Allowed sources, licenses, attribution, “engineering” scope |
| `specs/brief-schema.md` | Feed item fields for eng/UI |
| `specs/ui-feed.md` | Feed UI notes (Maya) |
| `sources/` | Approved source list |
| `briefs/` | Curated brief markdown + `feed.json` (summaries only) |
| `apps/mobile/` | Expo (TypeScript) iOS + Android app — vertical feed scaffold |
