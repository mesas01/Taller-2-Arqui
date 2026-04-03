# ADR-003: Autenticacion con JWT

## Estado
Aceptado

## Contexto
El sistema necesita proteger recursos por usuario sin introducir infraestructura adicional compleja.

## Decision
Usar JWT firmado por el backend para autenticar llamadas a la API.

## Consecuencias
- El frontend puede mantener una experiencia simple de login.
- Las rutas protegidas verifican el token en cada request.
- Se evita dependencias de sesiones server-side.
