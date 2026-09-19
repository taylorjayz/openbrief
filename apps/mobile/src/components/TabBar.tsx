import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

export type AppTab = 'home' | 'feed' | 'topics';

export type TabBarProps = {
  active: AppTab;
  onChange: (tab: AppTab) => void;
};

const TABS: { id: AppTab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'feed', label: 'Feed' },
  { id: 'topics', label: 'Topics' },
];

/** Approximate content height of the tab row (excluding home-indicator inset). */
export const TAB_BAR_CONTENT_HEIGHT = 52;

export function TabBar({ active, onChange }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, spacing.sm);

  return (
    <View
      style={[styles.bar, { paddingBottom: bottomPad }]}
      accessibilityRole="tablist"
    >
      {TABS.map((tab) => {
        const selected = active === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={tab.label}
            hitSlop={4}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
            ]}
          >
            <View style={[styles.indicator, selected && styles.indicatorActive]} />
            <Text style={[styles.label, selected && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    gap: 4,
  },
  tabPressed: {
    opacity: 0.7,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: colors.accent,
  },
  label: {
    ...typography.hint,
    color: colors.textSubtle,
  },
  labelActive: {
    color: colors.accent,
    fontWeight: '600',
  },
});
