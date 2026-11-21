import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIA_SLUGS } from './data/categorias';

// Cada post vive en src/content/posts/<slug>/index.md con sus imágenes en ./img/
// Los archivos que empiezan por "_" (p. ej. _plantilla) se ignoran.
const posts = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: ['**/index.{md,mdx}', '!_*/**'],
		generateId: ({ entry }) => entry.split('/')[0].toLowerCase(),
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z
				.string()
				.min(50, 'La descripción debe tener al menos 50 caracteres (meta description)')
				.max(170, 'La descripción no debe superar ~160 caracteres'),
			date: z.coerce.date(),
			updated: z.coerce.date().optional(),
			category: z.enum(CATEGORIA_SLUGS),
			tags: z.array(z.string()).default([]),
			cover: image(),
			coverAlt: z.string().min(10, 'coverAlt es obligatorio: describe la imagen'),
			difficulty: z.enum(['principiante', 'intermedio', 'avanzado']).optional(),
			lab: z
				.object({
					entorno: z.string(),
					herramientas: z.array(z.string()).default([]),
				})
				.optional(),
			series: z.object({ name: z.string(), order: z.number().int().positive() }).optional(),
			featured: z.boolean().default(false),
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts };
