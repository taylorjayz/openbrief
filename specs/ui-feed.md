# OpenBrief — Feed UI (v0.1)

**Owner:** Maya (UI/UX) · **Platform:** Expo iOS + Android · **Content:** `briefs/feed.json` (Sarah)

## Product feel
TikTok-*style* vertical paging of **readable briefs** (not video). One brief fills the phone viewport; swipe/scroll snaps to the next.

## Screens
1. **Feed** (default) — full-bleed vertical pager of brief cards
2. Optional later: tag filter sheet (stretch)

## Brief card layout (top → bottom)
| Zone | Content | Notes |
|------|---------|--------|
| Safe top | Progress dots or `3 / 8` | Subtle; not a cluttered chrome |
| Title | `title` | Large, high contrast |
| Tags | `tags[]` | Pill chips; tappable later |
| Body | `summary` | Scroll *inside* card only if overflow; prefer fit one screen |
| Attribution footer | `source.attribution_text` + license chip + “Open source” link to `source.url` | **Required on every card** — always visible, not hidden behind a tap |
| Safe bottom | Hint: swipe up for next | Fade after first swipe |

## Interaction
- Vertical snap paging (one card per page)
- Swipe up = next (`order`), swipe down = prev
- Open source URL via system browser / in-app browser
- No accounts, no paywall chrome

## Visual system (v0.1)
- Dark, calm reading surface (ink near-black, soft off-white type)
- Accent for tags / progress (electric teal or amber — pick one and stick)
- Comfortable type scale for phone (~22–28 title, ~16–17 body, ≥1.35 line-height)
- Respect notches / home indicator (`SafeAreaView`)
- Touch targets ≥44pt on links/chips

## Accessibility
- Dynamic type where Expo makes it easy
- Attribution contrast ≥ AA
- Announce card title on page change (screen reader)

## Data bind
Use Sarah’s schema fields only — do not invent body copy. Sort by `order`.

## Done-when (Maya)
- Feed looks native on phone viewport
- ≥8 briefs from `feed.json` page correctly
- Attribution visible on every card
- Henry can drop into Expo app routes/screens
