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

const elevationMapping = {
  none: 0,
  sm: 1,
  md: 2,
  lg: 3,
} as const;

export function Card({ title, subtitle, actions, elevation = "sm", children }: ChCardProps) {
  return (
    <MuiCard elevation={elevationMapping[elevation]}>
      {title ? <CardHeader title={title} subheader={subtitle} /> : null}
      <CardContent>{children}</CardContent>
      {actions ? <CardActions>{actions}</CardActions> : null}
    </MuiCard>
  );
}
