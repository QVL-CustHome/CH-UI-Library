import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { useTranslation } from "../../i18n";

export interface ChSidePanelProps {

  open: boolean;

  onClose: () => void;

  title?: string;

  width?: number;

  children: ReactNode;

  footer?: ReactNode;
}

export function SidePanel({
  open,
  onClose,
  title,
  width = 420,
  children,
  footer,
}: ChSidePanelProps) {
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width,
          maxWidth: "90vw",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="0.75rem"
        padding="1rem 1.25rem"
        borderBottom="0.0625rem solid"
        borderColor="divider"
        flexShrink={0}
      >
        {title ? (
          <Heading level={2} size={4} gutterBottom={false}>
            {title}
          </Heading>
        ) : (
          <span />
        )}
        <IconButton
          onClick={onClose}
          aria-label={t("ch.sidePanel.close")}
          sx={{ color: "text.secondary" }}
        >
          <Icon name="close" size={22} />
        </IconButton>
      </Box>

      <Box flex={1} padding="1.25rem" sx={{ overflowY: "auto" }}>{children}</Box>

      {footer && (
        <Box
          padding="1rem 1.25rem"
          borderTop="0.0625rem solid"
          borderColor="divider"
          flexShrink={0}
        >
          {footer}
        </Box>
      )}
    </Drawer>
  );
}
