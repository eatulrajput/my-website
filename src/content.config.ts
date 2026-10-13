import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    cover: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    outcome: z.string(),
    links: z.object({
      live: z.string().optional(),
      appStore: z.string().optional(),
      playStore: z.string().optional(),
      testFlight: z.string().optional(),
      github: z.string().optional(),
    }).optional().default({}),
    cover: z.string(),
    video: z.string().optional(),
    featured: z.boolean().default(true),
    order: z.number().default(1),
  }),
});

export const collections = { blog, projects };
