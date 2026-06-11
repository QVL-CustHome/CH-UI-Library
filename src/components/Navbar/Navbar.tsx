import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type ReactNode, useEffect, useState } from "react";
import { Heading } from "../Heading";
import { Icon, type ChIconName } from "../Icon";
import { useTranslation } from "../../i18n";

const SIDEBAR_WIDTH = 248;

export interface ChNavbarItem {
  label: string;
  icon?: ChIconName;
  href: string;
}

export interface ChNavbarProps {
  title?: string;
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
  title = "CustHome",
  items,
  activeHref,
  onNavigate,
  userName,
  onLogout,
  children,
}: ChNavbarProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeHref]);

  function handleItemClick(href: string, e: React.MouseEvent) {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    setMobileOpen(false);
  }

  const sidebarContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: "20px 16px",
        gap: 3,
        bgcolor: "accent.main",
        color: "accent.contrastText",
        overflowY: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1 }}>
          <Heading level={1} size={4} gutterBottom={false} color="accent.contrastText">
            {title}
          </Heading>
        </Box>
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(false)}
            aria-label={t("ch.navbar.closeMenu")}
            sx={{ color: "accent.contrastText" }}
          >
            <Icon name="close" size={24} />
          </IconButton>
        )}
      </Box>

      <Box
        component="nav"
        aria-label={t("ch.navbar.navigation")}
        sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}
      >
        {items.map((item) => {
          const active = isItemActive(item.href, activeHref);
          return (
            <Box
              key={item.href}
              component="a"
              href={item.href}
              onClick={(e: React.MouseEvent) => handleItemClick(item.href, e)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: "10px 12px",
                borderRadius: "8px",
                color: active ? "accent.main" : "accent.contrastText",
                bgcolor: active ? "background.paper" : "transparent",
                fontWeight: active ? 600 : 400,
                fontSize: "0.95rem",
                textDecoration: "none",
                cursor: "pointer",
                transition: "background-color 0.15s",
                "&:hover": active ? {} : { bgcolor: "rgba(255,255,255,0.15)" },
              }}
            >
              {item.icon && <Icon name={item.icon} size={20} />}
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
            <Box sx={{ fontSize: "0.9rem", fontWeight: 600, wordBreak: "break-word" }}>
              {userName}
            </Box>
          )}
          {onLogout && (
            <IconButton
              onClick={onLogout}
              aria-label={t("ch.navbar.logout")}
              sx={{
                color: "primary.contrastText",
                bgcolor: "primary.main",
                borderRadius: "8px",
                width: "100%",
                height: 40,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <Icon name="logout" size={22} />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box component="nav" sx={{ width: isMobile ? 0 : SIDEBAR_WIDTH, flexShrink: 0 }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              maxWidth: isMobile ? "85vw" : undefined,
              border: "none",
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {isMobile && (
          <Box
            component="header"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: (theme) => theme.zIndex.appBar,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: "12px 16px",
              bgcolor: "accent.main",
              color: "accent.contrastText",
            }}
          >
            <IconButton
              onClick={() => setMobileOpen(true)}
              aria-label={t("ch.navbar.openMenu")}
              sx={{ color: "accent.contrastText", p: "6px" }}
            >
              <Icon name="menu" size={24} />
            </IconButton>
            <Box component="span" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
              {title}
            </Box>
          </Box>
        )}
        <Box component="main" sx={{ flex: 1, p: isMobile ? 2 : "32px 40px" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
