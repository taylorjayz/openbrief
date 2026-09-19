import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  FlatList,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BriefCard } from '../components/BriefCard';
import { TagFilterChips } from '../components/TagFilterChips';
import type { Brief, Feed, TopicTag } from '../types';
import { colors, spacing, typography } from '../theme';
import feedData from '../data/feed.json';

const feed = feedData as Feed;

export type FeedScreenProps = {
  selectedTags: TopicTag[];
  onChangeTags: (tags: TopicTag[]) => void;
};

function filterBriefs(briefs: Brief[], selectedTags: TopicTag[]): Brief[] {
  const sorted = [...briefs].sort((a, b) => a.order - b.order);
  if (selectedTags.length === 0) return sorted;
  return sorted.filter((b) =>
    selectedTags.some((tag) => b.tags.includes(tag)),
  );
}

export function FeedScreen({ selectedTags, onChangeTags }: FeedScreenProps) {
  const insets = useSafeAreaInsets();
  const [pageHeight, setPageHeight] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastAnnouncedId = useRef<string | null>(null);
  const lastHapticIndex = useRef<number | null>(null);
  const listRef = useRef<FlatList<Brief>>(null);

  const briefs = useMemo(
    () => filterBriefs(feed.briefs, selectedTags),
    [selectedTags],
  );

  useEffect(() => {
    setCurrentIndex(0);
    setHasSwiped(false);
    lastAnnouncedId.current = null;
    lastHapticIndex.current = null;
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [selectedTags]);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const h = Math.round(e.nativeEvent.layout.height);
    if (h > 0) setPageHeight(h);
  }, []);

  const fireHapticRef = useRef(() => {
    if (Platform.OS === 'web') return;
    Haptics.selectionAsync().catch(() => {});
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (!first?.item || typeof first.index !== 'number') return;
      const brief = first.item as Brief;
      const index = first.index;

      setCurrentIndex(index);

      if (lastAnnouncedId.current !== brief.id) {
        lastAnnouncedId.current = brief.id;
        AccessibilityInfo.announceForAccessibility(brief.title);
      }

      if (index > 0) {
        setHasSwiped(true);
      }

      if (lastHapticIndex.current !== null && lastHapticIndex.current !== index) {
        fireHapticRef.current();
      }
      lastHapticIndex.current = index;
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;

  const getItemLayout = useCallback(
    (_: ArrayLike<Brief> | null | undefined, index: number) => ({
      length: pageHeight,
      offset: pageHeight * index,
      index,
    }),
    [pageHeight],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Brief; index: number }) => (
      <BriefCard
        brief={item}
        index={index}
        total={briefs.length}
        height={pageHeight}
        showSwipeHint={index === 0 && !hasSwiped && briefs.length > 1}
      />
    ),
    [briefs.length, pageHeight, hasSwiped],
  );

  const keyExtractor = useCallback((item: Brief) => item.id, []);

  const filtered = selectedTags.length > 0;

  return (
    <View style={styles.root}>
      <View style={[styles.filterBar, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TagFilterChips
          selected={selectedTags}
          onChange={onChangeTags}
          layout="scroll"
        />
        {filtered ? (
          <Text style={styles.filterMeta} accessibilityLiveRegion="polite">
            {briefs.length} match{briefs.length === 1 ? '' : 'es'} ·{' '}
            {briefs.length === 0
              ? 'try another tag'
              : `${Math.min(currentIndex + 1, briefs.length)} / ${briefs.length}`}
          </Text>
        ) : null}
      </View>

      <View style={styles.pager} onLayout={onLayout}>
        {pageHeight > 0 && briefs.length > 0 ? (
          <FlatList
            ref={listRef}
            data={briefs}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            bounces={false}
            decelerationRate="fast"
            getItemLayout={getItemLayout}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            style={styles.list}
            nestedScrollEnabled
            extraData={{ hasSwiped, total: briefs.length }}
          />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No briefs match</Text>
            <Text style={styles.emptyBody}>
              Clear filters or pick another topic tag.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterMeta: {
    ...typography.progress,
    color: colors.textSubtle,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  pager: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    ...typography.title,
    fontSize: 22,
    color: colors.text,
  },
  emptyBody: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
