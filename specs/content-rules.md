# OpenBrief — Content Rules (v0.1)

Owner: **Kev** (systems / scope)  
Decision: **OB-001**, **OB-002** (platforms)

## Product definition

OpenBrief is a **vertical scroll of short, readable engineering briefs** — not a video app. Each card teaches one idea via a **summary we write**, pointing at a **real openly licensed source**.

## What “engineering” covers (v0.1)

In scope for sample briefs:

- Software engineering (languages, tools, practices, open-source culture)
- Systems / infrastructure (networks, OS concepts, reliability basics)
- Electrical / electronics fundamentals (when source is openly licensed)
- Mechanical / civil / general engineering concepts (same license bar)

Out of scope for v0.1:

- Medical / clinical advice
- Paywalled academic PDFs we can’t redistribute
- “How to bypass DRM / pirate content”
- Pure entertainment with no teaching goal

## Allowed sources (must meet ALL)

1. **Publicly reachable URL** we can link
2. **Clear open license or public-domain dedication**, e.g.:
   - Creative Commons: CC0, CC BY, CC BY-SA (note share-alike)
   - Permissive software/docs: MIT, Apache-2.0, BSD (docs explicitly licensed)
   - Public domain / US government works where applicable
3. **We summarize in our own words** — we do **not** paste copyrighted full articles or substantial verbatim excerpts
4. Attribution fields filled on every card (see schema)

### Preferred starter pools

- Mozilla MDN (check page license; typically CC BY-SA)
- Wikipedia / Wikimedia (CC BY-SA)
- Official FOSS project docs (MIT/Apache/CC where stated)
- FreeCodeCamp, DevDocs-linked FOSS material **only if** license is clear on the page
- Project READMEs / ADRs under OSI-approved licenses

### Disallowed

- All-rights-reserved blogs/news with no open license
- Invented quotes or fake citations
- Images we don’t have rights to (use license-clear diagrams or none in v0.1)
- AI-generated “sources” that don’t exist

## Attribution (required on every card)

Every brief must expose:

- `source_title`
- `source_url`
- `license` (SPDX-ish string, e.g. `CC-BY-SA-4.0`)
- `attribution_text` (human-readable credit line)

UI must show attribution chrome **on the card**, not only in a buried footer.

## Summary writing rules (Sarah)

- 80–180 words target; teach one idea
- Own words; short quotes ≤15 words only if license allows and quote is marked
- No plagiarism of distinctive phrasing from closed sources
- Tag with 1–3 topic tags from the controlled list below

## Topic tags (v0.1 controlled list)

`software` · `systems` · `web` · `oss` · `electronics` · `networks` · `reliability` · `practices`

Add tags only via Kev (rules change).

## Quality bar for ≥8 samples

Each sample must:

1. Pass license check (recorded in brief frontmatter)
2. Have working `source_url`
3. Match an in-scope engineering topic
4. Include visible attribution

## Non-goals (v0.1)

- User accounts / follows
- Recommendations ML
- Video / audio playback
- Offline package of full source articles


## Platforms (v0.1) — OB-002

- **Primary:** Expo (or equivalent) **iOS + Android** one codebase
- Shared brief content layer (markdown/JSON from `/briefs/`)
- Mobile-web is optional stretch — not a substitute for native-feel mobile
- Content rules (license/attribution) are platform-agnostic; every card still shows attribution chrome
