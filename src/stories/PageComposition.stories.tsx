import { useState } from "react";
import { Form } from "../components/Form";
import { InputEmail, InputPassword } from "../components/Input";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { PageContent } from "../components/PageContent";
import { Stack } from "../components/Stack";

export default {
  title: "Composition / Page d'authentification",
};

export const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Layout>
      <PageContent
        title="Connexion"
        footer={
          <Stack as="nav" gap="xs" label="Liens d'authentification">
            <Link href="#" size="small">
              Mot de passe oublié ?
            </Link>
            <Link href="#" size="small">
              Créer un compte
            </Link>
          </Stack>
        }
      >
        <Form onSubmit={() => undefined} submitLabel="Se connecter">
          <InputEmail label="Email" value={email} onChange={setEmail} />
          <InputPassword label="Mot de passe" value={password} onChange={setPassword} />
        </Form>
      </PageContent>
    </Layout>
  );
};
