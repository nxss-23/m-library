---
title: "TEST101 — Examens"
course: "TEST101"
type: "examens"
status: "prototype"
pagefind: false
updated: "2026-09-07"
---

# Examens — Prototype

Les sujets ci-dessous sont fictifs. Ils servent uniquement à vérifier la présentation d’un examen complet et de son espace de notes.

## Examen blanc — Janvier 2027

**Durée :** 2 heures<br>
**Documents autorisés :** un formulaire d’une page<br>
**Barème :** 20 points

### Question 1 — Théorie des graphes · 6 points

Soit $G=(V,E)$ un graphe simple non orienté comportant $n$ sommets.

1. Énoncer le lemme des poignées de main.
2. Montrer que le nombre de sommets de degré impair est pair.
3. On suppose maintenant que $G$ est connexe et que $|E|=|V|-1$. Prouver que $G$ est un arbre.

### Question 2 — Probabilités · 7 points

Une boîte contient trois pièces :

- une pièce équilibrée ;
- une pièce donnant pile avec probabilité $3/4$ ;
- une pièce possédant deux faces pile.

Une pièce est choisie uniformément, puis lancée deux fois. On observe deux piles.

1. Calculer la probabilité d’observer deux piles.
2. Calculer la probabilité que la pièce choisie soit la pièce à deux faces pile.
3. La pièce est lancée une troisième fois. Calculer la probabilité d’obtenir pile, conditionnellement aux deux premiers résultats.

### Question 3 — Algorithmes · 7 points

Considérer le graphe orienté pondéré suivant :

| Arête | $s\to a$ | $s\to b$ | $a\to b$ | $a\to t$ | $b\to t$ |
|---|---:|---:|---:|---:|---:|
| Poids | 4 | 1 | 2 | 5 | 3 |

1. Exécuter Dijkstra depuis $s$ en indiquant, après chaque extraction, les distances provisoires.
2. Donner un plus court chemin de $s$ à $t$ et sa longueur.
3. Expliquer précisément pourquoi la présence d’un poids négatif invaliderait l’argument de correction de Dijkstra.
4. Donner la complexité avec des listes d’adjacence et un tas binaire.

<details>
<summary>Afficher les éléments de correction</summary>

### Question 1

Le lemme donne $\sum_v\deg(v)=2|E|$. La somme est paire, donc le nombre de termes impairs est pair. Pour la troisième partie, un graphe connexe à $n$ sommets possède au moins $n-1$ arêtes ; l’égalité interdit tout cycle supplémentaire.

### Question 2

La probabilité de deux piles vaut

$$
\frac13\left(\frac14+\frac{9}{16}+1\right)=\frac{29}{48}.
$$

Ainsi,

$$
P(\text{deux faces pile}\mid PP)
=
\frac{1/3}{29/48}
=
\frac{16}{29}.
$$

La probabilité du troisième pile est la moyenne postérieure des probabilités de pile :

$$
\frac{4}{29}\cdot\frac12
+
\frac{9}{29}\cdot\frac34
+
\frac{16}{29}\cdot1
=
\frac{91}{116}.
$$

### Question 3

Les distances finales sont $d(s)=0$, $d(b)=1$, $d(a)=4$ et $d(t)=4$. Un plus court chemin est $s\to b\to t$.

</details>

### Notes personnelles — Examen blanc janvier 2027

> **Après la tentative**
>
> - Temps utilisé :
> - Questions bloquantes :
> - Erreurs de théorie :
> - Erreurs de calcul :
> - Notions à revoir :
> - Stratégie pour la prochaine tentative :

<br><br><br><br><br>

---

## Examen blanc — Août 2027

**Durée :** information non fournie<br>
**Documents autorisés :** information non fournie<br>
**Barème :** information non fournie

### Question unique — Modélisation

Soit $X_1,\ldots,X_n$ une suite de variables de Bernoulli indépendantes de paramètre $p$. On pose $S_n=\sum_{i=1}^{n}X_i$.

1. Identifier la loi de $S_n$.
2. Calculer $\mathbb{E}[S_n]$ et $\operatorname{Var}(S_n)$.
3. Donner $P(S_n=0)$.
4. Expliquer comment calculer $P(S_n\geq k)$ exactement.

### Notes personnelles — Examen blanc août 2027

> **Après la tentative**
>
> - Temps utilisé :
> - Questions bloquantes :
> - Erreurs de théorie :
> - Erreurs de calcul :
> - Notions à revoir :
> - Stratégie pour la prochaine tentative :

<br><br><br><br><br>
