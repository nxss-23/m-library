# Conventions de contenu

Ces conventions fixent les quatre documents académiques communs tout en laissant leur structure interne s’adapter à chaque cours.

## 1. Formats de documents

Chaque cours possède exactement ces quatre documents académiques :

| Type | Objectif |
|---|---|
| Synthèse | Comprendre et réviser la théorie essentielle |
| Exercices | Retrouver les exercices prioritaires avec leur énoncé complet |
| Formulaire | Accéder immédiatement aux formules et méthodes |
| Examens | Travailler sur des sujets complets sans rouvrir les sources |

Les quatre fichiers sont toujours nommés `synthese.md`, `exercices.md`, `formulaire.md` et `examens.md`. Il ne faut créer ni fichier par exercice, ni fichier par chapitre, ni autre type de document académique.

Une page `index.md` peut servir de page d’entrée et de navigation du cours. Elle ne compte pas comme document académique et ne doit pas contenir de contenu académique lourd.

La structure interne des quatre documents reste souple. Par exemple, un unique fichier `exercices.md` peut regrouper des sections TP1, TP2 et TP3.

## 2. En-tête minimal

Chaque document commence par un frontmatter simple :

```yaml
---
title: "Titre lisible"
course: "Nom du cours"
type: "synthese"
status: "prototype"
updated: "YYYY-MM-DD"
---
```

Valeurs recommandées pour `type` : `synthese`, `exercices`, `formulaire`, `examens`.

Les champs `course` et `type` alimentent aussi la recherche statique : ils deviennent respectivement les métadonnées et filtres Pagefind `course`/Cours et `documentType`/Type. Le nom du cours doit donc rester stable.

Ne pas multiplier les métadonnées tant qu’elles n’ont pas un usage concret.

## 3. Synthèses

Une synthèse doit :

- être condensée et orientée compréhension/examen ;
- commencer par une vue d’ensemble lorsque le sujet s’y prête ;
- proposer un sommaire masquable pour les documents longs ;
- distinguer définitions, résultats, méthodes, pièges et exemples ;
- utiliser Mermaid ou SVG seulement si la vue globale devient réellement plus claire ;
- éviter les paragraphes de remplissage.

Structure conseillée :

1. vue d’ensemble ;
2. définitions et notations ;
3. résultats essentiels ;
4. méthodes ;
5. pièges fréquents ;
6. mini-exemples.

## 4. Exercices

Chaque exercice sélectionné utilise les champs suivants :

| Champ | Exemple |
|---|---|
| Source | TP3 |
| Numéro | 4 |
| Importance | ⭐⭐⭐ |
| Notion | Dijkstra |

Ne pas ajouter de champ « à refaire ». La présence de l’exercice dans le document signifie déjà qu’il a été sélectionné pour être refait.

L’énoncé doit être complet lorsque la source est disponible : hypothèses, données, unités, figures utiles et sous-questions. L’objectif est de pouvoir travailler sans rouvrir le TP original.

Format conseillé :

```md
<span id="tp3-exercice-4" aria-hidden="true"></span>

## TP3 — Exercice 4

| Source | Numéro | Importance | Notion |
|---|---:|---|---|
| TP3 | 4 | ⭐⭐⭐ | Dijkstra |

### Énoncé

<a class="exercise-action" href="#correction-tp3-exercice-4">Voir la correction <span aria-hidden="true">↓</span></a>

Énoncé complet…

## Corrections

<span id="correction-tp3-exercice-4" aria-hidden="true"></span>

### Correction — TP3, exercice 4

#### Indice

…

#### Correction

…

<a class="exercise-action" href="#tp3-exercice-4">Retour à l’exercice <span aria-hidden="true">↑</span></a>
```

Les corrections sont regroupées plus bas dans `exercices.md`, directement visibles et reliées à l’énoncé par les actions `Voir la correction ↓` et `Retour à l’exercice ↑`. Ne pas placer une correction dans un bloc `<details>` directement sous l’énoncé.

