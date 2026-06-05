import MuiButton from "@mui/material/Button";
import type { MouseEventHandler, ReactNode } from "react";

export type ChButtonVariant = "primary" | "secondary" | "danger";
export type ChButtonSize = "small" | "medium" | "large";

export interface ChButtonProps {
  variant?: ChButtonVariant;
  size?: ChButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

const variantMapping = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "outlined", color: "primary" },
  danger: { variant: "contained", color: "error" },
} as const;

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
  startIcon,
  endIcon,
  children,
}: ChButtonProps) {
  const mapped = variantMapping[variant];
  return (
    <MuiButton
      variant={mapped.variant}
      color={mapped.color}
      size={size}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disableElevation
    >
      {children}
    </MuiButton>
  );
}
