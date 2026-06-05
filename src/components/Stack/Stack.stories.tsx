import { Button } from "../Button";
import { Card } from "../Card";
import { Heading } from "../Heading";
import { TextField } from "../TextField";
import { Stack } from "./Stack";

export default {
  title: "Composants / Stack",
};

export const Gaps = () => (
  <Stack gap="xl">
    {(["xs", "sm", "md", "lg", "xl"] as const).map((gap) => (
      <Stack key={gap} gap={gap}>
        <span>gap {gap} — premier</span>
        <span>gap {gap} — second</span>
      </Stack>
    ))}
  </Stack>
);

export const Formulaire = () => (
  <Card>
    <Heading>Connexion</Heading>
    <Stack as="form" onSubmit={(e) => e.preventDefault()}>
      <TextField label="Email" type="email" value="" onChange={() => {}} />
      <TextField label="Mot de passe" type="password" value="" onChange={() => {}} />
      <Button type="submit" fullWidth>
        Se connecter
      </Button>
    </Stack>
  </Card>
);

export const GroupeDeLiens = () => (
  <Stack as="nav" label="Liens secondaires" gap="xs">
    <a href="#forgot">Mot de passe oublié ?</a>
    <a href="#register">Créer un compte</a>
  </Stack>
);