Les niveaux d’importance sont :

- ⭐ — utile ;
- ⭐⭐ — important ;
- ⭐⭐⭐ — prioritaire pour l’examen.

## 5. Formulaires

Un formulaire doit être court, dense et scannable.

- Regrouper les formules par notion.
- Définir chaque symbole ambigu.
- Indiquer les hypothèses d’application.
- Ajouter une mini-méthode seulement si elle empêche une erreur classique.
- Ne pas transformer le formulaire en deuxième synthèse.

## 6. Examens

Chaque examen doit contenir :

- la session et l’année ;
- les consignes disponibles ;
- le barème s’il est connu ;
- l’énoncé complet ;
- les figures, tableaux et données nécessaires ;
- éventuellement une correction repliable ;
- un espace de notes immédiatement après l’examen.

Ne jamais inventer une consigne ou un barème absent de la source. Signaler explicitement une information inconnue.

## 7. Mathématiques

- Mathématiques inline : `$P(A\mid B)$`.
- Mathématiques display :

```md
$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}
$$
```

- Préférer `aligned`, `cases`, matrices et fractions LaTeX aux approximations en texte.
- Définir les variables avant ou juste après la formule.
- Conserver une notation cohérente dans tout le document.
- Utiliser du texte normal pour les explications : les formules ne remplacent pas le raisonnement.

## 8. Code et pseudocode

Toujours préciser le langage du bloc :

````md
```java
int distance = 0;
```
````

Pour le pseudocode, utiliser `text` et rester proche du vocabulaire du cours. Les exemples doivent être assez courts pour rester lisibles sur mobile.

## 9. Blocs pédagogiques

Utiliser du HTML simple dans les fichiers `.md`, sans composant ni dépendance :

```md
<div class="academic-block academic-block--definition">
<p class="academic-block__title">Définition</p>

Texte en **Markdown** et mathématiques $G=(V,E)$.

</div>
```

Conserver une ligne vide avant le contenu Markdown et avant `</div>` pour permettre son rendu. Ne pas indenter le bloc. Le titre visible est obligatoire : la couleur et le pictogramme ne suffisent pas à identifier le contenu. Le pictogramme est appliqué automatiquement en CSS ; aucun SVG à recopier.

| Type | Classe de variante | Couleur |
|---|---|---|
| Définition | `academic-block--definition` | Bleu |
| Théorème | `academic-block--theorem` | Violet |
| Exemple | `academic-block--example` | Vert |
| Piège | `academic-block--pitfall` | Ambre |
| Méthode | `academic-block--method` | Cyan |
| À mémoriser / Formule clé | `academic-block--memorize` | Or |
| Énoncé | `academic-block--statement` | Bleu-gris |
| Correction | `academic-block--correction` | Vert sauge |

Toujours associer la variante à la classe `academic-block`. Le type est explicite, jamais déduit automatiquement du texte. Les styles clair et sombre utilisent la même syntaxe. Les titres de sections `##` et `###` restent hors des blocs pour conserver le sommaire ; le titre interne utilise `academic-block__title`.

Pour les exercices, encadrer l’énoncé et la correction séparément. Conserver les ancres et les liens `exercise-action` aller/retour ; les corrections restent regroupées plus bas, sans accordéon. Ne pas inventer un résultat pour remplir un bloc. Éviter d’empiler des encadrés redondants.

Les fixtures `prototype/TEST101/synthese.md` et `exercices.md` montrent les huit variantes. Les vrais cours adoptent ces blocs au fil de l’ajout de contenu sourcé.

## 10. Navigation et lisibilité

- Un seul titre de niveau 1 par page.
- Utiliser les niveaux de titres dans l’ordre.
- Garder des titres courts et descriptifs.
- Prévoir un sommaire repliable pour les longs documents.
- Tester les tableaux, formules et blocs de code sur une largeur mobile.
- Ne pas masquer une information indispensable derrière un élément replié ; réserver le repli aux détails et à la navigation secondaire.
