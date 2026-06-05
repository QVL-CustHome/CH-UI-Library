import { Card } from "../Card";
import { Heading } from "./Heading";

export default {
  title: "Composants / Heading",
};

export const Niveaux = () => (
  <>
    <Heading level={1}>Niveau 1 — Titre principal</Heading>
    <Heading level={2}>Niveau 2 — Titre de page</Heading>
    <Heading level={3}>Niveau 3 — Section</Heading>
    <Heading level={4}>Niveau 4 — Sous-section</Heading>
  </>
);

export const TitreDePage = () => (
  <Card>
    <Heading>Connexion</Heading>
    <p>Le niveau 2 par défaut correspond au titre de page dans une Card.</p>
  </Card>
);

export const Centre = () => <Heading align="center">Titre centré</Heading>;
