import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { CATEGORIAS } from '../data/categorias';
import { SITE } from '../consts';

// Misma ruta que el blog antiguo (/feed.xml) para no romper a los suscriptores.
export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site ?? SITE.url,
		// postUrl ya termina en "/" (trailingSlash: 'always'); así rss no la quita ni la duplica.
		trailingSlash: true,
		items: posts.map((post) => ({
			title: post.data.title,
			link: postUrl(post),
			pubDate: post.data.date,
			description: post.data.description,
			categories: [CATEGORIAS[post.data.category].nombre, ...post.data.tags],
		})),
		customData: '<language>es</language>',
	});
}
