// Plugin HAST para Sätteri (Astro 7): convierte las "GitHub alerts"
//   > [!NOTE] / [!TIP] / [!IMPORTANT] / [!WARNING] / [!CAUTION]
// en <aside class="callout callout-note">…</aside> con título en español.
import { defineHastPlugin } from 'satteri';

const TIPOS = {
	note: 'Nota',
	tip: 'Consejo',
	important: 'Importante',
	warning: 'Atención',
	caution: 'Peligro',
};
const RE = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/i;

const esBlanco = (n) => n.type === 'text' && !n.value.trim();

export const calloutsPlugin = defineHastPlugin({
	name: 'redlayer-callouts',
	element: {
		filter: ['blockquote'],
		visit(node) {
			const hijos = node.children.filter((n) => !esBlanco(n));
			const p = hijos[0];
			if (!p || p.type !== 'element' || p.tagName !== 'p') return;
			const primero = p.children[0];
			if (!primero || primero.type !== 'text') return;
			const m = primero.value.match(RE);
			if (!m) return;
			const tipo = m[1].toLowerCase();

			const resto = primero.value.slice(m[0].length);
			let contenidoP = [...(resto ? [{ ...primero, value: resto }] : []), ...p.children.slice(1)];
			// quita un <br> inicial que queda tras el marcador
			while (contenidoP[0] && (esBlanco(contenidoP[0]) || (contenidoP[0].type === 'element' && contenidoP[0].tagName === 'br')))
				contenidoP.shift();

			const cuerpo = [
				...(contenidoP.length ? [{ type: 'element', tagName: 'p', properties: {}, children: contenidoP }] : []),
				...hijos.slice(1),
			];
			return {
				type: 'element',
				tagName: 'aside',
				properties: { className: ['callout', `callout-${tipo}`], role: 'note' },
				children: [
					{ type: 'element', tagName: 'p', properties: { className: ['callout-title'] }, children: [{ type: 'text', value: TIPOS[tipo] }] },
					{ type: 'element', tagName: 'div', properties: { className: ['callout-body'] }, children: cuerpo },
				],
			};
		},
	},
});
