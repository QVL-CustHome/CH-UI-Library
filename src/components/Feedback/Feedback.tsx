import Alert from "@mui/material/Alert";
import type { ReactNode } from "react";

export type ChFeedbackSeverity = "success" | "error" | "info" | "warning";

export interface ChFeedbackProps {
  severity?: ChFeedbackSeverity;
  children?: ReactNode;
  onClose?: () => void;
}

export function Feedback({ severity = "info", children, onClose }: ChFeedbackProps) {
  if (!children) {
    return null;
  }

  return (
    <Alert severity={severity} onClose={onClose}>
      {children}
    </Alert>
  );
}
