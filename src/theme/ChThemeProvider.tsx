import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { chTheme, createChTheme, type ChThemeMode } from "./createChTheme";
import { ChThemeContext, type ChThemePreference } from "./ChThemeContext";

const DEFAULT_STORAGE_KEY = "ch-theme-mode";

function prefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function readStored(storageKey: string | null): ChThemePreference | null {
  if (!storageKey || typeof window === "undefined") return null;
  const value = window.localStorage?.getItem(storageKey);
  return value === "light" || value === "dark" || value === "system" ? value : null;
}

export interface ChThemeProviderProps {
  mode?: ChThemeMode;
  defaultMode?: ChThemePreference;
  storageKey?: string | null;
  children: ReactNode;
}

export function ChThemeProvider({
  mode: controlledMode,
  defaultMode = "light",
  storageKey = DEFAULT_STORAGE_KEY,
  children,
}: ChThemeProviderProps) {
  const isControlled = controlledMode !== undefined;

  const [preference, setPreference] = useState<ChThemePreference>(() =>
    isControlled ? controlledMode : (readStored(storageKey) ?? defaultMode)
  );
  const [systemDark, setSystemDark] = useState(prefersDark);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const mode: ChThemePreference = isControlled ? controlledMode : preference;
  const resolvedMode: ChThemeMode = mode === "system" ? (systemDark ? "dark" : "light") : mode;

  const setMode = useCallback(
    (next: ChThemePreference) => {
      if (isControlled) return;
      setPreference(next);
      if (storageKey && typeof window !== "undefined") {
        window.localStorage?.setItem(storageKey, next);
      }
    },
    [isControlled, storageKey]
  );

  const toggleMode = useCallback(() => {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  }, [resolvedMode, setMode]);

  const theme = useMemo(
    () => (resolvedMode === "light" ? chTheme : createChTheme(resolvedMode)),
    [resolvedMode]
  );

  const ctx = useMemo(
    () => ({ mode, resolvedMode, setMode, toggleMode }),
    [mode, resolvedMode, setMode, toggleMode]
  );

  return (
    <ChThemeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ChThemeContext.Provider>
  );
}
