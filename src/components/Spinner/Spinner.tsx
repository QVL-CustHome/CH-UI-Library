import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export type ChSpinnerSize = "small" | "medium" | "large";

export interface ChSpinnerProps {
  fullPage?: boolean;
  size?: ChSpinnerSize;
  label?: string;
}

const sizeMapping = {
  small: 20,
  medium: 40,
  large: 64,
} as const;

export function Spinner({ fullPage = false, size = "medium", label = "Chargement" }: ChSpinnerProps) {
  const progress = (
    <CircularProgress color="accent" size={sizeMapping[size]} aria-label={label} />
  );

  if (!fullPage) {
    return progress;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      {progress}
    </Box>
  );
}
