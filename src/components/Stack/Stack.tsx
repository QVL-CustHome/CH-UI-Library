import Box from "@mui/material/Box";
import type { FormEventHandler, ReactNode } from "react";
import { tokens } from "../../tokens";

export type ChStackGap = "xs" | "sm" | "md" | "lg" | "xl";
export type ChStackElement = "div" | "form" | "nav" | "section";

export interface ChStackProps {

  gap?: ChStackGap;

  as?: ChStackElement;

  label?: string;

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
