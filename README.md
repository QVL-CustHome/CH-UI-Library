# CH-UI-Library

Design system CustHome — librairie de composants React partagée entre tous les portails de l'écosystème.

## Architecture

- **Stack** : React 19 · Vite 7 (library mode) · TypeScript · Vitest
- **Fondation** : wrapper autour de [MUI](https://mui.com) — les portails n'importent **jamais** MUI directement, uniquement `@custhome/ui`
- **Tokens** : design tokens CustHome exposés en CSS variables (`--ch-*`) et injectés dans le thème MUI (`cssVariables: true`)
- **Micro-frontends** : conçue pour être déclarée en `shared` singleton dans une architecture Module Federation — chargée une seule fois pour tout l'écosystème
- **Vitrine** : [Ladle](https://ladle.dev)

## Distribution

Installation via URL Git taguée (semver) :

```bash
npm i git+https://github.com/QVL-CustHome/CH-UI-Library.git#v0.1.0
```

## Usage

```tsx
import { ChThemeProvider, Button } from '@custhome/ui';

function App() {
  return (
    <ChThemeProvider>
      <Button variant="primary">Connexion</Button>
    </ChThemeProvider>
  );
}
```

## Module Federation

La lib est conçue pour être partagée en singleton entre les micro-frontends. Configuration `shared` recommandée ([@module-federation/vite](https://github.com/module-federation/vite)), identique côté host et remotes :

```ts
federation({
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    "@custhome/ui": { singleton: true },
  },
})
```

`react`, `react-dom` et `@custhome/ui` ne sont alors chargés qu'une fois pour tout l'écosystème : les remotes utilisent l'instance React et le `ChThemeProvider` du host. POC fonctionnel : [poc/module-federation](poc/module-federation/README.md).

## Développement

```bash
npm install
npm run ladle    # vitrine des composants
npm test         # tests unitaires
npm run build    # build de la lib (dist/)
```

## Roadmap

1. Socle technique (Vite lib mode, tests, CI)
2. Design tokens & thème CustHome
3. Composants v1 : Button, TextField, Feedback, Card, Layout, Spinner
4. Vitrine Ladle
5. Distribution Git + compatibilité Module Federation
6. Adoption par CH-Portal-Authenticator
