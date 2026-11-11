import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { copy, services } from "../content";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

function formatBRL(value) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

export default function ServicesSection({ language, filter, setFilter }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const t = (value) => text(value, language);
  const visibleServices = services.filter(
    (service) => filter === "all" || service.categories.includes(filter),
  );

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{t(copy.servicesEyebrow)}</Text>
      <Text accessibilityRole="header" style={styles.title}>{t(copy.servicesTitle)}</Text>
      <Text style={styles.intro}>{t(copy.servicesBody)}</Text>
      <View style={styles.filters}>
        {copy.serviceFilters.map(([id, label]) => {
          const selected = filter === id;
          return (
            <Pressable
              key={id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setFilter(id)}
              style={({ pressed }) => [
                styles.filter,
                selected && styles.filterSelected,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>
                {t(label)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.serviceList}>
        {visibleServices.map((service, index) => {
          const price = service.quote
            ? t(copy.quoteLabel)
            : formatBRL(service.initial || service.monthly);
          const cadence = service.quote
            ? ""
            : service.initial
              ? t("única vez¦uma vez")
              : language === "pt" ? "/mês" : "/mes";

          return (
            <View
              key={service.id}
              style={[styles.serviceRow, index < visibleServices.length - 1 && styles.serviceRowBorder]}
            >
              <View style={styles.serviceCopy}>
                <View style={styles.serviceHeader}>
                  <Text numberOfLines={2} style={styles.serviceName}>{t(service.name)}</Text>
                  <View style={styles.priceBlock}>
                    <Text style={styles.price}>{price}</Text>
                    {cadence ? <Text style={styles.cadence}>{cadence}</Text> : null}
                  </View>
                </View>
                <Text numberOfLines={2} style={styles.description}>{t(service.copy)}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    section: {
      backgroundColor: colors.card,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
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
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: -0.7,
      lineHeight: 34,
    },
    intro: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: spacing.md,
      marginTop: spacing.sm,
    },
    filters: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    filter: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderColor: colors.line,
      borderRadius: 22,
      borderWidth: 1,
      justifyContent: "center",
      minHeight: 40,
      paddingHorizontal: 13,
    },
    filterSelected: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    filterText: {
      color: colors.foreground,
      fontSize: 12,
      fontWeight: "700",
    },
    filterTextSelected: {
      color: colors.accentText,
    },
    serviceList: {
      backgroundColor: colors.background,
      borderColor: colors.line,
      borderRadius: 16,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
    },
    serviceRow: {
      paddingVertical: 11,
    },
    serviceRowBorder: {
      borderBottomColor: colors.line,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    serviceCopy: {
      gap: 5,
    },
    serviceHeader: {
      alignItems: "flex-start",
      flexDirection: "row",
      gap: spacing.sm,
      justifyContent: "space-between",
    },
    serviceName: {
      color: colors.foreground,
      flex: 1,
      fontSize: 14,
      fontWeight: "800",
      lineHeight: 18,
    },
    priceBlock: {
      alignItems: "flex-end",
      flexShrink: 0,
    },
    price: {
      color: colors.accent,
      fontSize: 13,
      fontWeight: "800",
    },
    cadence: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 1,
    },
    description: {
      color: colors.muted,
      fontSize: 12,
      lineHeight: 17,
    },
    pressed: {
      opacity: 0.8,
    },
  });
}
