import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { copy, processSteps } from "../content";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

export default function ProcessSection({ language }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const t = (value) => text(value, language);

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{t(copy.processEyebrow)}</Text>
      <Text accessibilityRole="header" style={styles.title}>{t(copy.processTitle)}</Text>
      <Text style={styles.intro}>{t(copy.processBody)}</Text>
      <View style={styles.steps}>
        {processSteps.map((step, index) => (
          <View key={step.title} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</Text>
              <View style={styles.check}><Text style={styles.checkText}>✓</Text></View>
            </View>
            <Text style={styles.cardTitle}>{t(step.title)}</Text>
            <Text style={styles.cardBody}>{t(step.body)}</Text>
            <Text style={styles.benefit}>{t(step.benefit)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
  section: {
    backgroundColor: colors.card,
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
  },
  intro: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  steps: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.md,
  },
  cardTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  stepNumber: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  check: {
    alignItems: "center",
    backgroundColor: colors.paleGreen,
    borderRadius: 14,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  checkText: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "800",
  },
  cardTitle: {
    color: colors.foreground,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  cardBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  benefit: {
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
    color: colors.foreground,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  });
}
