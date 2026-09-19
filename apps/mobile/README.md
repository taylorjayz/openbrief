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

## Maya — where to polish UI

| File | Role |
|------|------|
| `src/components/BriefCard.tsx` | Card layout, type, attribution chrome |
| `src/screens/FeedScreen.tsx` | Vertical FlatList paging / snap |
| `specs/ui-feed.md` (repo) | Design notes |

## Types

`src/types.ts` — `Brief`, `BriefSource`, `Feed` matching `specs/brief-schema.md`. Theme tokens: `src/theme.ts`.

## No accounts

v0.1 has no auth / paywall.
