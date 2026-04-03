# ADR-001: Stack Base y Estilo Arquitectonico

## Estado
Aceptado

## Contexto
El taller asigna estilo Cliente-Servidor y stack obligatorio para frontend, backend, persistencia y protocolo.

## Decision
Adoptar:
- Frontend: Next.js + React + JavaScript
- Backend: Node.js + Express + TypeScript
- Persistencia: MongoDB documental
- Integracion: REST
- Estructura backend: monolito modular por capas

## Consecuencias
- Se favorece rapidez de implementacion y claridad academica.
- Se limita la complejidad operativa al evitar microservicios.
- Se requiere disciplina de modularidad para evitar monolito desordenado.
