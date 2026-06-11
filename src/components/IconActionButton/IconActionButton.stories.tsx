import type { Story } from "@ladle/react";
import { IconActionButton } from "./IconActionButton";

export const Supprimer: Story = () => (
  <IconActionButton icon="trash" variant="danger" aria-label="Supprimer" onClick={() => alert("delete")} />
);

export const Editer: Story = () => (
  <IconActionButton icon="pencil" aria-label="Éditer" onClick={() => alert("edit")} />
);

export const GrandeBouton: Story = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <IconActionButton icon="trash" variant="danger" size={52} aria-label="Supprimer" />
    <IconActionButton icon="pencil" size={52} aria-label="Éditer" />
  </div>
);

export const Desactive: Story = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <IconActionButton icon="trash" variant="danger" disabled aria-label="Supprimer" />
    <IconActionButton icon="pencil" disabled aria-label="Éditer" />
  </div>
);
