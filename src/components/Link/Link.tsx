import MuiLink from "@mui/material/Link";
import type { ElementType, ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChLinkSize = "small" | "medium";

export interface ChLinkProps {
  /** Cible du lien pour un <a> classique. Ignoré si component est fourni. */
  href?: string;
  /** Composant de routage injecté (ex. Link de react-router), sans dépendance de la librairie. */
  component?: ElementType;
  /** Cible transmise au composant injecté (prop to de react-router). */
  to?: string;
  /** small correspond aux liens secondaires sous formulaire. */
  size?: ChLinkSize;
  children: ReactNode;
}

const sizeMapping = {
  small: tokens.typography.fontSize.sm,
  medium: tokens.typography.fontSize.md,
} as const;

// MuiLink est polymorphe à l'exécution (prop component + props transmises) ;
// le cast évite d'exposer les génériques MUI dans l'API publique CustHome.
const Root = MuiLink as ElementType;

export function Link({ href, component, to, size = "medium", children }: ChLinkProps) {
  const target = component ? { component, to } : { href };
  return (
    <Root
      {...target}
      underline="hover"
      variant="body1"
      sx={{ fontSize: sizeMapping[size], color: "primary.main" }}
    >
      {children}
    </Root>
  );
}
