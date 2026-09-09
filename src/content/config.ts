import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Margin Team'),
    category: z.string(),
    readingTime: z.string(),
    ogImage: image().optional(),
  }),
});

const guide = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    feature: z.string(),
    order: z.number().default(0),
    updatedAt: z.coerce.date(),
    readingTime: z.string().optional(),
    ogImage: image().optional(),
  }),
});

export const collections = { blog, guide };
