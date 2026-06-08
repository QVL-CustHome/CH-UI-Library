import { useState } from "react";
import { Stack } from "../Stack";
import { InputEmail } from "./InputEmail";
import { InputPassword } from "./InputPassword";
import { InputText } from "./InputText";

export default {
  title: "Composants / Input",
};

export const ParType = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Stack gap="md">
      <InputText label="Nom" value={name} onChange={setName} icon="user" />
      <InputEmail label="Email" value={email} onChange={setEmail} required />
      <InputPassword label="Mot de passe" value={password} onChange={setPassword} required />
    </Stack>
  );
};
