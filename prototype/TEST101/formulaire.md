---
title: "TEST101 — Formulaire"
course: "TEST101"
type: "formulaire"
status: "prototype"
pagefind: false
updated: "2026-09-07"
---

# Formulaire — Prototype

Document volontairement compact pour tester la lecture rapide des formules.

## Combinatoire

$$
\binom{n}{k}=\frac{n!}{k!(n-k)!},
\qquad
\sum_{k=0}^{n}\binom{n}{k}=2^n.
$$

Nombre d’applications d’un ensemble de taille $n$ vers un ensemble de taille $m$ :

$$
m^n.
$$

## Probabilités

### Union et conditionnement

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}
\quad\text{si }P(B)>0.
$$

### Probabilités totales et Bayes

Pour une partition $(A_1,\ldots,A_n)$ :

$$
P(B)=\sum_{i=1}^{n}P(B\mid A_i)P(A_i).
$$

$$
P(A_i\mid B)
=
\frac{P(B\mid A_i)P(A_i)}
{\sum_{j=1}^{n}P(B\mid A_j)P(A_j)}.
$$

### Espérance et variance

$$
\mathbb{E}[X]=\sum_x xP(X=x),
\qquad
\operatorname{Var}(X)=\mathbb{E}[X^2]-\mathbb{E}[X]^2.
$$

$$
\mathbb{E}[aX+b]=a\mathbb{E}[X]+b,
\qquad
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).
$$

Si $X$ et $Y$ sont indépendantes :

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).
$$

## Graphes

### Degrés

Pour un graphe non orienté :

$$
\sum_{v\in V}\deg(v)=2|E|.
$$

Pour un graphe orienté :

$$
\sum_{v\in V}\deg^+(v)
=
\sum_{v\in V}\deg^-(v)
=
|E|.
$$

### Arbres

Pour un arbre fini :

$$
|E|=|V|-1.
$$

### Complexités usuelles

| Opération | Complexité |
|---|---:|
| BFS / DFS avec listes d’adjacence | $O(\lvert V\rvert+\lvert E\rvert)$ |
| Dijkstra avec tas binaire | $O((\lvert V\rvert+\lvert E\rvert)\log \lvert V\rvert)$ |
| Floyd–Warshall | $O(\lvert V\rvert^3)$ |

> **Hypothèse** — Dijkstra exige des poids d’arêtes non négatifs.

## Mini-méthodes

### Bayes

1. définir clairement les événements ;
2. construire la partition ;
3. calculer la probabilité du dénominateur ;
4. appliquer Bayes ;
5. vérifier que le résultat appartient à $[0,1]$.

### Preuve sur un graphe

1. écrire les hypothèses exactes ;
2. choisir la caractérisation adaptée ;
3. traiter connexité et cycles séparément si nécessaire ;
4. vérifier les cas extrêmes.
