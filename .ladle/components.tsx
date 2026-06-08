import type { GlobalProvider } from "@ladle/react";
import { ChThemeProvider } from "../src/theme";

export const Provider: GlobalProvider = ({ children }) => (
  <ChThemeProvider defaultMode="system">{children}</ChThemeProvider>
);
