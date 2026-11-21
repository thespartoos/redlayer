// Genera una portada 1600x900 con el estilo de RedLayer.
// Uso: node scripts/portada.mjs "<texto>" <color-hex> <salida.png>
import sharp from 'sharp';
const [texto = 'RedLayer', color = '#4F8CFF', salida = 'portada.png'] = process.argv.slice(2);
const W = 1600, H = 900;
const lineas = Array.from({ length: 22 }, (_, i) => {
  const y = 150 + i * 30, x = 980 + ((i * 53) % 90), w = Math.min(160 + ((i * 397) % 400), 1505 - x);
  return `<rect x="${x}" y="${y}" width="${w}" height="10" rx="5" fill="${i % 5 === 0 ? color : '#2a3a5e'}" opacity="${i % 5 === 0 ? 0.9 : 0.55}"/>`;
}).join('');
const grid = Array.from({ length: 40 }, (_, i) => `<path d="M${i * 40} 0V${H}M0 ${i * 40}H${W}" stroke="#16213a" stroke-width="1"/>`).join('');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs><radialGradient id="g" cx="70%" cy="40%" r="70%"><stop offset="0" stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="#0a1020" stop-opacity="0"/></radialGradient></defs>
<rect width="100%" height="100%" fill="#0a1020"/>${grid}<rect width="100%" height="100%" fill="url(#g)"/>
<rect x="940" y="80" width="600" height="740" rx="18" fill="#0d1527" stroke="#24345a" stroke-width="2"/>
<circle cx="975" cy="110" r="7" fill="#f87171"/><circle cx="998" cy="110" r="7" fill="#f5b544"/><circle cx="1021" cy="110" r="7" fill="#34d399"/>
${lineas}
<text x="90" y="${H / 2 + 20}" font-family="Consolas, monospace" font-size="92" font-weight="700" fill="#e6ebf5">${esc(texto)}</text>
<rect x="90" y="${H / 2 + 60}" width="140" height="8" rx="4" fill="${color}"/>
</svg>`;
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(salida);
console.log('ok', salida);
