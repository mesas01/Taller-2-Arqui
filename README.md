# Taller 2 - Arquitectura de Software

Sistema de gestion de proyectos y tareas basado en estilo Cliente-Servidor.

## Stack
- Frontend: Next.js + React + JavaScript + Tailwind
- Backend: Node.js + Express + TypeScript
- DB: MongoDB documental
- Integracion: REST

## Estructura
- `frontend`: aplicacion Next.js
- `backend`: API REST Express + MongoDB
- `docs/adr`: decisiones de arquitectura

## Requisitos
- Node.js 20+
- Docker y Docker Compose

## Variables de entorno
Copiar `.env.example` y ajustar valores si aplica.

## Ejecucion local
1. Instalar dependencias:
   - `npm install`
2. Levantar Mongo con Docker:
   - `docker compose up -d mongo`
3. Correr backend:
   - `npm run dev -w backend`
4. Correr frontend:
   - `npm run dev -w frontend`

## Seed de datos
Con backend apuntando a Mongo activo:
- `npm run seed -w backend`

## Pruebas
- `npm run test -w backend`

## Build
- `npm run build -w backend`
- `npm run build -w frontend`

## Flujo principal E2E
1. Login de usuario.
2. Consulta de proyectos.
3. Creacion de tarea asociada a proyecto.

## Roadmap y contribucion
- Ver `ROADMAP-CONTRIBUCION.md`
- Ver `PROMPT-CHECKLIST-IA.md`
