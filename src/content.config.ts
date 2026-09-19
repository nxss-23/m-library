import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
  loader: glob({
    pattern: ['src/content/docs/**/*.md', 'prototype/TEST101/*.md'],
    base: '.',
    generateId: ({ entry }) =>
      entry
        .replace(/^src\/content\/docs\//, '')
        .replace(/^prototype\/TEST101\//, 'prototype/test101/')
        .replace(/\.md$/, '')
        .toLowerCase(),
  }),
  schema: docsSchema({
    extend: z.object({
      course: z.string().optional(),
      type: z.enum(['synthese', 'exercices', 'formulaire', 'examens']).optional(),
      status: z.string().optional(),
      updated: z.string().optional(),
    }),
  }),
});

const i18n = defineCollection({
  loader: i18nLoader(),
  schema: i18nSchema(),
});

export const collections = { docs, i18n };
