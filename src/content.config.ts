import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      status: z.enum(['active', 'archived', 'experimental']),
      technologies: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      repository: z.string().url().optional(),
      website: z.string().url().optional(),
      cover: image().optional(),
    }),
});

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      cover: image().optional(),
    }),
});

const galleries = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/galleries',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      location: z.string().optional(),
      featured: z.boolean().default(false),

      cover: image(),

      photos: z.array(
        z.object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      ),
    }),
});

export const collections = {
  projects,
  posts,
  galleries,
};
