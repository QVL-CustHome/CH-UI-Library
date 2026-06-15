import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { Icon } from "../Icon";
import { LanguageSelector } from "../LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { useTranslation } from "../../i18n";

export interface ChSettingsMenuProps {
  onLogout?: () => void;
}

export function SettingsMenu({ onLogout }: ChSettingsMenuProps) {
  const { t } = useTranslation();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton
        onClick={(e) => setAnchor(e.currentTarget)}
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
        <Icon name="settings" size={22} />
      </IconButton>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { mt: 1, bgcolor: "secondary.main", borderRadius: "12px" } } }}
      >
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5, alignItems: "center" }}>
          <LanguageSelector width={58} />
          <ThemeToggle />
          {onLogout && (
            <IconButton
              onClick={() => {
                setAnchor(null);
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
    </>
  );
}
