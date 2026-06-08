import Chip from "@mui/material/Chip";

export type ChStatusTone = "success" | "warning" | "error" | "info" | "neutral";

export interface ChStatusChipProps {
  tone?: ChStatusTone;
  label: string;
  size?: "small" | "medium";
}

const toneMapping = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  neutral: "default",
} as const;

export function StatusChip({ tone = "neutral", label, size = "small" }: ChStatusChipProps) {
  return <Chip label={label} color={toneMapping[tone]} size={size} variant="filled" />;
}
