import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import { LanguageSelector } from "../LanguageSelector";
import { Layout } from "../Layout";
import { ThemeToggle } from "../ThemeToggle";

export interface ChPageScaffoldProps {
  brand?: string;
  logo?: ReactNode;
  maxWidth?: number | string;
  children: ReactNode;
}

export function PageScaffold({ brand, logo, maxWidth, children }: ChPageScaffoldProps) {
  return (
    <Layout brand={brand} logo={logo} maxWidth={maxWidth}>
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <LanguageSelector />
      </Box>
      {children}
      <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <ThemeToggle />
      </Box>
    </Layout>
  );
}
