import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { LanguageSelector } from "../LanguageSelector";
import { Stack } from "../Stack";
import { ThemeToggle } from "../ThemeToggle";

export interface ChPageContentProps {
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function PageContent({ title, footer, children }: ChPageContentProps) {
  return (
    <>
      <MuiCard elevation={1}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {title ? (
            <Heading level={2} size={4}>
              {title}
            </Heading>
          ) : null}
          <Stack gap="md">{children}</Stack>
          {footer}
        </CardContent>
      </MuiCard>
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
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <ThemeToggle />
      </Box>
    </>
  );
}
