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
  footer?: ReactNode;
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
  footer,
  children,
}: ChPageScaffoldProps) {
  const pageTitle = activeLabel(items, activeHref);
  const isMobile = useMediaQuery("(max-width:48rem)");

  return (
    <Navbar
      items={items}
      activeHref={activeHref}
      onNavigate={onNavigate}
      userName={userName}
      onLogout={onLogout}
      footer={footer}
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
      <Box flex={1} minHeight={0} display="flex" flexDirection="column" overflow="hidden">
        {children}
      </Box>
    </Navbar>
  );
}
