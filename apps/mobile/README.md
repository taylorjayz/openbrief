# OpenBrief Mobile (Expo)

TikTok-style vertical feed of short engineering briefs. v0.1 scaffold for Henry / Maya.

## Prerequisites

- Node 20+ (this box: check with `node -v`)
- [Expo Go](https://expo.dev/go) on a physical iPhone/Android **or** an emulator/simulator on a capable host

**This Linux box has no iOS Simulator.** For iOS: use Expo Go on a device, or run on macOS with Xcode Simulator. Android: use an emulator if installed (`emulator -list-avds`), otherwise Expo Go on device.

## Install

```bash
cd /workspace/openbrief/apps/mobile
npm install
```

## Run

```bash
npx expo start
```

Then:

| Target | How |
|--------|-----|
| **iOS device** | Install Expo Go → scan QR from terminal / Dev Tools. Or press `i` on macOS with Simulator. |
| **iOS Simulator** | Needs macOS + Xcode. Not available on this Linux box. |
| **Android device** | Expo Go → scan QR (same network). Or press `a` if an emulator/device is connected via adb. |
| **Android emulator** | Start an AVD, then `a` in the Expo CLI, or `npm run android`. |

Shortcuts after `npx expo start`:

- `i` — open iOS simulator (macOS only)
- `a` — open Android emulator / connected device
- `w` — web (stretch; not v0.1 primary)

## Refresh feed content

Source of truth: `../../../briefs/feed.json` (repo `briefs/feed.json`).

App copy: `src/data/feed.json`

```bash
./scripts/sync-feed.sh
# or: npm run sync-feed
# or:
cp ../../../briefs/feed.json src/data/feed.json
```

Metro may need a reload after sync (`r` in Expo CLI).

## App shell (native-feel polish)

Simple tab state in `App.tsx` (no react-navigation): **Home | Feed | Topics**.

| File | Role |
|------|------|
| `App.tsx` | Tab state machine + shared tag filters |
| `src/screens/HomeScreen.tsx` | Splash / wordmark / Start reading |
| `src/screens/FeedScreen.tsx` | Vertical snap feed + filter chips + haptics |
| `src/screens/TopicsScreen.tsx` | Controlled tag filters |
| `src/components/TabBar.tsx` | Bottom Home / Feed / Topics |
| `src/components/BriefCard.tsx` | Card layout, attribution (always visible) |
| `src/constants/tags.ts` | Controlled tags only (scale-rules) |
| `specs/ui-feed.md` (repo) | Design notes |

Run: `npx expo start` then `w` for web, or `npx expo start --web`.

## Types

`src/types.ts` — `Brief`, `BriefSource`, `Feed` matching `specs/brief-schema.md`. Theme tokens: `src/theme.ts`.

## Interests / For you (OB-006, no telemetry — OB-007)

On-device prefs only. **No analytics SDKs or event emitters.**

| File | Role |
|------|------|
| `src/interests/storage.ts` | `getInterests` / `setInterests` (AsyncStorage; tags validated) |
| `src/interests/sortForYou.ts` | `sortBriefsForYou(briefs, tags)` |
| `src/interests/index.ts` | Maya re-exports + wire-up notes |
| `src/constants/privacy.ts` | `PRIVACY_ONELINER` (Maya places on Home) |
| `src/screens/InterestsOnboardingStub.tsx` | Thin stub — Maya owns real onboarding |

FeedScreen loads interests and applies For-you sort when tags are set; empty prefs → `order`. Topics chips remain a manual filter override.

```bash
npm run assert-interests
npx tsc --noEmit
```

## No accounts

v0.1 has no auth / paywall.
