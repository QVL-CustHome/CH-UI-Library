import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChCardGridGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface ChCardGridProps {
  minItemWidth?: string;
  gap?: ChCardGridGap;
  children: ReactNode;
}

export function CardGrid({ minItemWidth = "16rem", gap = "md", children }: ChCardGridProps) {
  return (
    <Box
      display="grid"
      gap={tokens.spacing[gap]}
      gridTemplateColumns={`repeat(auto-fit, minmax(${minItemWidth}, 1fr))`}
    >
      {children}
    </Box>
  );
}
