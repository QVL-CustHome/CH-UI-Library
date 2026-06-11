import { DeleteButton } from "./DeleteButton";

export default {
  title: "Composants / DeleteButton",
};

export const Defaut = () => (
  <DeleteButton aria-label="Supprimer" onConfirm={() => alert("supprimé")} />
);

export const AvecMessage = () => (
  <DeleteButton
    aria-label="Supprimer"
    confirmTitle="Supprimer cet utilisateur ?"
    confirmMessage="Cette action est irréversible (jean@test.fr)."
    onConfirm={() => alert("supprimé")}
  />
);

export const Desactive = () => <DeleteButton aria-label="Supprimer" disabled onConfirm={() => {}} />;
