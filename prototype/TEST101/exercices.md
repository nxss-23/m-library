---
title: "TEST101 — Exercices"
course: "TEST101"
type: "exercices"
status: "prototype"
pagefind: false
updated: "2026-09-07"
---


La présence d’un exercice dans ce document signifie qu’il doit être refait. Aucun champ supplémentaire « à refaire » n’est nécessaire.

<span id="tp1-exercice-2" aria-hidden="true"></span>

## TP1 — Exercice 2

| Source | Numéro | Importance | Notion |
|---|---:|---|---|
| TP1 | 2 | ⭐⭐ | Degrés et arbres |

<a class="exercise-action" href="#correction-tp1-exercice-2">Voir la correction <span aria-hidden="true">↓</span></a>

<div class="academic-block academic-block--statement">
<p class="academic-block__title">Énoncé</p>

Soit $G=(V,E)$ un graphe simple non orienté comportant $n\geq 2$ sommets. On suppose que $G$ est un arbre.

1. Montrer que $|E|=n-1$.
2. En déduire que
   $$
   \sum_{v\in V}\deg(v)=2(n-1).
   $$
3. Prouver que $G$ possède au moins deux sommets de degré $1$.

</div>

<span id="tp2-exercice-4" aria-hidden="true"></span>

## TP2 — Exercice 4

| Source | Numéro | Importance | Notion |
|---|---:|---|---|
| TP2 | 4 | ⭐⭐⭐ | Probabilités conditionnelles |

<a class="exercise-action" href="#correction-tp2-exercice-4">Voir la correction <span aria-hidden="true">↓</span></a>

<div class="academic-block academic-block--statement">
<p class="academic-block__title">Énoncé</p>

Une maladie touche $1\%$ d’une population. Un test possède une sensibilité de $95\%$ et une spécificité de $90\%$.

On note $M$ l’événement « la personne est malade » et $T$ l’événement « le test est positif ».

1. Traduire les trois pourcentages en probabilités utilisant $M$ et $T$.
2. Calculer $P(T)$.
3. Calculer $P(M\mid T)$.
4. Expliquer en une phrase pourquoi un test positif ne signifie pas que la personne a $95\%$ de probabilité d’être malade.

</div>

<span id="tp3-exercice-1" aria-hidden="true"></span>

## TP3 — Exercice 1

| Source | Numéro | Importance | Notion |
|---|---:|---|---|
| TP3 | 1 | ⭐ | Complexité |

<a class="exercise-action" href="#correction-tp3-exercice-1">Voir la correction <span aria-hidden="true">↓</span></a>

<div class="academic-block academic-block--statement">
<p class="academic-block__title">Énoncé</p>

Un graphe est représenté une première fois par une matrice d’adjacence, puis par des listes d’adjacence.

Pour chaque représentation, donner la complexité asymptotique :

1. du test d’existence de l’arête $(u,v)$ ;
2. de l’énumération de tous les voisins de $u$ ;
3. du stockage du graphe.

Exprimer les réponses en fonction de $n=|V|$, de $m=|E|$ et, lorsque nécessaire, de $\deg(u)$.

</div>

## Corrections

<span id="correction-tp1-exercice-2" aria-hidden="true"></span>

### Correction — TP1, exercice 2

<div class="academic-block academic-block--correction">
<p class="academic-block__title">Correction</p>

#### Indice

Considérer un plus long chemin simple de $G$ et étudier le degré de ses deux extrémités.

#### Correction

La première propriété se démontre par récurrence sur $n$ en retirant une feuille. Le lemme des poignées de main donne ensuite

$$
\sum_{v\in V}\deg(v)=2|E|=2(n-1).
$$

Soit $(v_0,\ldots,v_k)$ un plus long chemin simple. Si $v_0$ avait un voisin différent de $v_1$, ce voisin serait déjà sur le chemin — ce qui créerait un cycle — ou permettrait de prolonger le chemin. Ces deux possibilités sont impossibles. Donc $\deg(v_0)=1$. Le même raisonnement s’applique à $v_k$.

<a class="exercise-action" href="#tp1-exercice-2">Retour à l’exercice <span aria-hidden="true">↑</span></a>

</div>

<span id="correction-tp2-exercice-4" aria-hidden="true"></span>

### Correction — TP2, exercice 4

<div class="academic-block academic-block--correction">
<p class="academic-block__title">Correction</p>

#### Indice

Utiliser la partition $(M,M^c)$ :

$$
P(T)=P(T\mid M)P(M)+P(T\mid M^c)P(M^c).
$$

#### Correction

Les données donnent

$$
P(M)=0{,}01,\qquad
P(T\mid M)=0{,}95,\qquad
P(T^c\mid M^c)=0{,}90.
$$

Donc $P(T\mid M^c)=0{,}10$ et

$$
P(T)=0{,}95\cdot0{,}01+0{,}10\cdot0{,}99=0{,}1085.
$$

Par Bayes,

$$
P(M\mid T)
=
\frac{0{,}95\cdot0{,}01}{0{,}1085}
\approx 0{,}0876.
$$

La sensibilité $P(T\mid M)$ et la probabilité recherchée $P(M\mid T)$ conditionnent dans des directions différentes.

<a class="exercise-action" href="#tp2-exercice-4">Retour à l’exercice <span aria-hidden="true">↑</span></a>

</div>

<span id="correction-tp3-exercice-1" aria-hidden="true"></span>

### Correction — TP3, exercice 1

<div class="academic-block academic-block--correction">
<p class="academic-block__title">Correction</p>

| Opération | Matrice | Listes |
|---|---:|---:|
| Tester $(u,v)$ | $O(1)$ | $O(\deg(u))$ |
| Énumérer les voisins de $u$ | $O(n)$ | $O(\deg(u))$ |
| Stockage | $O(n^2)$ | $O(n+m)$ |

La complexité du test dans une liste peut être améliorée avec une structure adaptée, mais ce choix modifie les coûts et les constantes.

<a class="exercise-action" href="#tp3-exercice-1">Retour à l’exercice <span aria-hidden="true">↑</span></a>

</div>
