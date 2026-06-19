import MuiMenu from "@mui/material/Menu";
import type { ReactNode } from "react";

export interface ChMenuPosition {
  top: number;
  left: number;
}

export interface ChMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  position?: ChMenuPosition;
  label?: string;
  children: ReactNode;
}

export function Menu({ open, onClose, anchorEl, position, label, children }: ChMenuProps) {
  const usePosition = !anchorEl && Boolean(position);

  return (
    <MuiMenu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl ?? undefined}
      anchorReference={usePosition ? "anchorPosition" : "anchorEl"}
      anchorPosition={position ? { top: position.top, left: position.left } : undefined}
      MenuListProps={{ role: "menu", "aria-label": label }}
      slotProps={{ paper: { sx: { borderRadius: "0.5rem", boxShadow: 2 } } }}
    >
      {children}
    </MuiMenu>
  );
}
