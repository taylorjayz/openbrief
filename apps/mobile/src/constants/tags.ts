import type { TopicTag } from '../types';

/**
 * Controlled topic tags only (content-rules / scale-rules).
 * Do not invent free-text tags here.
 */
export const CONTROLLED_TAGS: readonly TopicTag[] = [
  'software',
  'systems',
  'web',
  'oss',
  'electronics',
  'networks',
  'reliability',
  'practices',
] as const;

/** Display labels for filter chips (1:1 with controlled tags). */
export const TAG_LABELS: Record<TopicTag, string> = {
  software: 'Software',
  systems: 'Systems',
  web: 'Web',
  oss: 'OSS',
  electronics: 'Electronics',
  networks: 'Networks',
  reliability: 'Reliability',
  practices: 'Practices',
};
