import { useState } from "react";
import { InputEmail, InputPassword } from "../Input";
import { Form } from "./Form";

export default {
  title: "Composants / Form",
};

export const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form onSubmit={() => undefined} submitLabel="Se connecter">
      <InputEmail label="Email" value={email} onChange={setEmail} />
      <InputPassword label="Mot de passe" value={password} onChange={setPassword} />
    </Form>
  );
};

export const AvecErreur = () => {
  const [email, setEmail] = useState("");
  return (
    <Form onSubmit={() => undefined} submitLabel="Se connecter" error="Identifiants invalides.">
      <InputEmail label="Email" value={email} onChange={setEmail} />
    </Form>
  );
};

export const EnChargement = () => {
  const [email, setEmail] = useState("");
  return (
    <Form onSubmit={() => undefined} submitLabel="Se connecter" loading>
      <InputEmail label="Email" value={email} onChange={setEmail} />
    </Form>
  );
};
