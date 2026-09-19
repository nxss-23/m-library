# Migration brief — Study Library → Maryam Library

## Objectif

Créer une nouvelle instance indépendante de Study Library pour Maryam à partir de la version existante de Nassim.

### Source
- GitHub : `nxss-23/study-library`
- produit : Nassim Library
- production : `https://nassim-library.pages.dev`

### Cible
- GitHub : `nxss-23/m-library`
- produit : Maryam Library
- production future : `https://maryam-library.pages.dev`

## Ce qui doit être identique à Nassim Library

Reprendre la base actuelle du repo source, notamment :

- Astro + Starlight ;
- structure du projet ;
- Montserrat ;
- design général ;
- thèmes clair/sombre ;
- layout et largeurs ;
- sidebar repliable ;
- recherche Pagefind et filtres ;
- KaTeX ;
- Mermaid ;
- système de blocs académiques colorés ;
- export PDF via impression navigateur ;
- bouton Edit flottant ;
- responsive ;
- conventions de contenu ;
- tests/build scripts utiles ;
- Pages CMS en raw ;
- GitHub comme source de vérité ;
- Cloudflare Pages comme hébergement.

Ne pas reconstruire ces fonctions depuis zéro si elles peuvent être copiées/adaptées.

## Ce qui doit changer

### Identité
- utiliser Maryam Library si un nom utilisateur apparaît ;
- package/repo/config ne doivent plus faire référence inutilement à Nassim ;
- futur `site:` Astro : `https://maryam-library.pages.dev` seulement quand le domaine Cloudflare existe réellement.

### Cours
Supprimer les 6 cours de Nassim de la nouvelle instance et créer seulement :

1. **Mathématiques** — slug `mathematiques`
2. **Microéconomie** — slug `microeconomie`
3. **Chimie** — slug `chimie`
4. **Statistiques** — slug `statistiques`
5. **Allemand** — slug `allemand`

Aucun code de cours.

### Contenu
Créer une base propre et vide. Ne copier aucun contenu académique personnel de Nassim.

Chaque cours possède :
- index.md
- synthese.md
- exercices.md
- formulaire.md
- examens.md

Les fichiers académiques doivent avoir un frontmatter compatible avec le schéma existant. Si le schéma actuel impose `course` et `type`, adapter les valeurs aux noms/slugs de Maryam sans inventer de code.

## Attention aux références au repo source

Chercher et remplacer uniquement les références qui doivent devenir spécifiques à Maryam :

- Pages CMS : `nxss-23/study-library` → `nxss-23/m-library`
- liens Edit idem
- domaine de production : futur `maryam-library.pages.dev`
- documentation spécifique aux cours de Nassim

Ne pas faire un remplacement aveugle qui casserait l'historique/documentation de référence.

## Cloudflare

La connexion finale doit être Git-integrated :

- repo : `nxss-23/m-library`
- branch : `main`
- build : `npm run build`
- output : `dist`
- Node : 22
- project name : `maryam-library`

Après connexion Git, chaque push sur `main` doit déployer automatiquement le site.

## Critère de réussite

Maryam Library doit donner l'impression d'être la même application que Nassim Library, mais initialisée pour ces 5 cours et sans aucune donnée académique personnelle de Nassim.
