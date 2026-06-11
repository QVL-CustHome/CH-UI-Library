import type { Story } from "@ladle/react";
import { AddButton } from "./AddButton";

export const Defaut: Story = () => (
  <AddButton aria-label="Ajouter" onClick={() => alert("add")} />
);

export const GrandTaille: Story = () => (
  <AddButton aria-label="Ajouter" size={64} onClick={() => alert("add")} />
);

export const Desactive: Story = () => <AddButton aria-label="Ajouter" disabled />;
