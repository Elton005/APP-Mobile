const colors = {
  background: "#10172d",
  foreground: "#eef2fb",
  muted: "#aab7cd",
  card: "#19233b",
  line: "#2d3b56",
  accent: "#43c99b",
  bright: "#43c99b",
  night: "#10172d",
  white: "#ffffff",
  mutedOnDark: "#aab7cd",
  paleGreen: "#203a40",
  accentText: "#10172d",
};

const appTheme = { colors, isDark: true };

export function useAppTheme() {
  return appTheme;
}

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 36,
};
