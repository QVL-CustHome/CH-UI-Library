import { Button } from "../Button";
import { Card } from "../Card";
import { Heading } from "../Heading";
import { Stack } from "../Stack";
import { TextField } from "../TextField";
import { Link } from "./Link";

export default {
  title: "Composants / Link",
};

export const Tailles = () => (
  <Stack gap="sm">
    <Link href="#medium">Lien medium (par défaut)</Link>
    <Link href="#small" size="small">
      Lien small (liens secondaires)
    </Link>
  </Stack>
);

export const SousFormulaire = () => (
  <Card>
    <Heading>Connexion</Heading>
    <Stack as="form" onSubmit={(e) => e.preventDefault()}>
      <TextField label="Email" type="email" value="" onChange={() => {}} />
      <Button type="submit" fullWidth>
        Se connecter
      </Button>
    </Stack>
    <Stack as="nav" label="Liens secondaires" gap="xs">
      <Link href="#forgot" size="small">
        Mot de passe oublié ?
      </Link>
      <Link href="#register" size="small">
        Créer un compte
      </Link>
    </Stack>
  </Card>
);
