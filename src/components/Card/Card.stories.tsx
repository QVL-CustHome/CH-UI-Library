import Box from "@mui/material/Box";
import { Button } from "../Button";
import { Card } from "./Card";

export default {
  title: "Composants / Card",
};

export const Complete = () => (
  <Box sx={{ maxWidth: 380 }}>
    <Card
      title="Mon compte"
      subtitle="Informations personnelles"
      actions={
        <>
          <Button variant="secondary" size="small">
            Annuler
          </Button>
          <Button size="small">Enregistrer</Button>
        </>
      }
    >
      Contenu du formulaire de profil.
    </Card>
  </Box>
);

export const ContenuSeul = () => (
  <Box sx={{ maxWidth: 380 }}>
    <Card>Une carte minimale, sans en-tête ni actions.</Card>
  </Box>
);

export const Elevations = () => (
  <Box sx={{ display: "flex", gap: 3 }}>
    <Card elevation="none" title="none">
      Bordure plate
    </Card>
    <Card elevation="sm" title="sm">
      Ombre légère
    </Card>
    <Card elevation="md" title="md">
      Ombre moyenne
    </Card>
    <Card elevation="lg" title="lg">
      Ombre forte
    </Card>
  </Box>
);
