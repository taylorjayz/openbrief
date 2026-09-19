import { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Brief } from '../types';
import { colors, spacing, typography } from '../theme';

export type BriefCardProps = {
  brief: Brief;
  index: number;
  total: number;
  height: number;
  showSwipeHint?: boolean;
};

export function BriefCard({
  brief,
  index,
  total,
  height,
  showSwipeHint = false,
}: BriefCardProps) {
  const insets = useSafeAreaInsets();

  const openSource = useCallback(() => {
    const url = brief.source.url;
    Linking.openURL(url).catch(() => {
      // Fail silently — network / unsupported scheme edge cases
    });
  }, [brief.source.url]);

  return (
    <View
      style={[styles.card, { height, paddingTop: insets.top + spacing.sm }]}
      accessibilityRole="summary"
      accessibilityLabel={`${brief.title}. Brief ${index + 1} of ${total}.`}
    >
      {/* Progress */}
      <Text style={styles.progress} accessibilityLabel={`Brief ${index + 1} of ${total}`}>
        {index + 1} / {total}
      </Text>

      {/* Title */}
      <Text style={styles.title} accessibilityRole="header">
        {brief.title}
      </Text>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {brief.tags.map((tag) => (
          <View key={tag} style={styles.tagPill} accessibilityLabel={`Tag ${tag}`}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Summary — scrolls inside card if needed */}
      <ScrollView
        style={styles.summaryScroll}
        contentContainerStyle={styles.summaryContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        nestedScrollEnabled
      >
        <Text style={styles.summary}>{brief.summary}</Text>
      </ScrollView>

      {/* Always-visible attribution footer */}
      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, spacing.md) + (showSwipeHint ? 28 : 0) },
        ]}
      >
        <Text style={styles.attribution}>{brief.source.attribution_text}</Text>
        <Text style={styles.sourceTitle} numberOfLines={1}>
          {brief.source.title}
          {" · "}
          order {brief.order}
        </Text>

        <View style={styles.footerMeta}>
          <View style={styles.licenseChip} accessibilityLabel={`License ${brief.source.license}`}>
            <Text style={styles.licenseText}>{brief.source.license}</Text>
          </View>

          {Platform.OS === 'web' ? (
            <Text
              accessibilityRole="link"
              accessibilityLabel={`Open source: ${brief.source.title}`}
              {...({
                href: brief.source.url,
                hrefAttrs: { target: '_blank', rel: 'noopener noreferrer' },
              } as object)}
              style={[styles.sourceLink, styles.sourceLinkText]}
            >
              Open source
            </Text>
          ) : (
            <Pressable
              onPress={openSource}
              accessibilityRole="link"
              accessibilityLabel={`Open source: ${brief.source.title}`}
              hitSlop={8}
              style={({ pressed }) => [
                styles.sourceLink,
                pressed && styles.sourceLinkPressed,
              ]}
            >
              <Text style={styles.sourceLinkText}>Open source</Text>
            </Pressable>
          )}
        </View>

        {showSwipeHint ? (
          <Text style={styles.hint} accessibilityElementsHidden>
            Swipe up for next
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    justifyContent: 'flex-start',
  },
  progress: {
    ...typography.progress,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tagPill: {
    backgroundColor: colors.chipBg,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    minHeight: 28,
    justifyContent: 'center',
  },
  tagText: {
    ...typography.tag,
    color: colors.chipText,
  },
  summaryScroll: {
    flexGrow: 1,
    flexShrink: 1,
  },
  summaryContent: {
    paddingBottom: spacing.md,
  },
  summary: {
    ...typography.body,
    color: colors.text,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  attribution: {
    ...typography.attribution,
    color: colors.textMuted,
  },
  footerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: 44,
  },
  licenseChip: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    minHeight: 28,
    justifyContent: 'center',
  },
  licenseText: {
    ...typography.license,
    color: colors.textSubtle,
  },
  sourceLink: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  sourceLinkPressed: {
    opacity: 0.7,
  },
  sourceLinkText: {
    ...typography.link,
    color: colors.link,
  },
  sourceTitle: {
    ...typography.attribution,
    color: colors.textSubtle,
  },
  hint: {
    ...typography.hint,
    color: colors.textSubtle,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
