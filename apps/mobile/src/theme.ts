/**
 * OpenBrief dark reading surface — ink near-black, soft off-white type, teal accent.
 * Spec: specs/ui-feed.md visual system v0.1
 */
export const colors = {
  background: '#0B0D0F',
  surface: '#12151A',
  text: '#E8EAED',
  textMuted: '#9AA0A6',
  textSubtle: '#6B7280',
  accent: '#2DD4BF',
  accentMuted: 'rgba(45, 212, 191, 0.18)',
  border: 'rgba(232, 234, 237, 0.12)',
  chipBg: 'rgba(45, 212, 191, 0.14)',
  chipText: '#5EEAD4',
  link: '#2DD4BF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const typography = {
  progress: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.4,
    fontWeight: '500' as const,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 16.5,
    lineHeight: 16.5 * 1.4, // ≥1.35
    fontWeight: '400' as const,
  },
  tag: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  attribution: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400' as const,
  },
  license: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
  },
} as const;

export const theme = { colors, spacing, typography } as const;
