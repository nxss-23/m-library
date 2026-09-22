# AGENTS.md — Maryam Library

## Mission

Construire **Maryam Library** en dupliquant fidèlement la base existante de **Nassim Library**.

### Source de vérité

Repo de référence :
`nxss-23/study-library`

Ce repo est la version fonctionnelle actuelle de Nassim Library. Avant toute modification importante, comparer avec cette base plutôt que de réinventer une solution.

Repo cible :
`nxss-23/m-library`

Futur domaine Cloudflare Pages :
`https://maryam-library.pages.dev`

## Règles impératives

1. Ne pas redesign Study Library.
2. Ne pas changer de stack.
3. Ne pas introduire de backend, base de données, auth custom, Worker ou API GitHub.
4. Ne pas hardcoder de règles pédagogiques propres à un cours.
5. Garder GitHub comme source de vérité.
6. Garder Astro + Starlight et le comportement documentaire existant.
7. Préserver la compatibilité Markdown, KaTeX, Mermaid, Pagefind et les blocs académiques.
8. Préserver le responsive, le thème clair/sombre, le PDF, la sidebar repliable et le bouton Edit.
9. Pages CMS doit rester en **raw editor**. Ne jamais passer le body en rich-text : cela peut supprimer les wrappers HTML `academic-block`.
10. Faire des diffs ciblés. Pas de refactor opportuniste.

## Cours cibles

Exactement 5 cours :

- Mathématiques
- Microéconomie
- Chimie
- Statistiques
- Allemand

Aucun code de cours.

Dossiers conseillés :

- `src/content/docs/cours/mathematiques/`
- `src/content/docs/cours/microeconomie/`
- `src/content/docs/cours/chimie/`
- `src/content/docs/cours/statistiques/`
- `src/content/docs/cours/allemand/`

Chaque dossier contient :

- `index.md`
- `synthese.md`
- `exercices.md`
- `formulaire.md`
- `examens.md`

## Convention des documents

Les 4 documents académiques restent :

### Synthèse
Théorie utile, définitions, concepts, méthodes, résultats importants, explications condensées.

### Exercices
Exercices sélectionnés pour être refaits, avec énoncés propres, source, notion, importance et corrections regroupées plus bas si disponibles.

### Formulaire
Résultats, formules, conditions d'application, rappels très condensés et repères utiles.

### Examens
Énoncés d'examens/questions d'examen, espaces de notes, pièges et points à revoir.

## Blocs académiques

Conserver le système visuel existant de `study-library`, notamment :

- `academic-block--definition`
- `academic-block--theorem`
- `academic-block--example`
- `academic-block--pitfall`
- `academic-block--method`
- `academic-block--memorize`
- `academic-block--statement`
- `academic-block--correction`

Ne pas convertir ces blocs en texte simple.

## Pages CMS

Créer/configurer `.pages.yml` pour les 5 cours × 4 documents = 20 documents.

Contraintes :

- groupes par cours ;
- `format: raw` ;
- `create: false` ;
- `rename: false` ;
- `delete: false` ;
- aucun rich-text.

Les identifiants doivent être simples et stables, par exemple :

- `mathematiques-synthese`
- `microeconomie-exercices`
- `allemand-formulaire`

## Bouton Edit

Le bouton crayon doit rester fixe et visible desktop/mobile comme dans Nassim Library.

Il doit ouvrir directement le document correspondant dans Pages CMS, mais pour le nouveau repo :

`https://app.pagescms.org/nxss-23/m-library/main/file/<slug>`

Le mapping doit être calculé, pas 20 URLs hardcodées.

## Navigation

La sidebar doit afficher simplement les noms des cours, sans code :

- Mathématiques
- Microéconomie
- Chimie
- Statistiques
- Allemand

Sous chaque cours :

- Synthèse
- Exercices
- Formulaire
- Examens

## Validation minimale

Avant livraison :

- `npm run check`
- `npm run build`
- `git diff --check`

Ne lancer Playwright / tests lourds que si une régression le justifie.


## Règles de rendu académique

Les règles de syntaxe détaillées sont définies dans :

`docs/03_markdown_rendering_rules.md`

Avant toute modification d’un document académique, lire obligatoirement :

1. le fichier ciblé ;
2. `docs/01_content_conventions.md` ;
3. `docs/03_markdown_rendering_rules.md`.

Ne pas improviser une syntaxe différente si une convention existe déjà.

### Invariants obligatoires

- jamais de fence de code échappée comme `\`\`\`` ;
- jamais de ligne contenant seulement `$` pour faire une formule display ;
- utiliser `$...$` en inline et `$$...$$` en display ;
- ne pas utiliser `\(...\)` ni `\[...\]` comme délimiteurs principaux ;
- ne pas mettre de formule display multilignes dans un tableau ;
- ne pas indenter les blocs `$$...$$` à l’intérieur d’une liste ;
- conserver une ligne vide autour du contenu Markdown dans les blocs HTML ;
- ne pas imbriquer les `academic-block` ;
- ne pas placer les corrections d’exercices dans `<details>` ;
- conserver les ancres et liens aller/retour des exercices ;
- ne pas ajouter de HTML custom non documenté.

En cas de doute, suivre exactement `docs/03_markdown_rendering_rules.md`.

## Audit de rendu obligatoire

Lorsqu’une demande concerne plusieurs documents ou une correction globale :

1. auditer tous les vrais `.md` concernés, pas uniquement les fixtures ;
2. rechercher les patterns interdits du guide ;
3. corriger la syntaxe avant d’ajouter du nouveau contenu ;
4. vérifier le rendu de chaque page modifiée en desktop et mobile ;
5. vérifier qu’aucune page réelle ne provoque de débordement horizontal ;
6. vérifier KaTeX, Mermaid, tableaux, code, ancres et blocs HTML lorsqu’ils sont présents.

Un build réussi ne suffit pas à prouver que le rendu est correct.

## Validation après modification académique

Après toute modification de contenu académique, exécuter réellement :

- `npm run build` ;
- `npm run test:render` ;
- `git diff --check`.

Après une modification technique ou de configuration, exécuter aussi :

- `npm run check`.

Ne jamais annoncer une validation qui n’a pas été exécutée.
