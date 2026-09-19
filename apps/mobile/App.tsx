import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabBar, type AppTab } from './src/components/TabBar';
import { FeedScreen } from './src/screens/FeedScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TopicsScreen } from './src/screens/TopicsScreen';
import type { Brief, Feed, TopicTag } from './src/types';
import { colors } from './src/theme';
import feedData from './src/data/feed.json';

const feed = feedData as Feed;

function countMatches(briefs: Brief[], selectedTags: TopicTag[]): number {
  if (selectedTags.length === 0) return briefs.length;
  return briefs.filter((b) =>
    selectedTags.some((tag) => b.tags.includes(tag)),
  ).length;
}

export default function App() {
  const [tab, setTab] = useState<AppTab>('home');
  const [selectedTags, setSelectedTags] = useState<TopicTag[]>([]);

  const totalCount = feed.briefs.length;
  const matchCount = useMemo(
    () => countMatches(feed.briefs, selectedTags),
    [selectedTags],
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.shell}>
        <View style={styles.content}>
          {tab === 'home' ? (
            <HomeScreen
              briefCount={totalCount}
              onStartReading={() => setTab('feed')}
            />
          ) : null}
          {tab === 'feed' ? (
            <FeedScreen
              selectedTags={selectedTags}
              onChangeTags={setSelectedTags}
            />
          ) : null}
          {tab === 'topics' ? (
            <TopicsScreen
              selectedTags={selectedTags}
              onChangeTags={setSelectedTags}
              matchCount={matchCount}
              totalCount={totalCount}
              onApply={() => setTab('feed')}
            />
          ) : null}
        </View>
        <TabBar active={tab} onChange={setTab} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
