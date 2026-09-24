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
    stage: z.string(),
    order: z.number().default(0),
    updatedAt: z.coerce.date(),
    readingTime: z.string().optional(),
    ogImage: image().optional(),
    videos: z.array(z.object({ language: z.string(), youtubeId: z.string(), poster: image() })).default([]),
  }),
});

const recipe = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    task: z.string(),
    order: z.number().default(0),
    updatedAt: z.coerce.date(),
    readingTime: z.string().optional(),
    connects: z.array(z.string()).default([]),
    writes: z.string(),
    ogImage: image().optional(),
  }),
});

export const collections = { blog, guide, recipe };
