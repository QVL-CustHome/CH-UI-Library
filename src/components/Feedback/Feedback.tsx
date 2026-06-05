import Alert from "@mui/material/Alert";
import type { ReactNode } from "react";

export type ChFeedbackSeverity = "success" | "error" | "info" | "warning";

export interface ChFeedbackProps {
  severity?: ChFeedbackSeverity;
  children?: ReactNode;
  error?: string | null;
  info?: string | null;
  onClose?: () => void;
}

export function Feedback({ severity, children, error, info, onClose }: ChFeedbackProps) {
  const legacyMessage = error || info || null;
  const resolvedSeverity = error ? "error" : info ? "info" : (severity ?? "info");
  const content = legacyMessage ?? children;

  if (!content) {
    return null;
  }

  return (
    <Alert severity={resolvedSeverity} onClose={onClose}>
      {content}
    </Alert>
  );
}
