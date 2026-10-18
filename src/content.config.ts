import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      modified: z.coerce.date().optional(),
      slug: z.coerce.string(),
      url: z.string().url(),
      categories: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      featured_image: image().optional(),
    }),
});

export const collections = { posts };
