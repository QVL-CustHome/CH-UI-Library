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

// Échelle de titres de la marque (Chivo 700, ratio 1.333) — US-7.5.
const levelMapping = {
  1: { fontSize: tokens.typography.heading.h1, fontWeight: tokens.typography.fontWeight.bold },
  2: { fontSize: tokens.typography.heading.h2, fontWeight: tokens.typography.fontWeight.bold },
  3: { fontSize: tokens.typography.heading.h3, fontWeight: tokens.typography.fontWeight.bold },
  4: { fontSize: tokens.typography.heading.h4, fontWeight: tokens.typography.fontWeight.bold },
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
