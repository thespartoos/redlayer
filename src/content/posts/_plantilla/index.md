---
# 1) Copia esta carpeta a src/content/posts/<slug-en-minusculas>/  (sin el "_")
# 2) Pon la portada en ./img/portada.png (1600x900). Genérala con:
#    node scripts/portada.mjs "texto corto" "#4F8CFF" src/content/posts/<slug>/img/portada.png
title: "Título claro con la palabra clave principal (máx. 80)"
description: "Resumen de 50-160 caracteres que aparecerá en Google. Explica qué aprenderá el lector."
date: 2026-01-01
# updated: 2026-02-01        # solo si cambias el contenido de verdad
category: pentesting          # pentesting | web-security | explotacion-binarios | malware-development | herramientas | redes | cloud | writeups
tags: [etiqueta-uno, etiqueta-dos]
cover: ./img/portada.png
coverAlt: "Descripción de lo que se ve en la portada"
difficulty: intermedio        # principiante | intermedio | avanzado
lab:
  entorno: "Kali Linux 2026.4 + máquina víctima"
  herramientas: [nmap, burpsuite]
# series:
#   name: "Nombre de la serie"
#   order: 1
featured: false               # true = sale en el hero de la home
draft: true                   # false para publicar
---

> [!CAUTION]
> Contenido con fines educativos. Practica solo en sistemas propios o con autorización expresa por escrito.

Introducción: qué problema resuelve el artículo y qué vas a conseguir.

## Primer apartado

Texto. Las imágenes van así: ![Descripción de la captura](./img/captura.png)

```bash
comando --ejemplo
```

> [!TIP]
> Avisos disponibles: NOTE, TIP, IMPORTANT, WARNING, CAUTION.

## Mitigación

Cómo se defiende un administrador frente a esta técnica.
