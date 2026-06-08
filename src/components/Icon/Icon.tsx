import type { CSSProperties } from "react";
import { icons, type ChIconName } from "./icons";

export type ChIconVariant = "outline" | "solid";

export interface ChIconProps {
  name: ChIconName;
  variant?: ChIconVariant;
  size?: number;
  color?: string;
  title?: string;
}

export function Icon({
  name,
  variant = "outline",
  size = 24,
  color = "currentColor",
  title,
}: ChIconProps) {
  const Svg = icons[name][variant];
  const style: CSSProperties = { color, display: "inline-flex", verticalAlign: "middle" };
  return (
    <Svg
      width={size}
      height={size}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable={false}
    />
  );
}
