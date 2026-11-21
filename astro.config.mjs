// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { calloutsPlugin } from './src/lib/callouts.mjs';
import pagefind from './src/lib/pagefind-integration.mjs';

export default defineConfig({
	site: 'https://redlayersec.com',
	trailingSlash: 'always',
	build: { format: 'directory' },
	markdown: {
		// Sätteri (pipeline Rust de Astro 7) + avisos > [!NOTE] / [!WARNING]…
		processor: satteri({ hastPlugins: [calloutsPlugin] }),
	},
	prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
	integrations: [
		expressiveCode({
			themes: ['github-dark-default', 'github-light-default'],
			// El tema sigue a la clase .dark del <html> (toggle propio), no solo al SO
			themeCssSelector: (theme) => (theme.type === 'dark' ? '.dark' : ':root:not(.dark)'),
			useDarkModeMediaQuery: false,
			plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
			defaultProps: {
				showLineNumbers: false,
				overridesByLang: { 'bash,sh,shell,powershell,ps,console': { frame: 'terminal' } },
			},
			styleOverrides: {
				borderRadius: '10px',
				borderColor: 'var(--color-junta)',
				codeFontFamily: 'var(--font-mono)',
				uiFontFamily: 'var(--font-sans)',
				codeFontSize: '0.875rem',
				codeLineHeight: '1.65',
				frames: { shadowColor: 'transparent' },
			},
		}),
		sitemap({
			filter: (page) => !page.includes('/404'),
		}),
		pagefind(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Schibsted Grotesk',
			cssVariable: '--font-schibsted',
			weights: ['400 900'],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-plex-mono',
			weights: [400, 600],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
