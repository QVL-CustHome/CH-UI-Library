import type { MouseEventHandler } from "react";
import { IconActionButton } from "../IconActionButton";

export interface ChEditButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: number;
  "aria-label": string;
}

export function EditButton({
  onClick,
  disabled = false,
  size = 40,
  "aria-label": ariaLabel,
}: ChEditButtonProps) {
  return (
    <IconActionButton
      icon="pencil"
      variant="default"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      size={size}
    />
  );
}
