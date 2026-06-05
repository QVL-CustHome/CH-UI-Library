# Theming CustHome

## Principe

Les design tokens sont définis dans `src/tokens/` (palette, typographie, spacing, radius, shadows) et exposés de deux façons :

1. **Objet TypeScript typé** — `import { tokens } from "@custhome/ui"`
2. **CSS variables `--ch-*`** — générées au runtime par MUI (`createTheme({ cssVariables: { cssVarPrefix: "ch" } })`)

Les composants MUI résolvent leurs couleurs via `var(--ch-palette-*)` au runtime : aucune valeur n'est figée dans le rendu, ce qui rend le thème surchargeable sans rebuild.

## Usage dans un portail

```tsx
import { ChThemeProvider } from "@custhome/ui";

function App() {
  return (
    <ChThemeProvider>
      <Routes />
    </ChThemeProvider>
  );
}
```

## POC — surcharge sans rebuild (dark mode / white-label)

Surcharger 2-3 variables dans une feuille de style chargée après la lib suffit à changer le rendu, sans recompiler ni la lib ni le portail :

```css
:root {
  --ch-palette-primary-main: #7c3aed;
  --ch-palette-background-default: #121212;
  --ch-palette-text-primary: #e6e6e6;
}
```

Tous les composants consommant le thème (boutons, champs, surfaces…) reflètent immédiatement les nouvelles valeurs, car MUI référence `var(--ch-…)` dans les styles émis.

Variables disponibles : ouvrir les DevTools sur `:root` — toutes les variables générées portent le préfixe `--ch-`.

## Vitrine

Les tokens seront documentés visuellement dans la vitrine Ladle (US-4.1).
