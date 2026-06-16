import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { LanguageSelector } from "../LanguageSelector";
import { SettingsMenu } from "../SettingsMenu";
import { Stack } from "../Stack";
import { ThemeToggle } from "../ThemeToggle";

export interface ChPageContentProps {
  title?: string;
  footer?: ReactNode;
  hideUtilitiesOnMobile?: boolean;
  align?: "left" | "center";
  children: ReactNode;
}

export function PageContent({
  title,
  footer,
  hideUtilitiesOnMobile = false,
  align = "left",
  children,
}: ChPageContentProps) {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      <Box textAlign={align === "center" ? "center" : "left"}>
        {title ? (
          <Heading level={2} size={isMobile ? 5 : 4}>
            {title}
          </Heading>
        ) : null}
        <Stack gap="md">{children}</Stack>
        {footer}
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: (theme) => theme.zIndex.appBar,
          display: { xs: "none", md: "block" },
        }}
      >
        <LanguageSelector />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: (theme) => theme.zIndex.appBar,
          display: { xs: "none", md: "block" },
        }}
      >
        <ThemeToggle />
      </Box>
      {isMobile && !hideUtilitiesOnMobile && <SettingsMenu />}
    </>
  );
}
