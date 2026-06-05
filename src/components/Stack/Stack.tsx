import Box from "@mui/material/Box";
import type { FormEventHandler, ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChStackGap = "xs" | "sm" | "md" | "lg" | "xl";
export type ChStackElement = "div" | "form" | "nav" | "section";

export interface ChStackProps {
  /** Espacement vertical entre les enfants, issu des tokens spacing. */
  gap?: ChStackGap;
  /** Élément HTML rendu : div par défaut, form pour les formulaires, nav pour les groupes de liens. */
  as?: ChStackElement;
  /** Libellé accessible (aria-label), utile pour les nav. */
  label?: string;
  /** Soumission du formulaire lorsque as="form". */
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export function Stack({ gap = "md", as = "div", label, onSubmit, children }: ChStackProps) {
  return (
    <Box
      component={as}
      aria-label={label}
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacing[gap],
      }}
    >
      {children}
    </Box>
  );
}
