import { useState } from "react";
import { Button } from "../Button";
import { ConfirmDialog } from "./ConfirmDialog";

export default {
  title: "Composants / ConfirmDialog",
};

export const Confirmation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Ouvrir</Button>
      <ConfirmDialog
        open={open}
        title="Valider le compte ?"
        message="L'utilisateur pourra se connecter immédiatement."
        confirmLabel="Valider"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export const Destructive = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Supprimer
      </Button>
      <ConfirmDialog
        open={open}
        title="Supprimer ce compte ?"
        message="Cette action est définitive et irréversible."
        confirmLabel="Supprimer"
        destructive
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
