import type { Story } from "@ladle/react";
import { ApproveButton } from "./ApproveButton";

export const Defaut: Story = () => (
  <ApproveButton aria-label="Approuver" onClick={() => alert("approve")} />
);

export const GrandeTaille: Story = () => (
  <ApproveButton aria-label="Approuver" size={64} onClick={() => alert("approve")} />
);

export const Desactive: Story = () => <ApproveButton aria-label="Approuver" disabled />;
