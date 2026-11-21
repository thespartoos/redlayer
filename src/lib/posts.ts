import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Borradores visibles en `astro dev` y en builds con BORRADORES=1 (para previsualizar). */
const verBorradores = !import.meta.env.PROD || process.env.BORRADORES === '1';

/** Posts publicados, del más reciente al más antiguo. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => verBorradores || !data.draft);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (post: Post | string) => `/posts/${typeof post === 'string' ? post : post.id}/`;

/** Minutos de lectura a ~220 palabras/minuto (el código cuenta, pero se lee más rápido). */
export function readingTime(body: string | undefined): number {
	if (!body) return 1;
	const sinCodigo = body.replace(/```[\s\S]*?```/g, (m) => ' '.repeat(Math.ceil(m.split(/\s+/).length / 3)));
	const palabras = sinCodigo.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(palabras / 220));
}

export function formatDate(d: Date, estilo: 'corta' | 'larga' = 'corta'): string {
	return new Intl.DateTimeFormat('es-ES', {
		day: 'numeric',
		month: estilo === 'larga' ? 'long' : 'short',
		year: 'numeric',
		timeZone: 'UTC',
	})
		.format(d)
		.replace('.', '');
}

export const slugify = (s: string) =>
	s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

/** Posts relacionados: misma serie > misma categoría > etiquetas compartidas. */
export function related(post: Post, all: Post[], n = 3): Post[] {
	const tags = new Set(post.data.tags);
	return all
		.filter((p) => p.id !== post.id)
		.map((p) => {
			let score = 0;
			if (post.data.series && p.data.series?.name === post.data.series.name) score += 10;
			if (p.data.category === post.data.category) score += 4;
			score += p.data.tags.filter((t) => tags.has(t)).length * 2;
			return { p, score };
		})
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
		.slice(0, n)
		.map((x) => x.p);
}
