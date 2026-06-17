import type { MouseEventHandler } from "react";
import { IconActionButton } from "../IconActionButton";

export interface ChApproveButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: number;
  "aria-label": string;
}

export function ApproveButton({
  onClick,
  disabled = false,
  size = 40,
  "aria-label": ariaLabel,
}: ChApproveButtonProps) {
  return (
    <IconActionButton
      icon="check"
      variant="default"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      size={size}
    />
  );
}
