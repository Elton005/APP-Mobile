import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { copy, stats } from "../content";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

export default function StatsSection({ language, selected, onSelect }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const t = (value) => text(value, language);
  const statistic = stats[selected];

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{t(copy.statsEyebrow)}</Text>
      <Text accessibilityRole="header" style={styles.title}>{t(copy.statsTitle)}</Text>
      <View style={styles.options}>
        {stats.map((item, index) => {
          const isSelected = index === selected;
          const color = item.color === "accent" ? colors.accent : item.color;
          return (
            <Pressable
              key={item.value}
              accessibilityRole="button"
              accessibilityLabel={`${t(item.name)}: ${item.value}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelect(index)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <View style={styles.optionRow}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={styles.optionName}>{t(item.name)}</Text>
                <Text style={styles.optionValue}>{item.value}</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { backgroundColor: color, width: item.value }]} />
              </View>
              <Text style={styles.optionHint}>{t(copy.statPrompt)}</Text>
            </Pressable>
          );
        })}
      </View>
      <View accessibilityLiveRegion="polite" style={styles.featured}>
        <Text style={styles.featuredEyebrow}>{t(copy.statFeatured)}</Text>
        <Text style={[styles.featuredValue, { color: statistic.color === "accent" ? colors.accent : statistic.color }]}>{statistic.value}</Text>
        <Text style={styles.featuredCopy}>{t(statistic.copy)}</Text>
        <Text style={styles.featuredIndex}>{String(selected + 1).padStart(2, "0")} / 04</Text>
      </View>
      <Text style={styles.source}>{t(copy.statsSource)}</Text>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  title: {
    color: colors.foreground,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.7,
    lineHeight: 36,
    marginBottom: spacing.md,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.md,
  },
  optionSelected: {
    borderColor: colors.accent,
  },
  optionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  dot: {
    borderRadius: 7,
    height: 12,
    width: 12,
  },
  optionName: {
    color: colors.foreground,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  optionValue: {
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "800",
  },
  barTrack: {
    backgroundColor: colors.paleGreen,
    borderRadius: 8,
    height: 8,
    marginTop: spacing.sm,
    overflow: "hidden",
  },
  barFill: {
    borderRadius: 8,
    height: "100%",
  },
  optionHint: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 6,
  },
  featured: {
    backgroundColor: colors.night,
    borderRadius: 24,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
  featuredEyebrow: {
    color: colors.mutedOnDark,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  featuredValue: {
    fontSize: 76,
    fontWeight: "800",
    letterSpacing: -4,
    lineHeight: 88,
    marginVertical: spacing.sm,
  },
  featuredCopy: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 23,
  },
  featuredIndex: {
    color: colors.mutedOnDark,
    fontSize: 12,
    fontWeight: "700",
    marginTop: spacing.md,
    textAlign: "right",
  },
  source: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: spacing.sm,
  },
  });
}
