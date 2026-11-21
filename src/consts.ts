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

/** URL del formulario de Brevo (Formularios → Incrustar → action del <form>). Vacío = desactivado. */
export const NEWSLETTER = {
	action: '',
};

/** Token de Cloudflare Web Analytics (Analytics → Web Analytics → Añadir sitio). Vacío = desactivado. */
export const CF_ANALYTICS_TOKEN = '';

/** Giscus (https://giscus.app): rellena tras activar Discussions en el repo público. Vacío = sin comentarios. */
export const GISCUS = {
	repo: '', // p. ej. 'thespartoos/redlayer'
	repoId: '',
	category: 'Comentarios',
	categoryId: '',
};

/** Clave de acceso de Web3Forms (web3forms.com → Create Access Key). Vacío = formulario desactivado. */
export const CONTACTO = {
	web3formsKey: '',
};
