# Changelog — @custhome/ui

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/) et le versioning [semver](https://semver.org/lang/fr/).

## [0.2.0] — 2026-06-08

### Ajouté

- **Composants typographie & mise en page** : `Heading` (niveaux h1–h6, alignement, tailles sémantiques), `Stack` (espacement vertical cohérent via tokens), `Link` (polymorphe, compatible react-router), `DescriptionList` (paires terme/définition)
- **Identité visuelle CustHome** intégrée au thème : police Chivo, palettes claire et sombre, couleur d'accent
- **Bascule de thème au runtime** : hook `useChTheme()` (`mode`, `resolvedMode`, `setMode`, `toggleMode`), `ChThemeProvider` avec `defaultMode` (`light`/`dark`/`system`), suivi de `prefers-color-scheme` et persistance `localStorage` (clé `ch-theme-mode`)
- **Composants de structure de page réutilisables** : `PageScaffold` (cadre de page : marque + zone centrée + `ThemeToggle` fixe en bas à gauche), `PageContent` (surface de contenu), `Form` (formulaire : champs + erreur + bouton de soumission, logique extraite dans `useForm`) et `ThemeToggle` (bouton de bascule clair/sombre, logique extraite dans `useThemeToggle`)
- **Composant `Icon`** backé par `vite-plugin-svgr` : icônes SVG de `src/assets/icons` en composants React, variantes `outline`/`solid`, recoloration via `currentColor` (couleurs du thème)
- **Composants d'input par type** : `Input` (base), `InputText`, `InputEmail`, `InputPassword` — icône intégrée, toggle de visibilité du mot de passe, validation regex front à la perte de focus, libellés/erreurs i18n
- **Internationalisation** : `ChI18nProvider` + hook `useTranslation` (`t(clé, vars)`, `locale`, `locales`, `setLocale`), changement de langue au runtime persisté (`localStorage` `ch-locale`), messages de base `fr`/`en`, fusion avec les messages de l'application
- **`LanguageSelector`** : sélecteur de langue (couleur secondary), rendu en haut à droite de `PageContent`, masqué si une seule locale
- **Validation partagée** : `EMAIL_REGEX`, `PASSWORD_MIN_LENGTH`, `isValidEmail`, `isValidPassword`

### Modifié

- `Button` : la variante `secondary` utilise désormais la **couleur secondary** de la palette (au lieu d'un outlined primary)
- `Heading` : nouvelle prop `size` (taille visuelle 1–5) découplée de `level` (sémantique) + prop `color` ; le `Layout` rend la marque en titre proéminent (h1, taille 2) et `PageContent` rend le titre de page plus petit (h2, taille 4) pour une hiérarchie cohérente
- **Suppression de `TextField`** au profit des composants `Input*` (un composant par type d'input)

### Modifié

- Index public (`src/index.ts`) : export des nouveaux composants `Heading`, `Stack`, `Link`, `DescriptionList` et de leurs types, ainsi que `useChTheme` et les types `ChThemePreference` / `ChThemeContextValue`
- `ChThemeProvider` : nouvelles props `defaultMode` et `storageKey` ; la prop `mode` reste un mode forcé (contrôlé), rétro-compatible

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
