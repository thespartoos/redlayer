import { SITE } from '../consts';

/** JSON-LD BreadcrumbList: Inicio → … Cada miga es [nombre, ruta relativa con barra final]. */
export function migas(...items: [string, string][]): Record<string, unknown> {
	const todas: [string, string][] = [['Inicio', '/'], ...items];
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: todas.map(([name, ruta], i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name,
			item: new URL(ruta, SITE.url).href,
		})),
	};
}
