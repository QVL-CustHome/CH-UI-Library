import Box from "@mui/material/Box";
import { useState } from "react";
import { TextField } from "./TextField";

export default {
  title: "Composants / TextField",
};

export const Standard = () => {
  const [value, setValue] = useState("");
  return (
    <TextField
      label="Email"
      value={value}
      onChange={setValue}
      placeholder="nom@domaine.fr"
      helperText="Utilisé pour la connexion"
    />
  );
};

export const Erreur = () => {
  const [value, setValue] = useState("martin@");
  return <TextField label="Email" value={value} onChange={setValue} error="Email invalide" />;
};

export const MotDePasse = () => {
  const [value, setValue] = useState("secret123");
  return <TextField label="Mot de passe" type="password" value={value} onChange={setValue} />;
};

export const Etats = () => {
  const [value, setValue] = useState("Valeur");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 320 }}>
      <TextField label="Requis" value={value} onChange={setValue} required />
      <TextField label="Désactivé" value={value} onChange={setValue} disabled />
      <TextField label="Small" value={value} onChange={setValue} size="small" />
    </Box>
  );
};
