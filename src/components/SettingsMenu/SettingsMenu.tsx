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
          top: "0.75rem",
          right: "0.75rem",
          zIndex: (theme) => theme.zIndex.appBar + 1,
          width: "2.75rem",
          height: "2.75rem",
          borderRadius: "0.625rem",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          boxShadow: 2,
          "&:hover": { backgroundColor: "primary.dark" },
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
        slotProps={{ paper: { sx: { marginTop: "0.5rem", backgroundColor: "secondary.main", borderRadius: "0.75rem" } } }}
      >
        <Box padding="1rem" display="flex" flexDirection="column" gap="0.75rem" alignItems="center">
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
                width: "3.625rem",
                height: "2.25rem",
                borderRadius: "0.625rem",
                backgroundColor: "accent.main",
                color: "accent.contrastText",
                "&:hover": { backgroundColor: "accent.dark" },
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
