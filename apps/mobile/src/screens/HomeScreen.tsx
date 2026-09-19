import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

export type HomeScreenProps = {
  briefCount: number;
  onStartReading: () => void;
};

export function HomeScreen({ briefCount, onStartReading }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top + spacing.xxl,
          paddingBottom: spacing.xl,
        },
      ]}
    >
      <View style={styles.glow} pointerEvents="none" />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Open source · readable</Text>
        <Text style={styles.wordmark} accessibilityRole="header">
          OpenBrief
        </Text>
        <Text style={styles.pitch}>
          Short engineering briefs you can swipe through — one idea per card,
          always attributed to a real FOSS or Creative Commons source.
        </Text>
        <Text style={styles.count}>
          {briefCount} brief{briefCount === 1 ? '' : 's'} ready
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onStartReading}
          accessibilityRole="button"
          accessibilityLabel="Start reading"
          style={({ pressed }) => [
            styles.cta,
            pressed && styles.ctaPressed,
          ]}
        >
          <Text style={styles.ctaText}>Start reading</Text>
        </Pressable>
        <Text style={styles.fossNote}>
          Free & open source. No accounts. No paywall.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  glow: {
    position: 'absolute',
    top: -80,
    left: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.splashGlow,
  },
  hero: {
    gap: spacing.md,
    paddingTop: spacing.xxl,
  },
  kicker: {
    ...typography.progress,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  wordmark: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: colors.text,
  },
  pitch: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
    maxWidth: 340,
  },
  count: {
    ...typography.hint,
    color: colors.textSubtle,
    marginTop: spacing.sm,
  },
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
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
  ctaText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.background,
  },
  fossNote: {
    ...typography.attribution,
    color: colors.textSubtle,
    textAlign: 'center',
  },
});
