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
  fill?: boolean;
  children: ReactNode;
}

export function Stack({ gap = "md", as = "div", label, onSubmit, fill = false, children }: ChStackProps) {
  return (
    <Box
      component={as}
      aria-label={label}
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      gap={tokens.spacing[gap]}
      {...(fill ? { flex: 1, minHeight: 0 } : {})}
    >
      {children}
    </Box>
  );
}
