import { useState, type ReactNode } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import { IconActionButton } from "../IconActionButton";
import { useTranslation } from "../../i18n";

export interface ChDeleteButtonProps {
  
  onConfirm: () => void | Promise<void>;
  "aria-label": string;
  
  confirmTitle?: string;
  
  confirmMessage?: ReactNode;
  
  confirmLabel?: string;
  
  cancelLabel?: string;
  disabled?: boolean;
  size?: number;
}


export function DeleteButton({
  onConfirm,
  "aria-label": ariaLabel,
  confirmTitle,
  confirmMessage,
  confirmLabel,
  cancelLabel,
  disabled = false,
  size,
}: ChDeleteButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <IconActionButton
        icon="trash"
        variant="danger"
        aria-label={ariaLabel}
        disabled={disabled}
        size={size}
        onClick={() => setOpen(true)}
      />
      <ConfirmDialog
        open={open}
        title={confirmTitle ?? t("ch.deleteButton.title")}
        message={confirmMessage}
        confirmLabel={confirmLabel ?? t("ch.deleteButton.confirm")}
        cancelLabel={cancelLabel ?? t("ch.deleteButton.cancel")}
        destructive
        loading={busy}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
