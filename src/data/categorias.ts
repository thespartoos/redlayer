// Fuente única de verdad de las categorías: nombre visible, color y descripción SEO.
// El color se usa en la píldora, en los filtros y en la página de la categoría.
export const CATEGORIAS = {
	pentesting: {
		nombre: 'Pentesting',
		color: '#4F8CFF',
		descripcion: 'Metodología, reconocimiento, explotación y post-explotación en auditorías reales.',
	},
	'web-security': {
		nombre: 'Seguridad web',
		color: '#34D399',
		descripcion: 'Vulnerabilidades web del OWASP Top 10 explicadas con ejemplos y laboratorios.',
	},
	'explotacion-binarios': {
		nombre: 'Explotación de binarios',
		color: '#FB923C',
		descripcion: 'Buffer overflows, ROP, ret2libc y bypass de protecciones de memoria.',
	},
	'malware-development': {
		nombre: 'Desarrollo de malware',
		color: '#F87171',
		descripcion: 'Técnicas de malware para red team: inyección de procesos, evasión y loaders.',
	},
	herramientas: {
		nombre: 'Herramientas',
		color: '#F5B544',
		descripcion: 'Guías prácticas de Burp Suite, Nmap, pwntools y otras herramientas de pentesting.',
	},
	redes: {
		nombre: 'Redes',
		color: '#22D3EE',
		descripcion: 'Análisis de tráfico, pivoting y ataques a protocolos de red.',
	},
	cloud: {
		nombre: 'Cloud',
		color: '#A78BFA',
		descripcion: 'Seguridad ofensiva en AWS, Azure y entornos cloud.',
	},
	writeups: {
		nombre: 'Writeups',
		color: '#F472B6',
		descripcion: 'Resoluciones de máquinas retiradas de Hack The Box y TryHackMe.',
	},
} as const;

export type CategoriaSlug = keyof typeof CATEGORIAS;
export const CATEGORIA_SLUGS = Object.keys(CATEGORIAS) as [CategoriaSlug, ...CategoriaSlug[]];
