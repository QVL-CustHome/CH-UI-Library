# POC Module Federation — @custhome/ui en singleton

Deux apps Vite fédérées avec [@module-federation/vite](https://github.com/module-federation/vite) :

- **remote** (port 4174) — expose `./Widget`, un composant construit avec `@custhome/ui` (Card, Button, Feedback)
- **host** (port 4173) — consomme `remote/Widget` et fournit le `ChThemeProvider`

`react`, `react-dom` et `@custhome/ui` sont déclarés `shared` en singleton dans les deux configs : ils ne sont chargés qu'une fois, le widget du remote utilise l'instance React et le thème de l'hôte.

## Lancer le POC

```bash
cd remote
npm install
npm run build
npm run preview        # http://localhost:4174

cd ../host
npm install
npm run build
npm run preview        # http://localhost:4173
```

Ouvrir http://localhost:4173 : la carte « App hôte » contient le « Widget fédéré » servi par le remote, rendu avec le thème CustHome de l'hôte. Dans l'onglet Réseau, `react` et `@custhome/ui` ne sont téléchargés qu'une seule fois (depuis l'hôte) malgré les deux apps.

Ici `@custhome/ui` est référencé en `file:../../..` pour itérer vite ; dans un portail réel, utiliser l'URL Git taguée (voir docs/RELEASE.md).
