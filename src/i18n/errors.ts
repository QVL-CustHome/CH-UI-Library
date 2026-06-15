import type { ChLocale, ChMessages } from "./messages";

export const chErrorMessages: Record<ChLocale, ChMessages> = {
  fr: {
    "ch.error.bad_request": "Requête invalide. Vérifiez les informations saisies.",
    "ch.error.unauthorized": "Identifiants invalides.",
    "ch.error.forbidden": "Accès refusé.",
    "ch.error.conflict": "Cette ressource existe déjà.",
    "ch.error.not_found": "Ressource introuvable.",
    "ch.error.account_pending": "Votre compte est en attente de validation par un administrateur.",
    "ch.error.account_disabled": "Votre compte a été désactivé.",
    "ch.error.device_not_allowed": "Vous n'êtes pas autorisé à vous connecter depuis cet appareil.",
    "ch.error.internal_error": "Une erreur interne est survenue. Veuillez réessayer plus tard.",
    "ch.error.network": "Impossible de joindre le serveur. Vérifiez votre connexion.",
    "ch.error.unknown": "Une erreur est survenue.",
  },
  en: {
    "ch.error.bad_request": "Invalid request. Please check the submitted information.",
    "ch.error.unauthorized": "Invalid credentials.",
    "ch.error.forbidden": "Access denied.",
    "ch.error.conflict": "This resource already exists.",
    "ch.error.not_found": "Resource not found.",
    "ch.error.account_pending": "Your account is awaiting administrator approval.",
    "ch.error.account_disabled": "Your account has been disabled.",
    "ch.error.device_not_allowed": "You are not allowed to sign in from this device.",
    "ch.error.internal_error": "An internal error occurred. Please try again later.",
    "ch.error.network": "Unable to reach the server. Check your connection.",
    "ch.error.unknown": "An error occurred.",
  },
};
