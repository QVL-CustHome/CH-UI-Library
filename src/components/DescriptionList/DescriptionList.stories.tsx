import { Button } from "../Button";
import { Card } from "../Card";
import { Heading } from "../Heading";
import { DescriptionList } from "./DescriptionList";

export default {
  title: "Composants / DescriptionList",
};

export const Profil = () => (
  <Card>
    <Heading>Mon compte</Heading>
    <DescriptionList
      items={[
        { label: "Email", value: "martin@custhome.fr" },
        {
          label: "Rôles",
          value: (
            <ul>
              <li>portal-admin : admin</li>
              <li>portal-client : user</li>
            </ul>
          ),
        },
        { label: "Compte créé le", value: "05/06/2026" },
      ]}
    />
    <Button variant="secondary">Se déconnecter</Button>
  </Card>
);

export const ValeursRiches = () => (
  <DescriptionList
    items={[
      { label: "Texte", value: "Valeur simple" },
      { label: "Emphase", value: <em>Aucun rôle attribué</em> },
      { label: "Valeur absente" },
    ]}
  />
);
