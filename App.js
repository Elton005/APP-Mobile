import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BrandHeader from "./src/components/BrandHeader";
import CapabilityTicker from "./src/sections/CapabilityTicker";
import HeroSection from "./src/sections/HeroSection";
import ProcessSection from "./src/sections/ProcessSection";
import QuoteBuilderSection from "./src/sections/QuoteBuilderSection";
import SectorsSection from "./src/sections/SectorsSection";
import ServicesSection from "./src/sections/ServicesSection";
import StatsSection from "./src/sections/StatsSection";
import { copy, whatsappNumber } from "./src/content";
import { text } from "./src/i18n";
import { useAppTheme, spacing } from "./src/theme";

export default function App() {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [language, setLanguage] = useState("es");
  const [selectedStat, setSelectedStat] = useState(0);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedServices, setSelectedServices] = useState(() => new Set());
  const [sectionOffsets, setSectionOffsets] = useState({});
  const scrollRef = useRef(null);
  const t = (value) => text(value, language);

  async function openWhatsApp(
    message = t("¡Hola! Quiero conversar sobre mi negocio.¦Olá! Quero conversar sobre meu negócio."),
  ) {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        t("No se pudo abrir WhatsApp¦Não foi possível abrir o WhatsApp"),
        t("Verifica que WhatsApp esté disponible e inténtalo de nuevo.¦Verifique se o WhatsApp está disponível e tente novamente."),
      );
    }
  }

  function toggleService(id) {
    setSelectedServices((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function registerSection(id) {
    return (event) => {
      const y = event.nativeEvent.layout.y;
      setSectionOffsets((current) => current[id] === y ? current : { ...current, [id]: y });
    };
  }

  function navigateToSection(id) {
    scrollRef.current?.scrollTo({ y: sectionOffsets[id] || 0, animated: true });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "right", "bottom", "left"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <BrandHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={navigateToSection}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View onLayout={registerSection("inicio")}>
          <HeroSection
            language={language}
            onExplore={() => navigateToSection("datos")}
            onContact={() => openWhatsApp()}
          />
        </View>
        <CapabilityTicker language={language} />
        <View onLayout={registerSection("datos")}>
          <StatsSection
            language={language}
            selected={selectedStat}
            onSelect={setSelectedStat}
          />
        </View>
        <View onLayout={registerSection("proceso")}>
          <ProcessSection language={language} />
        </View>
        <View onLayout={registerSection("sectores")}>
          <SectorsSection language={language} />
        </View>
        <View onLayout={registerSection("servicios")}>
          <ServicesSection
            language={language}
            filter={serviceFilter}
            setFilter={setServiceFilter}
          />
        </View>
        <View onLayout={registerSection("cotizador")}>
          <QuoteBuilderSection
            language={language}
            selectedServices={selectedServices}
            onToggle={toggleService}
            onSend={openWhatsApp}
          />
        </View>
        <View onLayout={registerSection("contacto")} style={styles.contact}>
          <Text style={styles.contactTitle}>{t(copy.contactTitle)}</Text>
          <Text style={styles.contactCopy}>{t(copy.contactBody)}</Text>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.contactButton, pressed && styles.pressed]}
            onPress={() => openWhatsApp()}
          >
            <Text style={styles.contactButtonText}>{t(copy.contactAction)}</Text>
          </Pressable>
        </View>
        <Text style={styles.footer}>Loop Avante · Curitiba</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  contact: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 24,
    backgroundColor: colors.night,
  },
  contactTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  contactCopy: {
    color: colors.mutedOnDark,
    fontSize: 15,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  contactButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 30,
    marginTop: spacing.md,
    minHeight: 50,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  contactButtonText: {
    color: colors.accentText,
    fontSize: 15,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.8,
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.lg,
    textAlign: "center",
  },
  });
}
