# Maryam Library

Instance indépendante de **Study Library** pour Maryam.

## Référence produit et technique

La base de référence est le repo GitHub privé :

`nxss-23/study-library`

Ce repo correspond à **Nassim Library**, actuellement déployé sur Cloudflare Pages sous `nassim-library.pages.dev`.

**Maryam Library doit reprendre exactement la même base technique, UX et structure**, sans réinventer le produit ni modifier la direction visuelle. Le nouveau repo cible est :

`nxss-23/m-library`

Le futur site Cloudflare devra être :

`https://maryam-library.pages.dev`

## Cours de Maryam

Il y a exactement 5 cours, sans code de cours :

1. Mathématiques
2. Microéconomie
3. Chimie
4. Statistiques
5. Allemand

Slugs/dossiers recommandés :

- `mathematiques`
- `microeconomie`
- `chimie`
- `statistiques`
- `allemand`

Aucun code académique ne doit être affiché ou inventé.

## Structure académique

Chaque cours doit conserver exactement les 4 documents académiques de Study Library :

- Synthèse
- Exercices
- Formulaire
- Examens

Une page `index.md` de navigation par cours est autorisée et ne compte pas comme cinquième document académique.

## Principe de migration

Ce projet n'est **pas une nouvelle conception**. Il faut partir de `nxss-23/study-library` comme source de vérité et adapter uniquement ce qui est nécessaire pour Maryam :

- nom / identité du site ;
- liste des cours ;
- dossiers et navigation ;
- configuration Pages CMS ;
- liens Edit vers le repo `nxss-23/m-library` ;
- URL de production `maryam-library.pages.dev` une fois le projet Cloudflare créé ;
- contenu initial vide/propre pour les 5 cours.

Tout le reste doit rester identique sauf nécessité technique.
