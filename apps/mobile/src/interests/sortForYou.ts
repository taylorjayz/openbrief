/**
 * For-you sort: prefer briefs whose tags intersect interest_tags;
 * stable fallback to brief.order within each bucket.
 */
import type { Brief } from '../types';

function intersectionCount(
  briefTags: readonly string[],
  interests: ReadonlySet<string>,
): number {
  let n = 0;
  for (const t of briefTags) {
    if (interests.has(t)) n += 1;
  }
  return n;
}

/**
 * Sort briefs preferring those matching interest tags.
 * If `tags` is empty, returns briefs sorted by `order` only.
 * Stable within equal match-score: lower `order` first, then original index.
 */
export function sortBriefsForYou(
  briefs: readonly Brief[],
  tags: readonly string[],
): Brief[] {
  const interests = new Set(
    tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean),
  );

  const indexed = briefs.map((brief, index) => ({ brief, index }));

  indexed.sort((a, b) => {
    if (interests.size > 0) {
      const scoreA = intersectionCount(a.brief.tags, interests);
      const scoreB = intersectionCount(b.brief.tags, interests);
      const matchedA = scoreA > 0 ? 1 : 0;
      const matchedB = scoreB > 0 ? 1 : 0;
      if (matchedA !== matchedB) return matchedB - matchedA;
      if (scoreA !== scoreB) return scoreB - scoreA;
    }
    if (a.brief.order !== b.brief.order) return a.brief.order - b.brief.order;
    return a.index - b.index;
  });

  return indexed.map((x) => x.brief);
}
