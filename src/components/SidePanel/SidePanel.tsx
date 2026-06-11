import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { useTranslation } from "../../i18n";

export interface ChSidePanelProps {
  /** Affiche / masque le panneau. */
  open: boolean;
  /** Appelé à la fermeture (clic sur la croix ou sur l'overlay). */
  onClose: () => void;
  /** Titre affiché dans l'en-tête. */
  title?: string;
  /** Largeur du panneau en pixels (plafonnée à 90vw sur petit écran). */
  width?: number;
  /** Contenu principal (les items). */
  children: ReactNode;
  /** Zone d'actions optionnelle, épinglée en bas du panneau. */
  footer?: ReactNode;
}

/**
 * Panneau latéral qui glisse depuis la droite de l'écran (animation MUI Drawer).
 * En-tête avec titre + bouton fermer, corps défilant, footer optionnel.
 */
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
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          p: "16px 20px",
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
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

      <Box sx={{ flex: 1, overflowY: "auto", p: "20px" }}>{children}</Box>

      {footer && (
        <Box
          sx={{
            p: "16px 20px",
            borderTop: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          {footer}
        </Box>
      )}
    </Drawer>
  );
}
