import { createTheme, type Theme } from "@mui/material/styles";
import { tokens } from "../tokens";

export function createChTheme(): Theme {
  return createTheme({
    cssVariables: {
      cssVarPrefix: "ch",
    },
    palette: {
      primary: { ...tokens.palette.primary },
      secondary: { ...tokens.palette.secondary },
      error: { ...tokens.palette.error },
      warning: { ...tokens.palette.warning },
      info: { ...tokens.palette.info },
      success: { ...tokens.palette.success },
      background: { ...tokens.palette.background },
      text: { ...tokens.palette.text },
      divider: tokens.palette.divider,
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      fontWeightRegular: tokens.typography.fontWeight.regular,
      fontWeightMedium: tokens.typography.fontWeight.medium,
      fontWeightBold: tokens.typography.fontWeight.bold,
    },
    spacing: tokens.spacing.unit,
    shape: {
      borderRadius: parseInt(tokens.radius.md, 10),
    },
  });
}

export const chTheme = createChTheme();
