import { useMemo } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { copy, services } from "../content";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

function formatBRL(value) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

export default function QuoteBuilderSection({
  language,
  selectedServices,
  onToggle,
  onSend,
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const t = (value) => text(value, language);
  const chosenServices = services.filter((service) => selectedServices.has(service.id));
  const totals = chosenServices.reduce(
    (sum, service) => ({
      initial: sum.initial + service.initial,
      monthly: sum.monthly + service.monthly,
    }),
    { initial: 0, monthly: 0 },
  );

  function sendQuote() {
    const summary = chosenServices.map(
      (service) => `• ${t(service.name)}${service.quote ? ` (${t("a cotizar¦sob consulta")})` : ""}`,
    );
    const message = [
      t("¡Hola! Hice una simulación en la app de Loop Avante:¦Olá! Fiz uma simulação no app da Loop Avante:"),
      ...(summary.length ? summary : [t("Todavía no seleccioné servicios.¦Ainda não selecionei serviços.")]),
      `${formatBRL(totals.initial)} + ${formatBRL(totals.monthly)}${language === "pt" ? "/mês" : "/mes"}`,
    ].join("\n");
    onSend(message);
  }

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{t(copy.quoteEyebrow)}</Text>
      <Text accessibilityRole="header" style={styles.title}>{t(copy.quoteTitle)}</Text>
      <Text style={styles.intro}>{t(copy.quoteBody)}</Text>
      <View style={styles.serviceList}>
        {services.map((service, index) => {
          const selected = selectedServices.has(service.id);
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
              style={[styles.serviceRow, index < services.length - 1 && styles.serviceRowBorder]}
            >
              <View style={styles.serviceCopy}>
                <View style={styles.serviceHeader}>
                  <Text numberOfLines={2} style={styles.serviceName}>{t(service.name)}</Text>
                  <View style={styles.priceBlock}>
                    <Text style={styles.servicePrice}>{price}</Text>
                    {cadence ? <Text style={styles.cadence}>{cadence}</Text> : null}
                  </View>
                </View>
                <Text numberOfLines={1} style={styles.serviceDescription}>{t(service.copy)}</Text>
              </View>
              <Switch
                accessibilityLabel={t(service.name)}
                onValueChange={() => onToggle(service.id)}
                trackColor={{ false: colors.line, true: colors.accent }}
                value={selected}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.summary}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryEyebrow}>{t("Tu selección¦Sua seleção")}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {chosenServices.length} {t("servicios¦serviços")}
            </Text>
          </View>
        </View>
        {chosenServices.length ? (
          <View style={styles.selectedServices}>
            {chosenServices.map((service) => (
              <View key={service.id} style={styles.selectedChip}>
                <Text style={styles.selectedChipText} numberOfLines={1}>
                  {t(service.name)}{service.quote ? ` · ${t(copy.quoteLabel)}` : ""}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.summaryEmpty}>
            {t("Selecciona los servicios que te interesan.¦Selecione os serviços do seu interesse.")}
          </Text>
        )}
        <View style={styles.totalsRow}>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>{t(copy.quoteInitial)}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.totalValue}>
              {formatBRL(totals.initial)}
            </Text>
          </View>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>{t(copy.quoteMonthly)}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.totalValue}>
              {formatBRL(totals.monthly)}
            </Text>
          </View>
        </View>
        <Text style={styles.disclaimer}>{t(copy.quoteDisclaimer)}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={sendQuote}
          style={({ pressed }) => [styles.sendButton, pressed && styles.pressed]}
        >
          <Text style={styles.sendButtonText}>{t(copy.quoteAction)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    section: {
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
    serviceList: {
      backgroundColor: colors.card,
      borderColor: colors.line,
      borderRadius: 18,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
    },
    serviceRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: spacing.sm,
      paddingVertical: 11,
    },
    serviceRowBorder: {
      borderBottomColor: colors.line,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    serviceCopy: {
      flex: 1,
      gap: 4,
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
      fontSize: 13,
      fontWeight: "800",
      lineHeight: 17,
    },
    priceBlock: {
      alignItems: "flex-end",
      flexShrink: 0,
    },
    servicePrice: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: "800",
    },
    cadence: {
      color: colors.muted,
      fontSize: 10,
      marginTop: 1,
    },
    serviceDescription: {
      color: colors.muted,
      fontSize: 11,
      lineHeight: 15,
    },
    summary: {
      backgroundColor: colors.paleGreen,
      borderRadius: 20,
      marginTop: spacing.md,
      padding: spacing.md,
    },
    summaryHeader: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
    },
    summaryEyebrow: {
      color: colors.foreground,
      fontSize: 16,
      fontWeight: "800",
    },
    countBadge: {
      backgroundColor: colors.card,
      borderRadius: 14,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    countText: {
      color: colors.foreground,
      fontSize: 11,
      fontWeight: "700",
    },
    selectedServices: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    selectedChip: {
      backgroundColor: colors.card,
      borderColor: colors.line,
      borderRadius: 14,
      borderWidth: 1,
      maxWidth: "100%",
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    selectedChipText: {
      color: colors.foreground,
      fontSize: 11,
      fontWeight: "600",
    },
    summaryEmpty: {
      color: colors.muted,
      fontSize: 13,
      lineHeight: 19,
      marginBottom: spacing.md,
    },
    totalsRow: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    totalCard: {
      backgroundColor: colors.card,
      borderColor: colors.line,
      borderRadius: 14,
      borderWidth: 1,
      flex: 1,
      justifyContent: "space-between",
      minWidth: 0,
      padding: 12,
    },
    totalLabel: {
      color: colors.muted,
      fontSize: 11,
      fontWeight: "700",
      lineHeight: 15,
      minHeight: 30,
    },
    totalValue: {
      color: colors.accent,
      fontSize: 22,
      fontWeight: "800",
      marginTop: 6,
    },
    disclaimer: {
      color: colors.muted,
      fontSize: 11,
      lineHeight: 17,
      marginTop: spacing.md,
    },
    sendButton: {
      alignItems: "center",
      backgroundColor: colors.accent,
      borderRadius: 28,
      justifyContent: "center",
      marginTop: spacing.md,
      minHeight: 50,
      paddingHorizontal: spacing.md,
    },
    sendButtonText: {
      color: colors.accentText,
      fontSize: 14,
      fontWeight: "800",
    },
    pressed: {
      opacity: 0.8,
    },
  });
}
