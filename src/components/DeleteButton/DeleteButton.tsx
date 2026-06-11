import { useState, type ReactNode } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import { IconActionButton } from "../IconActionButton";
import { useTranslation } from "../../i18n";

export interface ChDeleteButtonProps {
  /** Action exécutée une fois la suppression confirmée. */
  onConfirm: () => void | Promise<void>;
  "aria-label": string;
  /** Titre de la pop-up de confirmation (défaut : i18n). */
  confirmTitle?: string;
  /** Message optionnel affiché dans la pop-up. */
  confirmMessage?: ReactNode;
  /** Libellé du bouton de confirmation (défaut : i18n). */
  confirmLabel?: string;
  /** Libellé du bouton d'annulation (défaut : i18n). */
  cancelLabel?: string;
  disabled?: boolean;
  size?: number;
}

/**
 * Bouton de suppression (icône corbeille, variante danger) avec une pop-up
 * de confirmation intégrée par défaut. `onConfirm` n'est appelé qu'après
 * validation de l'utilisateur dans la boîte de dialogue.
 */
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
