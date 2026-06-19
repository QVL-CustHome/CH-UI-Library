import MuiDivider from "@mui/material/Divider";
import type { ReactNode } from "react";

export type ChDividerOrientation = "horizontal" | "vertical";

export type ChDividerSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";

const spacingMap: Record<ChDividerSpacing, string | undefined> = {
  none: undefined,
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
};

export interface ChDividerProps {
  orientation?: ChDividerOrientation;
  spacing?: ChDividerSpacing;
  flexItem?: boolean;
  children?: ReactNode;
}

export function Divider({
  orientation = "horizontal",
  spacing = "md",
  flexItem = false,
  children,
}: ChDividerProps) {
  const gap = spacingMap[spacing];
  const margin =
    gap === undefined
      ? undefined
      : orientation === "vertical"
        ? { marginInline: gap }
        : { marginBlock: gap };

  return (
    <MuiDivider
      orientation={orientation}
      flexItem={flexItem}
      textAlign="center"
      sx={margin}
    >
      {children}
    </MuiDivider>
  );
}
