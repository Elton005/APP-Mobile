import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { text } from "../i18n";
import { useAppTheme, spacing } from "../theme";

const menuItems = [
  ["inicio", "Inicio¦Início"],
  ["datos", "Datos¦Dados"],
  ["proceso", "Cómo trabajamos¦Como trabalhamos"],
  ["sectores", "Sectores¦Setores"],
  ["servicios", "Servicios¦Serviços"],
  ["cotizador", "Cotizador¦Simulador"],
  ["contacto", "Contacto¦Contato"],
];

export default function BrandHeader({ language, setLanguage, onNavigate }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = (value) => text(value, language);

  function navigate(section) {
    setMenuOpen(false);
    onNavigate(section);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Loop Avante, inicio"
          onPress={() => navigate("inicio")}
          style={styles.logoButton}
        >
          <Text style={styles.logo}>Loop <Text style={styles.logoAccent}>Avante</Text></Text>
        </Pressable>
        <View style={styles.actions}>
          <View style={styles.languagePicker}>
            {["es", "pt"].map((item) => {
              const selected = language === item;
              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityLabel={item === "es" ? "Español" : "Português"}
                  accessibilityState={{ selected }}
                  onPress={() => setLanguage(item)}
                  style={[styles.languageButton, selected && styles.languageButtonSelected]}
                >
                  <Text style={[styles.languageText, selected && styles.languageTextSelected]}>
                    {item.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={menuOpen ? t("Cerrar menú¦Fechar menu") : t("Abrir menú¦Abrir menu")}
            accessibilityState={{ expanded: menuOpen }}
            onPress={() => setMenuOpen((open) => !open)}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>{menuOpen ? "×" : "☰"}</Text>
          </Pressable>
        </View>
      </View>
      {menuOpen ? (
        <View style={styles.menu}>
          {menuItems.map(([id, label]) => (
            <Pressable
              key={id}
              accessibilityRole="button"
              onPress={() => navigate(id)}
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
            >
              <Text style={styles.menuItemText}>{t(label)}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: colors.background,
      position: "relative",
      zIndex: 10,
    },
    container: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderBottomColor: colors.line,
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: "row",
      justifyContent: "space-between",
      minHeight: 62,
      paddingHorizontal: spacing.md,
    },
    logoButton: {
      justifyContent: "center",
      minHeight: 44,
    },
    logo: {
      color: colors.foreground,
      fontSize: 20,
      fontWeight: "800",
    },
    logoAccent: {
      color: colors.accent,
    },
    actions: {
      alignItems: "center",
      flexDirection: "row",
      gap: spacing.sm,
    },
    languagePicker: {
      backgroundColor: colors.card,
      borderColor: colors.line,
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: "row",
      padding: 3,
    },
    languageButton: {
      alignItems: "center",
      borderRadius: 18,
      justifyContent: "center",
      minHeight: 34,
      minWidth: 42,
    },
    languageButtonSelected: {
      backgroundColor: colors.accent,
    },
    languageText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "700",
    },
    languageTextSelected: {
      color: colors.accentText,
    },
    menuButton: {
      alignItems: "center",
      backgroundColor: colors.card,
      borderColor: colors.line,
      borderRadius: 12,
      borderWidth: 1,
      height: 42,
      justifyContent: "center",
      width: 44,
    },
    menuIcon: {
      color: colors.foreground,
      fontSize: 22,
      fontWeight: "700",
    },
    menu: {
      backgroundColor: colors.card,
      borderColor: colors.line,
      borderRadius: 16,
      borderWidth: 1,
      elevation: 12,
      left: spacing.md,
      paddingHorizontal: spacing.md,
      position: "absolute",
      right: spacing.md,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      shadowRadius: 16,
      top: 62,
      zIndex: 20,
    },
    menuItem: {
      borderBottomColor: colors.line,
      borderBottomWidth: StyleSheet.hairlineWidth,
      justifyContent: "center",
      minHeight: 48,
    },
    menuItemPressed: {
      opacity: 0.65,
    },
    menuItemText: {
      color: colors.foreground,
      fontSize: 15,
      fontWeight: "700",
    },
  });
}
