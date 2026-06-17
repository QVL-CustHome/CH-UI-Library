import { Legend } from "./Legend";

export default {
  title: "Composants / Legend",
};

export const Defaut = () => (
  <Legend
    items={[
      { status: "success", label: "Actif" },
      { status: "warning", label: "En attente" },
      { status: "error", label: "Erreur" },
      { status: "neutral", label: "Désactivé" },
    ]}
  />
);

export const PendingSeul = () => <Legend items={[{ status: "warning", label: "En attente de validation" }]} />;
