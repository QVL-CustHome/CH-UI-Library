import { createContext, useContext } from "react";
import type { ChThemeMode } from "./createChTheme";

export type ChThemePreference = ChThemeMode | "system";

export interface ChThemeContextValue {
  mode: ChThemePreference;
  resolvedMode: ChThemeMode;
  setMode: (mode: ChThemePreference) => void;
  toggleMode: () => void;
}

export const ChThemeContext = createContext<ChThemeContextValue | null>(null);

export function useChTheme(): ChThemeContextValue {
  const ctx = useContext(ChThemeContext);
  if (!ctx) {
    throw new Error("useChTheme doit être utilisé à l'intérieur d'un <ChThemeProvider>.");
  }
  return ctx;
}
