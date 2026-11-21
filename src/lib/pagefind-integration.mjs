// Genera el índice de Pagefind al terminar cualquier `astro build`,
// sin depender del comando de build configurado en Cloudflare.
import { fileURLToPath } from 'node:url';

export default function pagefindIntegration() {
	return {
		name: 'redlayer-pagefind',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const pagefind = await import('pagefind');
				const { index, errors } = await pagefind.createIndex({});
				if (!index) throw new Error(`Pagefind: ${errors.join(', ')}`);
				const { page_count } = await index.addDirectory({ path: fileURLToPath(dir) });
				await index.writeFiles({ outputPath: fileURLToPath(new URL('pagefind/', dir)) });
				await pagefind.close();
				logger.info(`Índice de búsqueda generado (${page_count} páginas)`);
			},
		},
	};
}
