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
  fill?: boolean;
  children: ReactNode;
}

const shadowMapping = {
  none: "none",
  sm: "0 0 0.75rem rgba(28, 30, 33, 0.1)",
  md: "0 0 1rem rgba(28, 30, 33, 0.12)",
  lg: "0 0 1.75rem rgba(28, 30, 33, 0.16)",
} as const;

export function Card({ title, subtitle, actions, elevation = "sm", fill = false, children }: ChCardProps) {
  return (
    <MuiCard
      elevation={0}
      sx={{
        boxShadow: shadowMapping[elevation],
        ...(fill ? { display: "flex", flexDirection: "column", flex: 1, minHeight: 0 } : {}),
      }}
    >
      {title ? (
        <CardHeader title={title} subheader={subtitle} sx={fill ? { flexShrink: 0 } : undefined} />
      ) : null}
      <CardContent
        sx={
          fill
            ? { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }
            : undefined
        }
      >
        {children}
      </CardContent>
      {actions ? (
        <CardActions sx={fill ? { flexShrink: 0 } : undefined}>{actions}</CardActions>
      ) : null}
    </MuiCard>
  );
}
