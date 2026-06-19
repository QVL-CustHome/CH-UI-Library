import type { CSSProperties } from "react";
import { icons, type ChIconName } from "./icons";

export type ChIconVariant = "outline" | "solid";

export type ChIconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ChIconColor =
  | "primary"
  | "secondary"
  | "accent"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "inherit";

const sizeMap: Record<ChIconSize, string> = {
  xs: "1rem",
  sm: "1.25rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
};

const colorMap: Record<ChIconColor, string> = {
  primary: "var(--ch-palette-primary-main)",
  secondary: "var(--ch-palette-secondary-main)",
  accent: "var(--ch-palette-accent-main)",
  error: "var(--ch-palette-error-main)",
  warning: "var(--ch-palette-warning-main)",
  info: "var(--ch-palette-info-main)",
  success: "var(--ch-palette-success-main)",
  inherit: "currentColor",
};

export interface ChIconProps {
  name: ChIconName;
  variant?: ChIconVariant;
  size?: ChIconSize;
  color?: ChIconColor;
  title?: string;
}

export function Icon({
  name,
  variant = "outline",
  size = "md",
  color = "inherit",
  title,
}: ChIconProps) {
  const Svg = icons[name][variant];
  const dimension = sizeMap[size];
  const style: CSSProperties = {
    color: colorMap[color],
    display: "inline-flex",
    verticalAlign: "middle",
  };
  return (
    <Svg
      width={dimension}
      height={dimension}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable={false}
    />
  );
}
