import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TagFilterChips } from '../components/TagFilterChips';
import type { TopicTag } from '../types';
import { colors, spacing, typography } from '../theme';

export type TopicsScreenProps = {
  selectedTags: TopicTag[];
  onChangeTags: (tags: TopicTag[]) => void;
  matchCount: number;
  totalCount: number;
  onApply: () => void;
};

export function TopicsScreen({
  selectedTags,
  onChangeTags,
  matchCount,
  totalCount,
  onApply,
}: TopicsScreenProps) {
  const insets = useSafeAreaInsets();
  const filtered = selectedTags.length > 0;

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top + spacing.lg },
      ]}
    >
      <Text style={styles.title} accessibilityRole="header">
        Topics
      </Text>
      <Text style={styles.subtitle}>
        Filter the feed by controlled tags. Leave All selected to show every
        brief.
      </Text>

      <View style={styles.chips}>
        <TagFilterChips
          selected={selectedTags}
          onChange={onChangeTags}
          layout="wrap"
        />
      </View>

      <Text style={styles.count} accessibilityLiveRegion="polite">
        {filtered
          ? `${matchCount} of ${totalCount} briefs match`
          : `${totalCount} briefs · all topics`}
      </Text>

      <Pressable
        onPress={onApply}
        accessibilityRole="button"
        accessibilityLabel="Apply filters and open feed"
        style={({ pressed }) => [
          styles.cta,
          pressed && styles.ctaPressed,
          matchCount === 0 && styles.ctaDisabled,
        ]}
        disabled={matchCount === 0}
      >
        <Text style={styles.ctaText}>
          {filtered ? 'Read matching briefs' : 'Open feed'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  chips: {
    marginBottom: spacing.xl,
  },
  count: {
    ...typography.hint,
    color: colors.accent,
    marginBottom: spacing.lg,
  },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaDisabled: {
    opacity: 0.4,
  },
  ctaText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.background,
  },
});
