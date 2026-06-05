# Migration Feedback — CH-Portail-Authenticator → @custhome/ui

L'API historique est rétro-compatible : seul l'import change.

## Avant (composant local)

```tsx
import Feedback from "./components/Feedback";

<Feedback error={error} info={info} />
```

## Après (@custhome/ui)

```tsx
import { Feedback } from "@custhome/ui";

<Feedback error={error} info={info} />
```

Différences :

| | Local | @custhome/ui |
|---|---|---|
| Import | défaut | nommé (`{ Feedback }`) |
| `error` / `info` | ✅ | ✅ inchangé (priorité erreur, rien si vide) |
| Rendu | `<p class="feedback-*">` | MUI `Alert` thémé CustHome, `role="alert"` |
| Sévérités | error, info | + `severity="success" \| "warning"` avec children |
| Fermeture | — | `onClose` optionnel (croix) |

Les classes CSS `.feedback`, `.feedback-error`, `.feedback-info` du portail peuvent être supprimées après migration (US-6.1).

## Nouvelle API étendue

```tsx
<Feedback severity="success" onClose={() => setMessage(null)}>
  Compte créé avec succès
</Feedback>
```
