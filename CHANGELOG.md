# Changelog — @custhome/ui

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/) et le versioning [semver](https://semver.org/lang/fr/).

## [0.1.1] — 2026-06-05

### Modifié

- `TextField` : aria-labels du toggle de visibilité password renommés en « Afficher la saisie » / « Masquer la saisie » pour ne pas entrer en collision avec les requêtes `getByLabelText(/mot de passe/i)` des consommateurs

## [0.1.0] — 2026-06-05

Première version du design system CustHome.

### Ajouté

- **Socle** : Vite 7 en mode librairie (ESM, `preserveModules`, types `.d.ts`), React 19, TypeScript strict, peer dependencies MUI 7 / Emotion
- **Design tokens** (`tokens`) : palette, typographie, espacements, radius, ombres — objet TypeScript typé + CSS variables `--ch-*` au runtime
- **Thème** : `ChThemeProvider` (ThemeProvider MUI + CssBaseline), `createChTheme()`, surcharge des tokens sans rebuild (voir docs/THEMING.md)
- **Composants** : `Button` (primary/secondary/danger, tailles, loading), `TextField` (label, erreur, password avec toggle), `Feedback` (success/error/info/warning, API rétro-compatible portail), `Card` (en-tête/contenu/actions, élévations tokens), `Layout` (page portail centrée, header optionnel), `Spinner` (inline/pleine page)
- **Vitrine Ladle** : page d'accueil tokens + une story par composant (`npm run ladle`)
- **Distribution** : installation par URL Git taguée, build à l'installation via `prepare`
