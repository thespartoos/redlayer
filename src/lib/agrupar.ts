import { slugify, type Post } from './posts';

export interface Grupo {
	nombre: string;
	slug: string;
	posts: Post[];
}

/** Etiquetas con sus posts (orden de fecha desc), ordenadas alfabéticamente en español. */
export function agruparEtiquetas(posts: Post[]): Grupo[] {
	const mapa = new Map<string, Grupo>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			const slug = slugify(tag);
			if (!slug) continue;
			const g = mapa.get(slug) ?? { nombre: tag, slug, posts: [] };
			g.posts.push(post);
			mapa.set(slug, g);
		}
	}
	return [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

/** Series con sus posts ordenados por `order`; las series, de la más reciente a la más antigua. */
export function agruparSeries(posts: Post[]): Grupo[] {
	const mapa = new Map<string, Grupo>();
	for (const post of posts) {
		const s = post.data.series;
		if (!s) continue;
		const slug = slugify(s.name);
		const g = mapa.get(slug) ?? { nombre: s.name, slug, posts: [] };
		g.posts.push(post);
		mapa.set(slug, g);
	}
	const orden = (p: Post) => p.data.series?.order ?? 0;
	const reciente = (g: Grupo) => Math.max(...g.posts.map((p) => p.data.date.valueOf()));
	return [...mapa.values()]
		.map((g) => ({ ...g, posts: [...g.posts].sort((a, b) => orden(a) - orden(b)) }))
		.sort((a, b) => reciente(b) - reciente(a));
}
