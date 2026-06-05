import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo, type ReactNode } from "react";
import { chTheme, createChTheme, type ChThemeMode } from "./createChTheme";

export interface ChThemeProviderProps {
  /** Déclinaison clair (par défaut) ou sombre de l'identité CustHome. */
  mode?: ChThemeMode;
  children: ReactNode;
}

export function ChThemeProvider({ mode = "light", children }: ChThemeProviderProps) {
  const theme = useMemo(() => (mode === "light" ? chTheme : createChTheme(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
