import { useState } from "react";
import { Button } from "../Button";
import { Toast } from "./Toast";

export default {
  title: "Composants / Toast",
};

export const Defaut = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Afficher le toast</Button>
      <Toast open={open} message="Jean Dupont a été activé" onClose={() => setOpen(false)} />
    </>
  );
};

export const Desactivation = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Réafficher</Button>
      <Toast open={open} message="Jean Dupont a été désactivé" onClose={() => setOpen(false)} />
    </>
  );
};
