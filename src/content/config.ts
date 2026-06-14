import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Margin Team'),
    category: z.string(),
    readingTime: z.string(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
