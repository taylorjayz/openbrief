/**
 * On-device interest prefs (OB-006). No account / server profile.
 * Tags must be from the controlled list in constants/tags.ts.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONTROLLED_TAGS } from '../constants/tags';
import type { TopicTag } from '../types';

const STORAGE_KEY = '@openbrief/interests_v1';

export type InterestsPrefs = {
  interest_tags: TopicTag[];
  updated_at: string;
};

const EMPTY: InterestsPrefs = {
  interest_tags: [],
  updated_at: new Date(0).toISOString(),
};

const CONTROLLED_SET = new Set<string>(CONTROLLED_TAGS);

/** Strip unknown / free-text tags. Pure — safe for tests. */
export function sanitizeInterestTags(tags: readonly string[]): TopicTag[] {
  const out: TopicTag[] = [];
  const seen = new Set<string>();
  for (const raw of tags) {
    if (typeof raw !== 'string') continue;
    const tag = raw.trim().toLowerCase();
    if (!CONTROLLED_SET.has(tag) || seen.has(tag)) continue;
    seen.add(tag);
    out.push(tag as TopicTag);
  }
  return out;
}

function parseStored(raw: string | null): InterestsPrefs {
  if (!raw) return { ...EMPTY, interest_tags: [] };
  try {
    const parsed = JSON.parse(raw) as Partial<InterestsPrefs>;
    const tags = sanitizeInterestTags(
      Array.isArray(parsed.interest_tags) ? parsed.interest_tags.map(String) : [],
    );
    const updated_at =
      typeof parsed.updated_at === 'string' && parsed.updated_at.length > 0
        ? parsed.updated_at
        : new Date().toISOString();
    return { interest_tags: tags, updated_at };
  } catch {
    return { ...EMPTY, interest_tags: [] };
  }
}

/** Load interests from AsyncStorage. Empty tags = no For-you preference yet. */
export async function getInterests(): Promise<InterestsPrefs> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return parseStored(raw);
  } catch {
    return { ...EMPTY, interest_tags: [] };
  }
}

/** Persist validated interest tags. Bad tags are stripped. */
export async function setInterests(
  tags: readonly string[],
): Promise<InterestsPrefs> {
  const prefs: InterestsPrefs = {
    interest_tags: sanitizeInterestTags(tags),
    updated_at: new Date().toISOString(),
  };
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Storage full / unavailable — still return sanitized prefs for in-session use
  }
  return prefs;
}
