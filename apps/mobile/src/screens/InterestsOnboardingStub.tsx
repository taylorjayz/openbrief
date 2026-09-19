/**
 * Thin stub only — Maya owns real onboarding UI / flow.
 * Demonstrates controlled-tag multi-select → setInterests.
 */
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CONTROLLED_TAGS, TAG_LABELS } from '../constants/tags';
import { PRIVACY_ONELINER } from '../constants/privacy';
import { setInterests } from '../interests/storage';
import type { TopicTag } from '../types';
import { colors, spacing, typography } from '../theme';

export type InterestsOnboardingStubProps = {
  onDone?: (tags: TopicTag[]) => void;
};

export function InterestsOnboardingStub({ onDone }: InterestsOnboardingStubProps) {
  const [selected, setSelected] = useState<TopicTag[]>([]);
  const [saving, setSaving] = useState(false);

  const toggle = useCallback((tag: TopicTag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const prefs = await setInterests(selected);
      onDone?.(prefs.interest_tags);
    } finally {
      setSaving(false);
    }
  }, [selected, onDone]);

  return (
    <View style={styles.root}>
      <Text style={styles.title} accessibilityRole="header">
        Pick interests
      </Text>
      <Text style={styles.blurb}>{PRIVACY_ONELINER}</Text>
      <View style={styles.chips}>
        {CONTROLLED_TAGS.map((tag) => {
          const active = selected.includes(tag);
          return (
            <Pressable
              key={tag}
              onPress={() => toggle(tag)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {TAG_LABELS[tag]}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        onPress={save}
        disabled={saving}
        accessibilityRole="button"
        accessibilityLabel="Save interests"
        style={styles.cta}
      >
        <Text style={styles.ctaText}>{saving ? 'Saving…' : 'Save'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  blurb: {
    ...typography.body,
    color: colors.textMuted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.chipBg,
    borderColor: colors.accent,
  },
  chipText: {
    ...typography.tag,
    color: colors.textMuted,
  },
  chipTextActive: {
    color: colors.chipText,
  },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: 14,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.background,
  },
});
