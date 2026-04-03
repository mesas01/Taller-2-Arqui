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
- `nginx`: reverse proxy publico
- `docs/adr`: decisiones de arquitectura

## Requisitos

- Node.js 20+
- Docker y Docker Compose

## Variables de entorno

Copiar `.env.example` y ajustar valores si aplica.

## Acceso publico con dominio

El despliegue productivo usa Caddy como unico punto de entrada con HTTPS automatico.

- El navegador accede por `https://TU_DOMINIO`.
- Caddy enruta `/` hacia Next.js y `/api` hacia Express.
- El backend y el frontend no se exponen directamente al exterior.
- Para usar dominio real, apunta el registro DNS A del dominio a la IP del servidor y define `APP_DOMAIN` en `.env`.
- Caddy emite y renueva certificados automaticamente si el dominio resuelve hacia el servidor y los puertos 80/443 estan abiertos.

## Ejecucion local

1. Instalar dependencias:
   - `npm install`
2. Levantar Mongo con Docker:
   - `docker compose up -d mongo`
3. Correr backend:
   - `npm run dev -w backend`
4. Correr frontend:
   - `npm run dev -w frontend`
5. Abrir:
   - `http://localhost:3000`

## Seed de datos

Con backend apuntando a Mongo activo:

- `npm run seed -w backend`

## Pruebas

- `npm run test -w backend`

## Build

- `npm run build -w backend`
- `npm run build -w frontend`

## Despliegue con Docker

1. Asegurar que Docker Desktop o Docker Engine esta activo.
2. Crear `.env` a partir de `.env.example`.
3. Levantar los contenedores:
   - `docker compose up -d --build`
4. Cargar datos semilla dentro del contenedor del backend:
   - `docker compose exec backend npm run seed`
5. Abrir la aplicacion publica:
   - `https://TU_DOMINIO`
   - O `https://IP_PUBLICA` si tu certificado y dominio lo permiten.

### Variables para despliegue publico

- `APP_DOMAIN`: dominio publico que apuntara a este servidor.
- `CADDY_EMAIL`: correo para avisos y gestion de certificados.

### Requisitos de red

- Abrir puertos `80` y `443` en firewall o security group.
- Apuntar el DNS A del dominio a la IP publica del servidor.

## Flujo principal E2E

1. Login de usuario.
2. Consulta de proyectos.
3. Creacion de tarea asociada a proyecto.

## ADRs

- [ADR-001: Stack Base y Estilo Arquitectonico](docs/adr/ADR-001-stack-base.md)
- [ADR-002: Persistencia en MongoDB](docs/adr/ADR-002-persistencia-mongodb.md)
- [ADR-003: Autenticacion con JWT](docs/adr/ADR-003-autenticacion-jwt.md)

## Roadmap y contribucion

- Ver `ROADMAP-CONTRIBUCION.md`
- Ver `PROMPT-CHECKLIST-IA.md`
