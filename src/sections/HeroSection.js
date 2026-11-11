import { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

const heroImage = require("../../assets/img/team-oscuro.jpg");

export default function HeroSection({ language, onExplore, onContact }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const t = (value) => text(value, language);

  return (
    <View style={styles.hero}>
      <Image
        accessible={false}
        pointerEvents="none"
        resizeMode="cover"
        source={heroImage}
        style={styles.image}
      />
      <View pointerEvents="none" style={styles.shade} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>{t("Soluciones digitales · Curitiba¦Soluções digitais · Curitiba")}</Text>
        <Text accessibilityRole="header" style={styles.title}>
          {t("Tu negocio local, con posibilidades¦Seu negócio local, com possibilidades")}{" "}
          <Text style={styles.emphasis}>{t("sin límites.¦sem limites.")}</Text>
        </Text>
        <Text style={styles.body}>
          {t("Conectamos tu tienda con el mundo digital: sitios web, tiendas online, aplicaciones, redes sociales y video.¦Conectamos sua loja ao mundo digital: sites, lojas online, aplicativos, redes sociais e vídeo.")}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onExplore}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>{t("Ver cómo trabajamos ↓¦Veja como trabalhamos ↓")}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onContact}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>{t("Hablemos de tu negocio¦Vamos conversar sobre seu negócio")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
  hero: {
    backgroundColor: colors.night,
    justifyContent: "flex-end",
    minHeight: 440,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  shade: {
    backgroundColor: "rgba(9, 17, 36, 0.62)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  content: {
    paddingBottom: 20,
    paddingHorizontal: spacing.md,
    paddingTop: 16,
  },
  eyebrow: {
    color: colors.bright,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  title: {
    color: colors.white,
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: -1.2,
    lineHeight: 47,
  },
  emphasis: {
    color: colors.bright,
  },
  body: {
    color: colors.mutedOnDark,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.bright,
    borderRadius: 28,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  primaryButtonText: {
    color: colors.night,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.78,
  },
  });
}
