import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, type ReactNode } from "react";
import { Icon, type ChIconName } from "../Icon";
import { LanguageSelector } from "../LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { useTranslation } from "../../i18n";

const SIDEBAR_WIDTH = 248;

export interface ChNavbarItem {
  label: string;
  icon?: ChIconName;
  href: string;
}

export interface ChNavbarProps {
  items: ChNavbarItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  userName?: string;
  onLogout?: () => void;
  children: ReactNode;
}

function isItemActive(itemHref: string, activeHref?: string): boolean {
  if (!activeHref) return false;
  if (itemHref === "/") return activeHref === "/";
  return activeHref === itemHref || activeHref.startsWith(itemHref + "/");
}

export function Navbar({
  items,
  activeHref,
  onNavigate,
  userName,
  onLogout,
  children,
}: ChNavbarProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  function handleItemClick(href: string, e: React.MouseEvent) {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  }

  if (isMobile) {
    return (
      <Box sx={{ height: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <IconButton
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          aria-label={t("ch.navbar.openMenu")}
          sx={{
            position: "fixed",
            top: 12,
            right: 12,
            zIndex: (theme) => theme.zIndex.appBar + 1,
            width: 44,
            height: 44,
            borderRadius: "10px",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            boxShadow: 2,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <Icon name="menu" size={22} />
        </IconButton>

        <Popover
          open={Boolean(menuAnchor)}
          anchorEl={menuAnchor}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5, alignItems: "center" }}>
            <LanguageSelector width={58} />
            <ThemeToggle />
            {onLogout && (
              <IconButton
                onClick={() => {
                  setMenuAnchor(null);
                  onLogout();
                }}
                aria-label={t("ch.navbar.logout")}
                sx={{
                  width: 58,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "accent.main",
                  color: "accent.contrastText",
                  "&:hover": { bgcolor: "accent.dark" },
                }}
              >
                <Icon name="logout" size={20} />
              </IconButton>
            )}
          </Box>
        </Popover>

        <Box
          component="main"
          sx={{ flex: 1, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
        >
          {children}
        </Box>

        <Box
          component="nav"
          aria-label={t("ch.navbar.navigation")}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            right: 16,
            zIndex: (theme) => theme.zIndex.appBar,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 0.5,
            p: 1,
            bgcolor: "primary.main",
            borderRadius: "18px",
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: active ? "primary.main" : "primary.contrastText",
                  bgcolor: active ? "background.paper" : "transparent",
                  boxShadow: active ? 2 : "none",
                }}
              >
                {item.icon ? <Icon name={item.icon} size={24} /> : item.label}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      <Box
        component="nav"
        aria-label={t("ch.navbar.navigation")}
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: "20px 16px",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, flex: 1 }}>
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
                  gap: 1.5,
                  p: "12px 14px",
                  borderRadius: "10px",
                  color: active ? "primary.main" : "primary.contrastText",
                  bgcolor: active ? "background.paper" : "transparent",
                  boxShadow: active ? 2 : "none",
                  fontWeight: active ? 600 : 400,
                  fontSize: "1rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                  "&:hover": active ? {} : { bgcolor: "rgba(255,255,255,0.15)" },
                }}
              >
                {item.icon && <Icon name={item.icon} size={26} />}
                {item.label}
              </Box>
            );
          })}
        </Box>

        {(userName || onLogout) && (
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.25)",
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {userName && (
              <Box sx={{ fontSize: "0.95rem", fontWeight: 600, wordBreak: "break-word" }}>
                {userName}
              </Box>
            )}
            {onLogout && (
              <IconButton
                onClick={onLogout}
                aria-label={t("ch.navbar.logout")}
                sx={{
                  color: "accent.contrastText",
                  bgcolor: "accent.main",
                  borderRadius: "10px",
                  width: "100%",
                  height: 48,
                  "&:hover": { bgcolor: "accent.dark" },
                }}
              >
                <Icon name="logout" size={24} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
