# OpenBrief — iOS TestFlight Beta: Scope + Release Checklist

Decision: **OB-010** (2026-10-17) · Owner: Kev · Bundle ID: `com.taylorjayz.openbrief`

## In v0.1 beta

- Home / Feed / Topics tabs; vertical snap feed
- 24 FOSS/CC briefs (MDN, Wikipedia, project docs) with attribution + license + Open source link on every card
- Controlled-tag Topics filters
- Onboarding interest picker, **on-device only** (For you sort)
- Privacy line: "Your reading stays on your phone. We don't collect your data." (OB-007)
- Offline-safe bundled content (feed ships in app)

## Out of v0.1 beta

- Accounts, sync, or profiles
- Analytics, telemetry, crash-reporting SDKs that send user data (OB-007). If crash logs are added later, update the privacy policy first.
- Push notifications
- In-app ingest or remote feed updates (new briefs ship by app update)
- iPad layout: `ios.supportsTablet: false` for beta (iPhone only)
- Android Play beta (iOS TestFlight only for now)
- Paywall or ads
- BrightPath (paused at D-010)

## Release checklist

### Before Apple approval (no credentials needed)
- [x] Henry: `eas.json` with preview + production profiles (2026-11-06 Main Bot prep; ascAppId placeholder)
- [x] Henry: `app.json` has bundle ID, `version` 0.1.0, `ios.buildNumber` 1 (2026-11-06)
- [ ] Henry: native iOS build compiles (EAS/local prebuild)
- [x] Maya: 1024px app icon + splash present on disk; native safe-area check still pending on device
- [x] Sarah: App Store description, keywords, privacy policy page live at a public URL — `content/app-store-listing.md` + https://taylorjayz.github.io/openbrief/privacy-policy.html (2026-11-06)
- [x] Kev: content audit (every brief has url/license/attribution; tags controlled; no ITC/BrightPath leakage) — PASS 2026-11-06 (`qa/content-audit-2026-11-06.md`)
- [x] Tess: native iOS test plan ready (`qa/ios-testflight-test-plan.md`)

### After Taylor's Apple Developer approval
- [ ] Taylor signs in to App Store Connect himself (agents don't hold his Apple login)
- [ ] Create app record for `com.taylorjayz.openbrief`
- [ ] App Privacy questionnaire answered: **Data Not Collected**
- [ ] Export compliance answered (standard HTTPS only)
- [ ] `eas build --platform ios --profile production`
- [ ] `eas submit` to TestFlight (only after approval)
- [ ] Internal testers added (Taylor first)

### Beta gate (go/no-go)
- [ ] Tess PASS on first TestFlight build (feed, tabs, filters, onboarding, source links, safe areas)
- [ ] No network calls besides opening source links in the browser
- [ ] Attribution visible on every card on a real device
- [ ] Taylor installs from TestFlight and confirms

## Known risks
- Apple approval timing (1–2 days)
- Review notes: content is summaries with attribution, not copied articles
