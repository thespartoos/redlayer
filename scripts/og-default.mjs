// Genera la imagen Open Graph por defecto (1200x630) en public/og-default.png.
// Uso: node scripts/og-default.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const W = 1200, H = 630;
const salida = fileURLToPath(new URL('../public/og-default.png', import.meta.url));

const grid = Array.from({ length: 32 }, (_, i) => `<path d="M${i * 40} 0V${H}M0 ${i * 40}H${W}" stroke="#16213a" stroke-width="1"/>`).join('');

// Símbolo de src/components/Logo.astro (viewBox 0 0 40 40), escalado x6
const logo = `<g transform="translate(90 135) scale(6)">
  <path d="M20 25.5 5 19l4-1.8L20 22l11-4.8 4 1.8z" fill="#9aa8c2" opacity=".55"/>
  <path d="M20 31.5 5 25l4-1.8L20 28l11-4.8 4 1.8z" fill="#9aa8c2" opacity=".35"/>
  <path d="M20 6 5 12.5 20 19l15-6.5z" fill="#ef4444"/>
</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs><radialGradient id="g" cx="80%" cy="20%" r="75%"><stop offset="0" stop-color="#ef4444" stop-opacity=".16"/><stop offset="1" stop-color="#0a1020" stop-opacity="0"/></radialGradient></defs>
<rect width="100%" height="100%" fill="#0a1020"/>${grid}<rect width="100%" height="100%" fill="url(#g)"/>
${logo}
<text x="90" y="440" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="112" font-weight="800" letter-spacing="-2" fill="#e6ebf5">Red<tspan dx="-12" font-weight="400">Layer</tspan></text>
<text x="94" y="510" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="40" fill="#9aa8c2">Pentesting y hacking ético en español</text>
<rect x="94" y="550" width="120" height="6" rx="3" fill="#ef4444"/>
<text x="${W - 90}" y="${H - 66}" text-anchor="end" font-family="Consolas, monospace" font-size="26" fill="#4a5874">redlayersec.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(salida);
console.log('ok', salida);
