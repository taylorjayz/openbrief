# Editorial targeting note (OB-006)

Owner: **Sarah** · Inputs: on-device interest tags only (OB-007: **no data collection** / no analytics) · Editorial judgment + tag coverage gaps

## Current catalog gaps (24 briefs, 2026-09-18)

| Tag | Count | Editorial call |
|-----|------:|----------------|
| software | 17 | Healthy — don’t pad |
| web | 12 | Healthy |
| practices | 11 | Healthy |
| networks | 6 | OK — add 1–2 if For you shows demand |
| oss | 5 | OK |
| systems | 5 | OK — thicken if Systems interest wins onboarding |
| reliability | 3 | **Thin** — priority gap fill |
| electronics | 2 | **Thin** — priority gap fill |

Rule: **gap fill > vanity volume.** Prefer new FOSS sources that teach under thin tags; keep domain diversity (~40% cap).

## How we’ll decide what to write next (no telemetry)

1. **Tag coverage gaps** — thicken thin tags (`reliability`, `electronics`) first  
2. **Qualitative feedback** — App Store reviews, GitHub issues, Taylor/user notes  
3. **On-device prefs are local** — we never see them; don’t plan editorial on phantom dashboards  
4. **Ingest queue** — prioritize FOSS candidates under thin tags

## Near-term content plan (no analytics yet)

1. +2–3 **reliability** briefs (FOSS docs: SRE-ish project docs, K8s probes, etc. — license gate first)  
2. +2–3 **electronics** briefs (Arduino/CC docs once pool approved; Kirchhoff/Ohm already cover basics)  
3. Hold software/web/practices unless a candidate is uniquely strong  
4. Ingest queue: prioritize candidates tagged `reliability` or `electronics`

## Privacy

**We don’t collect user data** (OB-007). Market that clearly — see `privacy-marketing.md`. Editorial planning uses catalog gaps + public feedback only.
