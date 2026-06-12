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

const px = { xs: 1.5, md: 5 };

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
        sx={{ flexShrink: 0, pl: px, pr: { xs: 7, md: 5 }, pt: { xs: 2, md: 4 }, pb: { xs: 1.5, md: 2 } }}
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
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", px, pb: { xs: 12, md: 4 } }}>{children}</Box>
    </Navbar>
  );
}
