import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { copy, sectors } from "../content";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

export default function SectorsSection({ language }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const t = (value) => text(value, language);

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{t(copy.sectorsEyebrow)}</Text>
      <Text accessibilityRole="header" style={styles.title}>{t(copy.sectorsTitle)}</Text>
      <ScrollView
        horizontal
        decelerationRate="fast"
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + spacing.md}
        contentContainerStyle={styles.cards}
      >
        {sectors.map((sector) => (
          <View key={sector.name} style={styles.card}>
            <Image
              accessible
              accessibilityLabel={t(sector.alt)}
              resizeMethod="resize"
              resizeMode="cover"
              source={sector.image}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>{t(sector.name)}</Text>
            <Text style={styles.cardCopy}>{t(sector.copy)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = 260;

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
  cards: {
    gap: spacing.md,
    paddingRight: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    paddingBottom: spacing.sm,
    width: CARD_WIDTH,
  },
  image: {
    backgroundColor: colors.paleGreen,
    height: 112,
    width: "100%",
  },
  cardTitle: {
    color: colors.foreground,
    fontSize: 17,
    fontWeight: "800",
    marginHorizontal: 14,
    marginTop: spacing.sm,
  },
  cardCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginHorizontal: 14,
    marginTop: 6,
  },
  });
}
