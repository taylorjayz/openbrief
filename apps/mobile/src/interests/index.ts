/**
 * Interests API for Maya (onboarding / For you) — OB-006, no telemetry (OB-007).
 *
 * Wire-up:
 *   import { getInterests, setInterests, sortBriefsForYou } from '../interests';
 *   import { PRIVACY_ONELINER } from '../constants/privacy';
 *   import { CONTROLLED_TAGS } from '../constants/tags';
 *
 * Onboarding (Maya): multi-select from CONTROLLED_TAGS → await setInterests(selected)
 * For you: FeedScreen already loads getInterests() and sorts via sortBriefsForYou.
 *   Empty interest_tags → order-only feed (no preference yet).
 * Privacy copy: place PRIVACY_ONELINER on Home (Maya owns UI).
 */
export {
  getInterests,
  setInterests,
  sanitizeInterestTags,
  type InterestsPrefs,
} from './storage';
export { sortBriefsForYou } from './sortForYou';
