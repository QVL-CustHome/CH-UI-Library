import MuiLink from "@mui/material/Link";
import type { ElementType, ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChLinkSize = "small" | "medium";
export type ChLinkColor = "primary" | "secondary" | "accent";

export interface ChLinkProps {

  href?: string;

  component?: ElementType;

  to?: string;

  size?: ChLinkSize;
  color?: ChLinkColor;
  children: ReactNode;
}

const sizeMapping = {
  small: tokens.typography.fontSize.sm,
  medium: tokens.typography.fontSize.md,
} as const;

const Root = MuiLink as ElementType;

export function Link({ href, component, to, size = "medium", color = "accent", children }: ChLinkProps) {
  const target = component ? { component, to } : { href };
  return (
    <Root
      {...target}
      underline="hover"
      variant="body1"
      sx={{ fontSize: sizeMapping[size], color: `${color}.main` }}
    >
      {children}
    </Root>
  );
}
