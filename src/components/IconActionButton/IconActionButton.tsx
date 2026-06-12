import MuiIconButton from "@mui/material/IconButton";
import type { MouseEventHandler } from "react";
import { Icon, type ChIconName } from "../Icon";

export type ChIconActionButtonVariant = "default" | "danger" | "secondary";

export interface ChIconActionButtonProps {
  icon: ChIconName;
  variant?: ChIconActionButtonVariant;
  size?: number;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label": string;
}

const bgMap = {
  default: "accent.main",
  danger: "error.main",
  secondary: "secondary.main",
} as const;

const hoverBgMap = {
  default: "accent.dark",
  danger: "error.dark",
  secondary: "secondary.dark",
} as const;

const fgMap = {
  default: "#fff",
  danger: "#fff",
  secondary: "secondary.contrastText",
} as const;

export function IconActionButton({
  icon,
  variant = "default",
  size = 40,
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: ChIconActionButtonProps) {
  const iconSize = Math.round(size * 0.7);

  return (
    <MuiIconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      sx={{
        width: size,
        height: size,
        borderRadius: "10px",
        color: disabled ? "action.disabled" : fgMap[variant],
        bgcolor: disabled ? "action.disabledBackground" : bgMap[variant],
        transition: "all 0.15s",
        "&:hover": {
          bgcolor: hoverBgMap[variant],
        },
      }}
    >
      <Icon name={icon} size={iconSize} variant="solid" />
    </MuiIconButton>
  );
}
