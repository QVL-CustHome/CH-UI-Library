import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export type ChProgressBarColor =
  | "primary"
  | "secondary"
  | "accent"
  | "error"
  | "warning"
  | "info"
  | "success";

export interface ChProgressBarProps {
  value: number;
  label?: string;
  color?: ChProgressBarColor;
  showValue?: boolean;
}

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function ProgressBar({
  value,
  label,
  color = "primary",
  showValue = false,
}: ChProgressBarProps) {
  const percentage = clampPercentage(value);
  const rounded = Math.round(percentage);

  return (
    <Box display="flex" flexDirection="column" gap="0.375rem" width="100%">
      {(label || showValue) && (
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="0.5rem">
          {label && (
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography variant="body2" color="text.secondary">
              {rounded}%
            </Typography>
          )}
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        aria-label={label}
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={100}
        sx={{ height: "0.5rem", borderRadius: "0.25rem" }}
      />
    </Box>
  );
}
