import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { TopicTag } from '../types';
import { CONTROLLED_TAGS, TAG_LABELS } from '../constants/tags';
import { colors, spacing, typography } from '../theme';

export type TagFilterChipsProps = {
  selected: TopicTag[];
  onChange: (next: TopicTag[]) => void;
  /** Horizontal scroll chips (feed bar) vs wrap grid (topics screen). */
  layout?: 'scroll' | 'wrap';
};

function toggleTag(selected: TopicTag[], tag: TopicTag): TopicTag[] {
  if (selected.includes(tag)) {
    return selected.filter((t) => t !== tag);
  }
  return [...selected, tag];
}

export function TagFilterChips({
  selected,
  onChange,
  layout = 'wrap',
}: TagFilterChipsProps) {
  const allActive = selected.length === 0;

  const chips = (
    <>
      <Pressable
        onPress={() => onChange([])}
        accessibilityRole="button"
        accessibilityState={{ selected: allActive }}
        accessibilityLabel="Show all topics"
        hitSlop={4}
        style={({ pressed }) => [
          styles.chip,
          allActive && styles.chipActive,
          pressed && styles.chipPressed,
        ]}
      >
        <Text style={[styles.chipText, allActive && styles.chipTextActive]}>
          All
        </Text>
      </Pressable>

      {CONTROLLED_TAGS.map((tag) => {
        const active = selected.includes(tag);
        return (
          <Pressable
            key={tag}
            onPress={() => onChange(toggleTag(selected, tag))}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Filter ${TAG_LABELS[tag]}`}
            hitSlop={4}
            style={({ pressed }) => [
              styles.chip,
              active && styles.chipActive,
              pressed && styles.chipPressed,
            ]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {TAG_LABELS[tag]}
            </Text>
          </Pressable>
        );
      })}
    </>
  );

  if (layout === 'scroll') {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        {chips}
      </ScrollView>
    );
  }

  return <View style={styles.wrap}>{chips}</View>;
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.chipBg,
    borderColor: colors.accent,
  },
  chipPressed: {
    opacity: 0.75,
  },
  chipText: {
    ...typography.tag,
    color: colors.textMuted,
  },
  chipTextActive: {
    color: colors.chipText,
  },
});
