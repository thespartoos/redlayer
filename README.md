# RedLayer

Blog de pentesting y hacking ético en español → **https://redlayersec.com**

Astro 7 · Tailwind CSS 4 · Expressive Code · Pagefind · Cloudflare

## Publicar un artículo

1. Copia `src/content/posts/_plantilla/` a `src/content/posts/<slug>/`.
   El nombre de la carpeta es la URL: `src/content/posts/sqli-paso-a-paso/` → `/posts/sqli-paso-a-paso/`
   (minúsculas, sin acentos, palabras separadas por guiones).
2. Genera la portada (o usa tu propia imagen de 1600×900):
   ```bash
   npm run portada -- "UNION SELECT" "#34D399" src/content/posts/sqli-paso-a-paso/img/portada.png
   ```
3. Escribe el `index.md`. Las capturas van en `./img/` y se enlazan así: `![Descripción](./img/captura.png)`.
4. Revisa en local con `npm run dev` → http://localhost:4321. Los borradores (`draft: true`) solo se ven aquí.
5. Cambia `draft: false`, haz commit y push a `main`. Cloudflare compila y publica en ~1 minuto.

Si el front matter tiene un error (falta la descripción, categoría inexistente…), el build falla y te dice el campo exacto: la web nunca se publica rota.

### Avisos dentro de un artículo

```markdown
> [!NOTE]      → Nota
> [!TIP]       → Consejo
> [!IMPORTANT] → Importante
> [!WARNING]   → Atención
> [!CAUTION]   → Peligro
```

### Bloques de código

````markdown
```bash
nmap -sCV 10.10.10.5          ← bash/powershell se muestran con marco de terminal
```

```python title="exploit.py" {3-4} showLineNumbers
...                            ← título, líneas resaltadas y numeración
```
````

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local con recarga en caliente |
| `npm run build` | Compila a `dist/` y genera el índice de búsqueda |
| `npm run build:borradores` | Igual, pero incluyendo borradores (para revisar) |
| `npm run preview` | Sirve `dist/` (el buscador solo funciona aquí) |
| `npm run check` | Comprueba tipos y front matter |

## Dónde se configura cada cosa

| Qué | Dónde |
|---|---|
| Nombre, autor, menú, newsletter, analítica, comentarios | `src/consts.ts` |
| Categorías y sus colores | `src/data/categorias.ts` |
| Ranking de "Más leídos" | `src/data/mas-leidos.json` |
| Campos permitidos en el front matter | `src/content.config.ts` |
| Colores, tipografía y estilos de los artículos | `src/styles/global.css` |
| Cabeceras de seguridad y redirecciones 301 | `public/_headers`, `public/_redirects` |

## Pendiente

- `migracion-pendiente/`: los 7 posts del blog antiguo, con sus imágenes. Les falta `description` y `coverAlt` (marcados `TODO`) y el `alt` de las capturas (`ALT_TODO`). Cuando estén completos, mueve cada carpeta a `src/content/posts/`.
- Rellenar los `TODO(autor)` de `/sobre-mi/`, aviso legal y privacidad.
- Activar newsletter (Brevo), comentarios (Giscus), contacto (Web3Forms) y analítica (Cloudflare) en `src/consts.ts`.
