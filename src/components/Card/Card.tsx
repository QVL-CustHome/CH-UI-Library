import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import type { ReactNode } from "react";

export type ChCardElevation = "none" | "sm" | "md" | "lg";

export interface ChCardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  elevation?: ChCardElevation;
  children: ReactNode;
}

const shadowMapping = {
  none: "none",
  sm: "0 0 12px rgba(28, 30, 33, 0.1)",
  md: "0 0 16px rgba(28, 30, 33, 0.12)",
  lg: "0 0 28px rgba(28, 30, 33, 0.16)",
} as const;

export function Card({ title, subtitle, actions, elevation = "sm", children }: ChCardProps) {
  return (
    <MuiCard elevation={0} sx={{ boxShadow: shadowMapping[elevation] }}>
      {title ? <CardHeader title={title} subheader={subtitle} /> : null}
      <CardContent>{children}</CardContent>
      {actions ? <CardActions>{actions}</CardActions> : null}
    </MuiCard>
  );
}
