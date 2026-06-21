import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Icon, type ChIconName } from "../Icon";
import { Separator } from "../Separator";
import { SettingsMenu } from "../SettingsMenu";
import { useTranslation } from "../../i18n";

const SIDEBAR_WIDTH = "15.5rem";

export interface ChNavbarItem {
  label: string;
  icon?: ChIconName;
  href: string;
}

export interface ChNavbarProps {
  items: ChNavbarItem[];
  title?: string;
  activeHref?: string;
  onNavigate?: (href: string) => void;
  userName?: string;
  onLogout?: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

function isItemActive(itemHref: string, activeHref?: string): boolean {
  if (!activeHref) return false;
  if (itemHref === "/") return activeHref === "/";
  return activeHref === itemHref || activeHref.startsWith(itemHref + "/");
}

export function Navbar({
  items,
  title,
  activeHref,
  onNavigate,
  userName,
  onLogout,
  footer,
  children,
}: ChNavbarProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:48rem)");

  function handleItemClick(href: string, e: React.MouseEvent) {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  }

  if (isMobile) {
    return (
      <Box height="100dvh" overflow="hidden" display="flex" flexDirection="column">
        <SettingsMenu onLogout={onLogout} />

        <Box
          component="main"
          flex={1}
          minWidth={0}
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          {children}
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: "1rem",
            left: "1rem",
            right: "1rem",
            zIndex: (theme) => theme.zIndex.appBar,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {footer && (
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                borderRadius: "1.125rem",
                padding: "0.6rem 0.9rem",
                boxShadow: 3,
              }}
            >
              {footer}
            </Box>
          )}
          <Box
            component="nav"
            aria-label={t("ch.navbar.navigation")}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.5rem",
              backgroundColor: "primary.main",
              borderRadius: "1.125rem",
              boxShadow: 3,
            }}
          >
            {items.map((item) => {
            const active = isItemActive(item.href, activeHref);
            return (
              <Box
                key={item.href}
                component="a"
                href={item.href}
                aria-label={item.label}
                onClick={(e: React.MouseEvent) => handleItemClick(item.href, e)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="3rem"
                height="3rem"
                borderRadius="0.75rem"
                color={active ? "primary.main" : "primary.contrastText"}
                bgcolor={active ? "background.paper" : "transparent"}
                boxShadow={active ? 2 : "none"}
                sx={{ textDecoration: "none" }}
              >
                {item.icon ? <Icon name={item.icon} size="md" /> : item.label}
              </Box>
            );
          })}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" height="100dvh" overflow="hidden">
      <Box
        component="nav"
        aria-label={t("ch.navbar.navigation")}
        width={SIDEBAR_WIDTH}
        flexShrink={0}
        height="100%"
        boxSizing="border-box"
        display="flex"
        flexDirection="column"
        gap="1rem"
        padding="1.25rem 1rem"
        bgcolor="primary.main"
        color="primary.contrastText"
        sx={{ overflowY: "auto" }}
      >
        {title && (
          <Box display="flex" flexDirection="column" gap="0.875rem">
            <Heading
              level={1}
              size={4}
              align="center"
              gutterBottom={false}
              color="primary.contrastText"
            >
              {title}
            </Heading>
            <Separator variant="normal" />
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap="0.375rem" flex={1}>
          {items.map((item) => {
            const active = isItemActive(item.href, activeHref);
            return (
              <Box
                key={item.href}
                component="a"
                href={item.href}
                aria-label={item.label}
                onClick={(e: React.MouseEvent) => handleItemClick(item.href, e)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 0.875rem",
                  borderRadius: "0.625rem",
                  color: active ? "primary.main" : "primary.contrastText",
                  backgroundColor: active ? "background.paper" : "transparent",
                  boxShadow: active ? 2 : "none",
                  fontWeight: active ? 600 : 400,
                  fontSize: "1rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                  "&:hover": active ? {} : { backgroundColor: "rgba(255,255,255,0.15)" },
                }}
              >
                {item.icon && <Icon name={item.icon} size="md" />}
                {item.label}
              </Box>
            );
          })}
        </Box>

        {footer && (
          <Box display="flex" flexDirection="column" gap="1rem">
            <Separator variant="normal" />
            {footer}
          </Box>
        )}

        {(userName || onLogout) && (
          <Box display="flex" flexDirection="column" gap="1rem">
            <Separator variant="normal" />
            <Box display="flex" flexDirection="column" gap="0.5rem">
              {userName && (
                <Box fontSize="0.95rem" fontWeight={600} sx={{ wordBreak: "break-word" }}>
                  {userName}
                </Box>
              )}
              {onLogout && (
                <IconButton
                  onClick={onLogout}
                  aria-label={t("ch.navbar.logout")}
                  sx={{
                    color: "accent.contrastText",
                    backgroundColor: "accent.main",
                    borderRadius: "0.625rem",
                    width: "100%",
                    height: "3rem",
                    "&:hover": { backgroundColor: "accent.dark" },
                  }}
                >
                  <Icon name="logout" size="md" />
                </IconButton>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box
        component="main"
        flex={1}
        minWidth={0}
        height="100%"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
    </Box>
  );
}
