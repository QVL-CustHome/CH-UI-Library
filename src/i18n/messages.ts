import { chErrorMessages } from "./errors";

export type ChLocale = "fr" | "en";

export type ChMessages = Record<string, string>;

export type ChLocaleMessages = Partial<Record<ChLocale, ChMessages>>;

const baseMessages: Record<ChLocale, ChMessages> = {
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
    "ch.sidePanel.close": "Fermer le panneau",
    "ch.deleteButton.title": "Confirmer la suppression ?",
    "ch.deleteButton.confirm": "Supprimer",
    "ch.deleteButton.cancel": "Annuler",
    "ch.validation.required": "Ce champ est requis.",
    "ch.validation.email": "Format d'email invalide.",
    "ch.validation.pattern": "Format invalide.",
    "ch.validation.passwordMin": "Le mot de passe doit contenir au moins {min} caractères.",
    "ch.validation.password": "Le mot de passe ne respecte pas tous les critères de sécurité.",
    "ch.password.strengthLabel": "Niveau de sécurité du mot de passe",
    "ch.password.length": "Au moins {min} caractères",
    "ch.password.uppercase": "Une majuscule",
    "ch.password.lowercase": "Une minuscule",
    "ch.password.digit": "Un chiffre",
    "ch.password.special": "Un caractère spécial",
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
    "ch.sidePanel.close": "Close panel",
    "ch.deleteButton.title": "Confirm deletion?",
    "ch.deleteButton.confirm": "Delete",
    "ch.deleteButton.cancel": "Cancel",
    "ch.validation.required": "This field is required.",
    "ch.validation.email": "Invalid email format.",
    "ch.validation.pattern": "Invalid format.",
    "ch.validation.passwordMin": "Password must be at least {min} characters long.",
    "ch.validation.password": "Password does not meet all security criteria.",
    "ch.password.strengthLabel": "Password security level",
    "ch.password.length": "At least {min} characters",
    "ch.password.uppercase": "One uppercase letter",
    "ch.password.lowercase": "One lowercase letter",
    "ch.password.digit": "One digit",
    "ch.password.special": "One special character",
  },
};

export const chBaseMessages: Record<ChLocale, ChMessages> = {
  fr: { ...baseMessages.fr, ...chErrorMessages.fr },
  en: { ...baseMessages.en, ...chErrorMessages.en },
};
