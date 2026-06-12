import { useState } from "react";
import { Navbar, type ChNavbarItem } from "./Navbar";
import { Card } from "../Card";
import { Heading } from "../Heading";

export default {
  title: "Composants / Navbar",
  meta: { iframed: true },
};

const items: ChNavbarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "apps" },
  { label: "Utilisateurs", href: "/users", icon: "user" },
  { label: "Roles", href: "/roles", icon: "shield" },
  { label: "Parametres", href: "/settings", icon: "settings" },
];

export const Default = () => (
  <Navbar items={items} activeHref="/dashboard">
    <Heading level={2} size={3}>
      Dashboard
    </Heading>
    <Card>Contenu de la page principale.</Card>
  </Navbar>
);

export const AvecTitrePersonnalise = () => (
  <Navbar items={items} activeHref="/users">
    <Heading level={2} size={3}>
      Utilisateurs
    </Heading>
    <Card>Liste des utilisateurs du portail.</Card>
  </Navbar>
);

export const AvecUtilisateur = () => (
  <Navbar
    items={items}
    activeHref="/dashboard"
    userName="Martin Queval"
    onLogout={() => alert("Deconnexion !")}
  >
    <Heading level={2} size={3}>
      Dashboard
    </Heading>
    <Card>
      Le footer affiche le nom de l&apos;utilisateur et le bouton de deconnexion integre.
    </Card>
  </Navbar>
);

export const NavigationInteractive = () => {
  const [active, setActive] = useState("/dashboard");
  return (
    <Navbar items={items} activeHref={active} onNavigate={setActive} userName="Martin Queval">
      <Heading level={2} size={3}>
        {items.find((i) => i.href === active)?.label ?? "Page"}
      </Heading>
      <Card>
        Cliquez sur les liens de la sidebar pour naviguer. L&apos;item actif change dynamiquement.
      </Card>
    </Navbar>
  );
};

export const SansIcones = () => {
  const simpleItems: ChNavbarItem[] = [
    { label: "Accueil", href: "/" },
    { label: "Profil", href: "/profile" },
    { label: "Aide", href: "/help" },
  ];
  return (
    <Navbar items={simpleItems} activeHref="/">
      <Heading level={2} size={3}>
        Accueil
      </Heading>
      <Card>Les items de navigation fonctionnent aussi sans icones.</Card>
    </Navbar>
  );
};
