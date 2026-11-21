---
title: "Nmap: guía de reconocimiento para tu primer pentest"
description: "Aprende a usar Nmap para descubrir hosts, puertos y servicios en tu laboratorio, con los parámetros que de verdad se usan en una auditoría."
date: 2026-11-03
category: herramientas
tags: [nmap, reconocimiento, enumeracion]
cover: ./img/portada.png
coverAlt: "Comando nmap -sCV escrito en una terminal sobre fondo azul oscuro"
difficulty: principiante
series:
  name: "Primeros pasos en pentesting"
  order: 1
draft: true
---

> [!NOTE]
> Artículo de demostración para desarrollar el diseño. Está marcado como borrador y no se publica.

El reconocimiento es la fase que más tiempo ocupa en un pentest bien hecho. Nmap es la herramienta estándar para esta fase.

## Descubrimiento de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -n -Pn 10.10.10.5 -oG puertos
```

## Detección de versiones

```bash
nmap -sCV -p22,80,443 10.10.10.5 -oN servicios
```

> [!TIP]
> Guarda siempre la salida con `-oN` o `-oA`: la necesitarás para el informe.
