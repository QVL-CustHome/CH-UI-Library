import { createTheme, type Theme } from "@mui/material/styles";
import { tokens } from "../tokens";

export type ChThemeMode = "light" | "dark";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

const headingBase = {
  fontFamily: tokens.typography.fontFamily,
  fontWeight: tokens.typography.fontWeight.bold,
  lineHeight: tokens.typography.lineHeight.tight,
} as const;

export function createChTheme(mode: ChThemeMode = "light"): Theme {
  const palette = mode === "dark" ? tokens.paletteDark : tokens.palette;
  const theme = createTheme({
    cssVariables: {
      cssVarPrefix: "ch",
    },
    palette: {
      mode,
      primary: { ...palette.primary },
      secondary: { ...palette.secondary },
      accent: { ...palette.accent },
      error: { ...palette.error },
      warning: { ...palette.warning },
      info: { ...palette.info },
      success: { ...palette.success },
      background: { ...palette.background },
      text: { ...palette.text },
      divider: palette.divider,
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      fontWeightRegular: tokens.typography.fontWeight.regular,
      fontWeightMedium: tokens.typography.fontWeight.medium,
      fontWeightBold: tokens.typography.fontWeight.bold,
      h1: { ...headingBase, fontSize: tokens.typography.heading.h1 },
      h2: { ...headingBase, fontSize: tokens.typography.heading.h2 },
      h3: { ...headingBase, fontSize: tokens.typography.heading.h3 },
      h4: { ...headingBase, fontSize: tokens.typography.heading.h4 },
      h5: { ...headingBase, fontSize: tokens.typography.heading.h5 },
    },
    spacing: tokens.spacing.unit,
    shape: {
      borderRadius: parseInt(tokens.radius.md, 10),
    },
  });
  theme.shadows[1] = tokens.shadows.sm;
  theme.shadows[2] = tokens.shadows.md;
  theme.shadows[3] = tokens.shadows.lg;
  return theme;
}

export const chTheme = createChTheme();
