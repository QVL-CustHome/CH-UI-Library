import Typography from "@mui/material/Typography";
import { Button } from "../Button";
import { Card } from "../Card";
import { Layout } from "./Layout";

export default {
  title: "Composants / Layout",
  meta: { iframed: true },
};

export const PagePortail = () => (
  <Layout>
    <Card title="Connexion" actions={<Button fullWidth>Se connecter</Button>}>
      Formulaire de connexion du portail.
    </Card>
  </Layout>
);

export const BrandPersonnalise = () => (
  <Layout brand="HealthServ" maxWidth={500}>
    <Card>Portail avec un brand différent et un contenu plus large.</Card>
  </Layout>
);

export const HeaderPersonnalise = () => (
  <Layout header={<Typography variant="h5">En-tête personnalisé</Typography>}>
    <Card>Le header remplace le brand par défaut.</Card>
  </Layout>
);
