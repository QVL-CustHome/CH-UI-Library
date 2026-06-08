import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChHeadingLevel = 1 | 2 | 3 | 4;
export type ChHeadingSize = 1 | 2 | 3 | 4 | 5;
export type ChHeadingAlign = "left" | "center";

export interface ChHeadingProps {
  level?: ChHeadingLevel;
  size?: ChHeadingSize;
  align?: ChHeadingAlign;
  gutterBottom?: boolean;
  color?: string;
  children: ReactNode;
}

const sizeMapping = {
  1: tokens.typography.heading.h1,
  2: tokens.typography.heading.h2,
  3: tokens.typography.heading.h3,
  4: tokens.typography.heading.h4,
  5: tokens.typography.heading.h5,
} as const;

export function Heading({
  level = 2,
  size,
  align = "left",
  gutterBottom = true,
  color = "text.primary",
  children,
}: ChHeadingProps) {
  return (
    <Typography
      component={`h${level}`}
      align={align}
      gutterBottom={gutterBottom}
      sx={{
        fontSize: sizeMapping[size ?? level],
        fontWeight: tokens.typography.fontWeight.bold,
        lineHeight: tokens.typography.lineHeight.tight,
        color,
      }}
    >
      {children}
    </Typography>
  );
}
