import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { copy } from "../content";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

export default function CapabilityTicker({ language }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.items}>
        {copy.capabilities.map((item) => (
          <Text key={item} style={styles.item}>{text(item, language)}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
  container: {
    backgroundColor: colors.night,
    borderTopColor: "rgba(255,255,255,0.12)",
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 58,
    justifyContent: "center",
  },
  items: {
    alignItems: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  item: {
    color: colors.mutedOnDark,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  });
}
