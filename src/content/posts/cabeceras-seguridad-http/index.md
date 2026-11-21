---
title: "Cabeceras de seguridad HTTP: guía práctica de CSP y HSTS"
description: "Qué cabeceras de seguridad HTTP necesita tu web, cómo configurar Content-Security-Policy y HSTS paso a paso y cómo comprobarlas en una auditoría."
date: 2026-11-18
category: web-security
tags: [csp, hsts, cabeceras-http, hardening]
cover: ./img/portada.png
coverAlt: "Ventana de terminal con las cabeceras CSP y HSTS resaltadas en verde"
difficulty: principiante
lab:
  entorno: "Cualquier navegador + curl"
  herramientas: [curl, securityheaders.com]
featured: true
draft: true
---

> [!NOTE]
> Artículo de demostración para desarrollar el diseño. Está marcado como borrador y no se publica.

Las cabeceras de seguridad son la forma más barata de reducir la superficie de ataque de una aplicación web. Con unas pocas líneas de configuración se mitigan clases enteras de vulnerabilidades como el XSS o el clickjacking.

## Qué cabeceras revisar en una auditoría

Lo primero es ver qué devuelve el servidor:

```bash
curl -sI https://ejemplo.com | grep -iE "strict-transport|content-security|x-frame|referrer"
```

| Cabecera | Mitiga | Valor recomendado |
|---|---|---|
| `Strict-Transport-Security` | Degradación a HTTP | `max-age=31536000; includeSubDomains` |
| `Content-Security-Policy` | XSS, inyección de recursos | Política por lista blanca |
| `X-Content-Type-Options` | MIME sniffing | `nosniff` |
| `Referrer-Policy` | Fuga de URLs | `strict-origin-when-cross-origin` |

## Content-Security-Policy paso a paso

Empieza siempre en modo **Report-Only** para no romper nada:

```http title="_headers"
/*
  Content-Security-Policy-Report-Only: default-src 'self'; img-src 'self' data:; script-src 'self'
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

> [!TIP]
> Revisa la consola del navegador durante unos días: cada violación aparece como aviso y te dice qué origen tienes que permitir.

### Errores habituales

1. Usar `'unsafe-inline'` en `script-src`, que anula buena parte de la protección.
2. Olvidar los subdominios de terceros (analítica, comentarios).
3. Activar HSTS con `preload` antes de comprobar que **todo** el dominio funciona por HTTPS.

> [!WARNING]
> Una vez enviado a la lista de precarga de HSTS, salir de ella tarda meses.

## Cómo comprobarlo

```js title="comprobar.js" {3}
const res = await fetch('https://ejemplo.com', { method: 'HEAD' });
for (const [k, v] of res.headers) {
  if (/security|policy|frame/i.test(k)) console.log(k, '→', v);
}
```

Con esto tienes una base sólida. En el siguiente artículo veremos cómo auditar una CSP existente y encontrar bypasses comunes.
