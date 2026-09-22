import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import remarkMermaid from './src/plugins/remark-mermaid.mjs';

const courseItems = [
  { label: 'Mathématiques', directory: 'mathematiques' },
  { label: 'Microéconomie', directory: 'microeconomie' },
  { label: 'Chimie', directory: 'chimie' },
  { label: 'Statistiques', directory: 'statistiques' },
  { label: 'Allemand', directory: 'allemand' },
].map(({ label, directory }) => ({
  label,
  collapsed: true,
  items: [
    { label: 'Synthèse', slug: `cours/${directory.toLowerCase()}/synthese` },
    { label: 'Exercices', slug: `cours/${directory.toLowerCase()}/exercices` },
    { label: 'Formulaire', slug: `cours/${directory.toLowerCase()}/formulaire` },
    { label: 'Examens', slug: `cours/${directory.toLowerCase()}/examens` },
  ],
}));

export default defineConfig({
  site: 'https://maryam-library.pages.dev',
  integrations: [
    starlight({
      title: 'Maryam Library',
      logo: { src: './src/assets/book.svg', alt: '' },
      description: 'Bibliothèque personnelle de cours et de ressources de révision',
      locales: {
        root: { label: 'Français', lang: 'fr' },
      },
      customCss: ['./src/styles/study-library.css'],
      components: {
        Head: './src/components/Head.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        Hero: './src/components/Hero.astro',
        PageTitle: './src/components/PageTitle.astro',
        PageFrame: './src/components/PageFrame.astro',
      },
      markdown: {
        processedDirs: ['./prototype/TEST101/'],
      },
      sidebar: [
        { label: 'Accueil', slug: 'index' },
        {
          label: 'Cours',
          items: courseItems,
        },
      ],
      lastUpdated: false,
      pagination: false,
      pagefind: {
        ranking: {
          metaWeights: {
            title: 8,
            course: 6,
            documentType: 4,
          },
        },
      },
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkMermaid],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
