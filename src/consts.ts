export const SITE = {
	name: 'RedLayer',
	url: 'https://redlayersec.com',
	title: 'RedLayer — Pentesting y hacking ético en español',
	description:
		'Artículos técnicos de pentesting, seguridad web, explotación de binarios y red team en español, con laboratorios reproducibles.',
	lang: 'es',
	locale: 'es_ES',
};

export const AUTHOR = {
	name: 'thespartoos', // TODO(autor): nombre real si se quiere mostrar (E-E-A-T)
	alias: 'thespartoos',
	jobTitle: 'Pentester',
	url: 'https://redlayersec.com/sobre-mi/',
	sameAs: ['https://github.com/thespartoos'],
};

export const NAV = [
	{ href: '/', label: 'Inicio' },
	{ href: '/articulos/', label: 'Artículos' },
	{ href: '/categorias/', label: 'Categorías' },
	{ href: '/series/', label: 'Series' },
	{ href: '/sobre-mi/', label: 'Sobre mí' },
];

export const POSTS_PER_PAGE = 9;


/** Token de Cloudflare Web Analytics (Analytics → Web Analytics → Añadir sitio). Vacío = desactivado. */
export const CF_ANALYTICS_TOKEN = 'd370cd0887c8415aa0292fe43b60dfa4';


