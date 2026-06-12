import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { LanguageSelector } from "../LanguageSelector";
import { Stack } from "../Stack";
import { ThemeToggle } from "../ThemeToggle";

export interface ChPageContentProps {
  title?: string;
  footer?: ReactNode;
  hideUtilitiesOnMobile?: boolean;
  children: ReactNode;
}

export function PageContent({ title, footer, hideUtilitiesOnMobile = false, children }: ChPageContentProps) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const utilitiesDisplay = hideUtilitiesOnMobile ? { xs: "none", md: "block" } : "block";

  return (
    <>
      {title ? (
        <Heading level={2} size={isMobile ? 5 : 4}>
          {title}
        </Heading>
      ) : null}
      <Stack gap="md">{children}</Stack>
      {footer}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.appBar,
          display: utilitiesDisplay,
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
          display: utilitiesDisplay,
        }}
      >
        <ThemeToggle />
      </Box>
    </>
  );
}
