import Box from "@mui/material/Box";
import { Button } from "./Button";

export default {
  title: "Composants / Button",
};

export const Variantes = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
  </Box>
);

export const Tailles = () => (
  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </Box>
);

export const EtatLoading = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    <Button loading>Connexion</Button>
    <Button variant="secondary" loading>
      Envoi
    </Button>
  </Box>
);

export const EtatDisabled = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    <Button disabled>Primary</Button>
    <Button variant="secondary" disabled>
      Secondary
    </Button>
    <Button variant="danger" disabled>
      Danger
    </Button>
  </Box>
);

export const PleineLargeur = () => <Button fullWidth>Connexion</Button>;
