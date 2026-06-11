import type { Story } from "@ladle/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

export const Standard: Story = () => {
  const [on, setOn] = useState(false);
  return <Toggle checked={on} onChange={setOn} label="Activer" />;
};

export const Active: Story = () => {
  const [on, setOn] = useState(true);
  return <Toggle checked={on} onChange={setOn} label="Activer" />;
};

export const Desactive: Story = () => (
  <Toggle checked={false} onChange={() => {}} disabled label="Desactive" />
);

export const Petit: Story = () => {
  const [on, setOn] = useState(false);
  return <Toggle checked={on} onChange={setOn} size="small" label="Petit" />;
};
