# Direction A — Interface documentaire

La référence est [la maquette fournie](references/study-library-direction-a.png). L’interface conserve Astro/Starlight et ses trois zones de navigation, sans nouveau moteur de rendu ni dépendance.

## Décisions

- `src/styles/study-library.css` remplace `spike.css`. La largeur maximale des documents est de 52 rem, y compris lorsque le menu est fermé, et le sommaire droit reste compact à 15 rem. L’interface et les titres utilisent Montserrat Variable, auto-hébergée dans le build avec une pile de polices système en secours.
- Header compact : identité livre SVG, recherche native et sélecteur de thème Starlight. Aucun compte, favoris, historique ou widget.
- Le bouton « Réduire le menu » reste en haut, avec la même clé `study-library-sidebar-collapsed`. Le menu mobile est celui de Starlight.
- Huit blocs à libellé explicite, accent latéral et pictogramme SVG décoratif en CSS. Voir les [conventions](01_content_conventions.md). Les couleurs douces ont des valeurs distinctes en clair et sombre.
- Accueil : cinq cartes ; entrées de cours : quatre liens en cartes.
- TEST101 démontre les blocs et les corrections séparées. Les fixtures restent accessibles directement, hors navigation et hors index de recherche.

## Recherche

Pagefind 1.5.2, fourni par Starlight, produit l’index statique au build. Chaque document académique expose `course` et `documentType` comme métadonnées et comme filtres. Le titre de recherche combine le nom du cours et le type de document ; les headings restent des sous-résultats natifs. Le classement renforce le titre, puis le cours et le type. La normalisation des accents, les extraits, le surlignage et les raccourcis `Ctrl+K`/`Cmd+K` restent natifs.

Les filtres Cours et Type sont ceux de l’interface Pagefind fournie avec Starlight. TEST101 conserve `pagefind: false`. Les blocs académiques restent indexés comme contenu normal : leur titre visible peut participer à une requête, sans créer d’index parallèle ni fragmenter les quatre documents. Aucun alias manuel, service, embedding ou modèle IA n’est ajouté ; la qualité dépend donc du contenu réellement rédigé.

## PDF

Le bouton « Exporter en PDF » des documents ouvre `window.print()`. L’indication adjacente explique de choisir « Enregistrer au format PDF ». Il est masqué sans JavaScript. La feuille d’impression retire la navigation et les actions, utilise un fond blanc et conserve les contenus.

Il ne s’agit pas d’un téléchargement automatique : la disponibilité de l’enregistrement PDF et la pagination dépendent du navigateur. Les tableaux et formules exceptionnellement larges peuvent demander le format paysage ou une échelle adaptée. Aucun backend, API ou moteur PDF de production ajouté. Le PDF témoin généré avec Playwright ne sert qu’à la validation locale.

## Validation et maintenance

`npm run check`, `npm run build`, `npm run test:render`, `git diff --check`. Les tests couvrent desktop 1440 × 900, tablette 768 × 1024, mobile 375 × 812, les deux thèmes pour les blocs, les corrections, la persistance du menu, les routes publiques et TEST101. Captures locales dans `test-results/direction-a/` (ignorées par Git).

Aucun script lint séparé n’existe dans ce dépôt. Les avertissements de build concernant les chunks > 500 kB, i18n/404 et l’absence de `site` pour le sitemap sont laissés explicites. L’URL de production et Cloudflare restent hors de cette étape.
