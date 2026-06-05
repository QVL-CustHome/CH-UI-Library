import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChHeadingLevel = 1 | 2 | 3 | 4;
export type ChHeadingAlign = "left" | "center";

export interface ChHeadingProps {
  /** Niveau sémantique et visuel (h1 à h4). Le niveau 2 correspond au titre de page standard. */
  level?: ChHeadingLevel;
  align?: ChHeadingAlign;
  gutterBottom?: boolean;
  children: ReactNode;
}

const levelMapping = {
  1: { fontSize: tokens.typography.fontSize.xxl, fontWeight: tokens.typography.fontWeight.bold },
  2: { fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.semibold },
  3: { fontSize: tokens.typography.fontSize.lg, fontWeight: tokens.typography.fontWeight.semibold },
  4: { fontSize: tokens.typography.fontSize.md, fontWeight: tokens.typography.fontWeight.semibold },
} as const;

export function Heading({
  level = 2,
  align = "left",
  gutterBottom = true,
  children,
}: ChHeadingProps) {
  const mapped = levelMapping[level];
  return (
    <Typography
      component={`h${level}`}
      align={align}
      gutterBottom={gutterBottom}
      sx={{
        fontSize: mapped.fontSize,
        fontWeight: mapped.fontWeight,
        lineHeight: tokens.typography.lineHeight.tight,
        color: "text.primary",
      }}
    >
      {children}
    </Typography>
  );
}
