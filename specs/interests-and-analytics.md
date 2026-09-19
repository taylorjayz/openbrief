# OpenBrief — Interests + Privacy (OB-006 revised)

**Taylor decision (2026-09-18):** We **do not collect** analytics/customer data. Market that posture.

## Interests (still OK — on-device only)

1. Onboarding multi-select from **controlled tags**
2. Stored **only on-device** — never synced to our servers
3. **For you** sort uses local prefs only
4. No account required

## Analytics / data collection — OFF

- **Do not** emit `card_view` / `swipe` / `tag_tap` / `source_open` (or any telemetry) to a backend
- **Do not** use third-party analytics SDKs
- Editorial targeting uses **manual** judgment + feed composition (see Sarah’s editorial note), not user telemetry

## Marketing claim (Sarah)

Honest line: *OpenBrief doesn’t collect your reading data. Interests stay on your device.*

Do not claim “we never store anything” if we later add crash logs — for now: no behavioral collection.

## Owners

| Piece | Owner |
|-------|--------|
| Spec | Kev |
| Local prefs + For you (no telemetry) | Henry / Maya |
| Privacy marketing copy | Sarah |
| QA: no network analytics calls | Tess |
