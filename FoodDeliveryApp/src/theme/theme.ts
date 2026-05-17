export type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  accentOn: string;
  tabBar: string;
  tabIconInactive: string;
  shadow: string;
  inputBg: string;
  inputBorder: string;
  placeholder: string;
};

export type AppTheme = {
  colors: ThemeColors;
};

export const lightTheme: AppTheme = {
  colors: {
    background: "#f7f4ef",
    surface: "#fffaf6",
    surfaceAlt: "#ffffff",
    card: "#fffaf6",
    border: "#f1e2d2",
    text: "#1b1b1f",
    textMuted: "#7b7169",
    accent: "#ff7a3d",
    accentSoft: "rgba(255, 122, 61, 0.16)",
    accentOn: "#fffaf6",
    tabBar: "#ffffff",
    tabIconInactive: "#94a3b8",
    shadow: "#000",
    inputBg: "#ffffff",
    inputBorder: "#e5e5e5",
    placeholder: "#9c9aa0",
  },
};

export const darkTheme: AppTheme = {
  colors: {
    background: "#141210",
    surface: "#1c1916",
    surfaceAlt: "#221f1b",
    card: "#1c1916",
    border: "#2f2a24",
    text: "#f7f4ef",
    textMuted: "#b9afa7",
    accent: "#ff9f6b",
    accentSoft: "rgba(255, 159, 107, 0.18)",
    accentOn: "#1b1b1f",
    tabBar: "#1a1714",
    tabIconInactive: "#8c8a88",
    shadow: "#000",
    inputBg: "#1f1c19",
    inputBorder: "#2f2a24",
    placeholder: "#8f8780",
  },
};
