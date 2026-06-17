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
  fillHeight?: boolean;
  children: ReactNode;
}

const px = { xs: "0.75rem", md: "2.5rem" };

export function PageContent({
  title,
  footer,
  hideUtilitiesOnMobile = false,
  align = "left",
  fillHeight = false,
  children,
}: ChPageContentProps) {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      <Box
        textAlign={align === "center" ? "center" : "left"}
        flex={1}
        minHeight={0}
        paddingX={px}
        paddingTop="1rem"
        paddingBottom={{ xs: "6rem", md: fillHeight ? "4rem" : "2rem" }}
        {...(fillHeight ? { display: "flex", flexDirection: "column" } : {})}
        sx={(theme) =>
          fillHeight
            ? { overflow: "hidden" }
            : {
                overflowY: "auto",
                marginBottom: { xs: 0, md: "4rem" },
                scrollbarWidth: "thin",
                scrollbarColor: `${theme.palette.primary.main} transparent`,
                "&::-webkit-scrollbar": { width: "0.625rem" },
                "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "0.5rem",
                  border: "0.125rem solid transparent",
                  backgroundClip: "content-box",
                },
                "&::-webkit-scrollbar-thumb:hover": { backgroundColor: theme.palette.primary.dark },
              }
        }
      >
        {title ? (
          <Heading level={2} size={isMobile ? 5 : 4}>
            {title}
          </Heading>
        ) : null}
        <Stack gap="md" fill={fillHeight}>
          {children}
        </Stack>
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
