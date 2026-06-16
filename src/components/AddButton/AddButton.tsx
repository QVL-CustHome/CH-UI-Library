import Box from "@mui/material/Box";
import type { MouseEventHandler } from "react";
import { IconActionButton } from "../IconActionButton";

export interface ChAddButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: number;
  "aria-label": string;
}

export function AddButton({
  onClick,
  disabled = false,
  size = 40,
  "aria-label": ariaLabel,
}: ChAddButtonProps) {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <IconActionButton
        icon="plus"
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
        size={size}
      />
    </Box>
  );
}
