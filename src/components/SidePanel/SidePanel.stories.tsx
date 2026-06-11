import { useState } from "react";
import { Button } from "../Button";
import { InputText } from "../Input";
import { IconActionButton } from "../IconActionButton";
import { SidePanel } from "./SidePanel";

export default {
  title: "Composants / SidePanel",
};

export const Defaut = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Jean Dupont");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Ouvrir le panneau</Button>
      <SidePanel
        open={open}
        onClose={() => setOpen(false)}
        title="Modifier l'utilisateur"
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <IconActionButton icon="cancel" variant="secondary" aria-label="Annuler" onClick={() => setOpen(false)} />
            <IconActionButton icon="save" aria-label="Enregistrer" onClick={() => setOpen(false)} />
          </div>
        }
      >
        <InputText label="Nom" value={name} onChange={setName} />
      </SidePanel>
    </>
  );
};
