import Box from "@mui/material/Box";
import { useState } from "react";
import { Button } from "../Button";
import { Feedback } from "./Feedback";

export default {
  title: "Composants / Feedback",
};

export const Severites = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}>
    <Feedback severity="success">Compte créé avec succès</Feedback>
    <Feedback severity="error">Identifiants invalides</Feedback>
    <Feedback severity="info">Un email vous a été envoyé</Feedback>
    <Feedback severity="warning">Votre session expire bientôt</Feedback>
  </Box>
);

export const ErreurEtInformation = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}>
    <Feedback severity="error">Erreur renvoyée par l'API</Feedback>
    <Feedback severity="info">Message d'information du portail</Feedback>
  </Box>
);

export const AvecFermeture = () => {
  const [visible, setVisible] = useState(true);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}>
      {visible ? (
        <Feedback severity="success" onClose={() => setVisible(false)}>
          Modifications enregistrées
        </Feedback>
      ) : (
        <Button variant="secondary" onClick={() => setVisible(true)}>
          Réafficher
        </Button>
      )}
    </Box>
  );
};
