import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { chTheme } from "./createChTheme";

export interface ChThemeProviderProps {
  children: ReactNode;
}

export function ChThemeProvider({ children }: ChThemeProviderProps) {
  return (
    <ThemeProvider theme={chTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
