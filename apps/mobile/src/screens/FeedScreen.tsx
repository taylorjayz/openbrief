import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
  ViewToken,
  AccessibilityInfo,
} from 'react-native';
import { BriefCard } from '../components/BriefCard';
import type { Brief, Feed } from '../types';
import { colors } from '../theme';
import feedData from '../data/feed.json';

const feed = feedData as Feed;

export function FeedScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const [hasSwiped, setHasSwiped] = useState(false);
  const lastAnnouncedId = useRef<string | null>(null);

  const briefs = useMemo(
    () => [...feed.briefs].sort((a, b) => a.order - b.order),
    [],
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (!first?.item) return;
      const brief = first.item as Brief;
      if (lastAnnouncedId.current !== brief.id) {
        lastAnnouncedId.current = brief.id;
        AccessibilityInfo.announceForAccessibility(brief.title);
      }
      // Any scroll away from first item counts as a swipe
      if (typeof first.index === 'number' && first.index > 0) {
        setHasSwiped(true);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;

  const getItemLayout = useCallback(
    (_: ArrayLike<Brief> | null | undefined, index: number) => ({
      length: windowHeight,
      offset: windowHeight * index,
      index,
    }),
    [windowHeight],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Brief; index: number }) => (
      <BriefCard
        brief={item}
        index={index}
        total={briefs.length}
        height={windowHeight}
        showSwipeHint={index === 0 && !hasSwiped}
      />
    ),
    [briefs.length, windowHeight, hasSwiped],
  );

  const keyExtractor = useCallback((item: Brief) => item.id, []);

  return (
    <View style={styles.root}>
      <FlatList
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
        // Full-window snap; phone vertical viewport first
        style={styles.list}
        // Avoid nested scroll conflict with card body ScrollView when possible
        nestedScrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
