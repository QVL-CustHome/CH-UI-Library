# Procédure de release — @custhome/ui

## Distribution

La lib est consommée via une URL Git taguée, sans registry privé :

```bash
npm i git+https://github.com/QVL-CustHome/CH-UI-Library.git#v0.1.0
```

### Décision : script `prepare` (pas de `dist/` commité)

Deux options existaient :

| Option | Avantages | Inconvénients |
|---|---|---|
| **`prepare` qui builde à l'installation** ✅ retenue | `dist/` jamais commité, build toujours cohérent avec les sources du tag, aucune étape manuelle de release | Installation plus lente (npm installe les devDependencies du paquet pour exécuter `prepare`) |
| `dist/` commité sur les tags | Installation rapide | Risque de désynchronisation sources/dist, manipulation git supplémentaire à chaque release, pollution des diffs |

npm exécute automatiquement le script `prepare` lors de l'installation d'une dépendance Git : le consommateur reçoit un `dist/` fraîchement buildé depuis les sources du tag.

## Versioning : semver

- **MAJOR** : rupture d'API publique (props renommées/supprimées, comportement changé)
- **MINOR** : nouveau composant, nouvelle prop, nouveau token
- **PATCH** : correction de bug sans changement d'API

## Étapes de release

1. Mettre à jour `version` dans `package.json` et `CH_UI_VERSION` dans `src/index.ts`
2. Compléter `CHANGELOG.md` (section datée pour la nouvelle version)
3. Ouvrir une PR vers `main`, la merger après validation (lint + tests + build)
4. Taguer le commit de merge sur `main` :
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
5. Mettre à jour la référence du tag dans les portails consommateurs :
   ```bash
   npm i git+https://github.com/QVL-CustHome/CH-UI-Library.git#vX.Y.Z
   ```
