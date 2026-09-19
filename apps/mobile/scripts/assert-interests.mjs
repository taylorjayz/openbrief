/**
 * Jest-free assert script for OB-006 interests (no telemetry).
 * Run: node scripts/assert-interests.mjs
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// --- Pure helpers mirrored from TS (no RN AsyncStorage in node) ---
const CONTROLLED_TAGS = [
  'software',
  'systems',
  'web',
  'oss',
  'electronics',
  'networks',
  'reliability',
  'practices',
];
const CONTROLLED_SET = new Set(CONTROLLED_TAGS);

function sanitizeInterestTags(tags) {
  const out = [];
  const seen = new Set();
  for (const raw of tags) {
    if (typeof raw !== 'string') continue;
    const tag = raw.trim().toLowerCase();
    if (!CONTROLLED_SET.has(tag) || seen.has(tag)) continue;
    seen.add(tag);
    out.push(tag);
  }
  return out;
}

function sortBriefsForYou(briefs, tags) {
  const interests = new Set(
    tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean),
  );
  const indexed = briefs.map((brief, index) => ({ brief, index }));
  indexed.sort((a, b) => {
    if (interests.size > 0) {
      const scoreA = a.brief.tags.filter((t) => interests.has(t)).length;
      const scoreB = b.brief.tags.filter((t) => interests.has(t)).length;
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

// 1) Bad tags stripped
const cleaned = sanitizeInterestTags([
  'web',
  'email',
  'HACKER',
  'systems',
  'web',
  'name',
  'phone',
]);
assert.deepEqual(cleaned, ['web', 'systems']);
console.log('ok: bad tags stripped');

// 2) Empty interests → order sort
const sample = [
  { id: 'a', tags: ['oss'], order: 3 },
  { id: 'b', tags: ['web'], order: 1 },
  { id: 'c', tags: ['systems', 'web'], order: 2 },
];
assert.deepEqual(
  sortBriefsForYou(sample, []).map((b) => b.id),
  ['b', 'c', 'a'],
);
console.log('ok: empty interests → order');

// 3) Interests prefer intersection
assert.deepEqual(
  sortBriefsForYou(sample, ['web']).map((b) => b.id),
  ['b', 'c', 'a'],
);
assert.deepEqual(
  sortBriefsForYou(sample, ['oss']).map((b) => b.id),
  ['a', 'b', 'c'],
);
console.log('ok: sortForYou prefers interest matches');

// 4) No analytics module / emitters in tree
assert.equal(existsSync(join(root, 'src/analytics')), false, 'src/analytics must not exist');
const srcFiles = [];
function walk(dir) {
  for (const name of require('node:fs').readdirSync(dir)) {
    const p = join(dir, name);
    const st = require('node:fs').statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules') continue;
      walk(p);
    } else if (/\.(ts|tsx|js|mjs)$/.test(name)) {
      srcFiles.push(p);
    }
  }
}
const require = createRequire(import.meta.url);
walk(join(root, 'src'));
const banned = [
  'card_view',
  'source_open',
  'tag_tap',
  'flushAnonymousAggregates',
  'analytics_enabled',
  'ring buffer',
];
for (const file of srcFiles) {
  const text = readFileSync(file, 'utf8');
  for (const b of banned) {
    assert.equal(
      text.includes(b),
      false,
      `${file} must not contain analytics token: ${b}`,
    );
  }
}
console.log('ok: no analytics emitters / module in src');

// 5) Interests API exports present in index
const indexSrc = readFileSync(join(root, 'src/interests/index.ts'), 'utf8');
for (const name of ['getInterests', 'setInterests', 'sortBriefsForYou']) {
  assert.ok(indexSrc.includes(name), `index exports ${name}`);
}
console.log('ok: Maya API exports documented');

// 6) Privacy constant
const privacy = readFileSync(join(root, 'src/constants/privacy.ts'), 'utf8');
assert.ok(privacy.includes('Your reading stays on your phone'));
console.log('ok: privacy one-liner present');

console.log('\nAll interest asserts passed.');
