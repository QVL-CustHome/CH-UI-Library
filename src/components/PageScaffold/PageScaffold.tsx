import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Navbar, type ChNavbarItem } from "../Navbar";

export interface ChPageScaffoldProps {
  title?: string;
  items: ChNavbarItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  userName?: string;
  onLogout?: () => void;
  children: ReactNode;
}

const px = { xs: "0.75rem", md: "2.5rem" };

function activeLabel(items: ChNavbarItem[], activeHref?: string): string | undefined {
  if (!activeHref) return undefined;
  const match = items.find((it) => {
    if (it.href === "/") return activeHref === "/";
    return activeHref === it.href || activeHref.startsWith(it.href + "/");
  });
  return match?.label;
}

export function PageScaffold({
  title = "CustHome",
  items,
  activeHref,
  onNavigate,
  userName,
  onLogout,
  children,
}: ChPageScaffoldProps) {
  const pageTitle = activeLabel(items, activeHref);
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Navbar
      items={items}
      activeHref={activeHref}
      onNavigate={onNavigate}
      userName={userName}
      onLogout={onLogout}
    >
      <Box
        component="header"
        flexShrink={0}
        paddingLeft={px}
        paddingRight={{ xs: "3.5rem", md: "2.5rem" }}
        paddingTop={{ xs: "1rem", md: "2rem" }}
        paddingBottom={{ xs: "0.75rem", md: "1rem" }}
      >
        {title ? (
          <Heading level={1} size={isMobile ? 4 : 3} gutterBottom={false}>
            {title}
          </Heading>
        ) : null}
        {pageTitle ? (
          <Heading level={2} size={isMobile ? 5 : 4} gutterBottom={false}>
            {pageTitle}
          </Heading>
        ) : null}
      </Box>
      <Box
        sx={(theme) => ({
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          paddingX: px,
          paddingTop: "1rem",
          paddingBottom: { xs: "6rem", md: "2rem" },
          // gap permanent sous la zone scrollable (desktop) : le tableau ne touche
          // jamais le bas de la page. N'impacte pas la navbar (flex séparé).
          marginBottom: { xs: 0, md: "4rem" },
          // scrollbar en couleur primaire
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
        })}
      >
        {children}
      </Box>
    </Navbar>
  );
}
