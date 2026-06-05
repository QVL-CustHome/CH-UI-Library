import { Button, Card, Layout, Spinner } from "@custhome/ui";
import { lazy, Suspense } from "react";

const Widget = lazy(() => import("remote/Widget"));

export default function App() {
  return (
    <Layout brand="POC Module Federation" maxWidth={520}>
      <Card
        title="App hôte"
        subtitle="Port 4173 — consomme le widget du remote"
        actions={<Button variant="secondary">Bouton local de l'hôte</Button>}
      >
        <Suspense fallback={<Spinner label="Chargement du widget fédéré" />}>
          <Widget />
        </Suspense>
      </Card>
    </Layout>
  );
}
