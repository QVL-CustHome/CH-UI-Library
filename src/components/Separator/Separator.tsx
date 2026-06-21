import Box from "@mui/material/Box";

export type ChSeparatorVariant = "normal" | "fullWidth";

export interface ChSeparatorProps {
  variant?: ChSeparatorVariant;
  inset?: string;
}

const DEFAULT_INSET = "1rem";

const separatorColor =
  "color-mix(in srgb, var(--ch-palette-primary-contrastText) 25%, transparent)";

export function Separator({ variant = "normal", inset = DEFAULT_INSET }: ChSeparatorProps) {
  const isFullWidth = variant === "fullWidth";

  return (
    <Box
      role="separator"
      borderBottom="0.0625rem solid"
      borderColor={separatorColor}
      marginX={isFullWidth ? `-${inset}` : undefined}
    />
  );
}
