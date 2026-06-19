import Box from "@mui/material/Box";
import type { FormEventHandler, ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChStackGap = "xs" | "sm" | "md" | "lg" | "xl";
export type ChStackElement = "div" | "form" | "nav" | "section";
export type ChStackDirection = "row" | "column";
export type ChStackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type ChStackJustify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type ChStackPadding = ChStackGap | "none";

const alignMap: Record<ChStackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<ChStackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
};

export interface ChStackProps {
  gap?: ChStackGap;
  direction?: ChStackDirection;
  alignItems?: ChStackAlign;
  justifyContent?: ChStackJustify;
  wrap?: boolean;
  padding?: ChStackPadding;
  as?: ChStackElement;
  label?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  fill?: boolean;
  children: ReactNode;
}

export function Stack({
  gap = "md",
  direction = "column",
  alignItems,
  justifyContent,
  wrap = false,
  padding = "none",
  as = "div",
  label,
  onSubmit,
  fill = false,
  children,
}: ChStackProps) {
  return (
    <Box
      component={as}
      aria-label={label}
      onSubmit={onSubmit}
      display="flex"
      flexDirection={direction}
      flexWrap={wrap ? "wrap" : "nowrap"}
      gap={tokens.spacing[gap]}
      alignItems={alignItems ? alignMap[alignItems] : undefined}
      justifyContent={justifyContent ? justifyMap[justifyContent] : undefined}
      padding={padding === "none" ? undefined : tokens.spacing[padding]}
      {...(fill ? { flex: 1, minHeight: 0 } : {})}
    >
      {children}
    </Box>
  );
}
