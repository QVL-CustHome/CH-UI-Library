export type ChLocale = "fr" | "en";

export type ChMessages = Record<string, string>;

export type ChLocaleMessages = Partial<Record<ChLocale, ChMessages>>;

export const chBaseMessages: Record<ChLocale, ChMessages> = {
  fr: {
    "ch.themeToggle.toDark": "Activer le thème sombre",
    "ch.themeToggle.toLight": "Activer le thème clair",
    "ch.language.label": "Langue",
    "ch.input.showPassword": "Afficher la saisie",
    "ch.input.hidePassword": "Masquer la saisie",
    "ch.navbar.openMenu": "Ouvrir le menu",
    "ch.navbar.closeMenu": "Fermer le menu",
    "ch.navbar.navigation": "Navigation principale",
    "ch.navbar.logout": "Déconnexion",
    "ch.validation.required": "Ce champ est requis.",
    "ch.validation.email": "Format d'email invalide.",
    "ch.validation.passwordMin": "Le mot de passe doit contenir au moins {min} caractères.",
  },
  en: {
    "ch.themeToggle.toDark": "Switch to dark theme",
    "ch.themeToggle.toLight": "Switch to light theme",
    "ch.language.label": "Language",
    "ch.input.showPassword": "Show entry",
    "ch.input.hidePassword": "Hide entry",
    "ch.navbar.openMenu": "Open menu",
    "ch.navbar.closeMenu": "Close menu",
    "ch.navbar.navigation": "Main navigation",
    "ch.navbar.logout": "Logout",
    "ch.validation.required": "This field is required.",
    "ch.validation.email": "Invalid email format.",
    "ch.validation.passwordMin": "Password must be at least {min} characters long.",
  },
};
