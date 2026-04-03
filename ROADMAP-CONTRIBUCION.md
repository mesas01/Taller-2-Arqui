# Roadmap de Contribucion

## Objetivo
Alinear a cualquier contribuidor para que trabaje con el mismo contexto tecnico y reduzca al minimo errores por suposiciones.

## Estado Actual
- Base tecnica completada: monorepo, backend, frontend, Docker y seed.
- Validaciones ejecutadas: build backend, build frontend y pruebas backend pasan.
- Demo funcional validada con usuario semilla contra la API local.
- Despliegue publico reforzado con reverse proxy Caddy y HTTPS automatico por dominio.

## Siguiente Paso Inmediato
- Publicar dominio real y verificar certificados HTTPS en el servidor final.
- Añadir registro de usuario desde frontend si se quiere demo completa sin seed.
- Consolidar documentacion tecnica final cuando el codigo quede cerrado.

## Apoyo para despliegue
- Guia detallada: `DEPLOY-GRATIS-DOMINIO.md`.

## Fase 1 - Scaffolding
- Estructura monorepo (`frontend`, `backend`, `docs`).
- Configurar `.env.example`, `docker-compose.yml` y scripts de build/test.
- Definir arquitectura modular del backend.

**DoD**
- `npm install` finaliza sin errores.
- `npm run build -w backend` y `npm run build -w frontend` pasan.

## Fase 2 - API REST principal
- Registro y login con JWT.
- CRUD minimo para proyectos y tareas del flujo E2E.
- Validacion de entrada y control de autorizacion por usuario.

**DoD**
- Flujo completo: login -> listar/crear proyecto -> listar/crear tarea.
- Respuestas consistentes con `success/data/error`.

## Fase 3 - Frontend funcional
- Login.
- Listado y creacion de proyectos.
- Listado y creacion de tareas por proyecto.
- Estados de carga, error y proteccion de rutas.

**DoD**
- Un usuario puede completar el flujo E2E desde UI sin tocar Postman.

## Fase 4 - Calidad
- Seed de datos reproducible.
- Pruebas automatizadas minimas del flujo E2E backend.
- Verificacion de build + test antes de merge.

**DoD**
- `npm run test -w backend` pasa.
- Documentado como levantar seed y ejecutar pruebas.

## Fase 5 - Cierre tecnico
- ADRs de decisiones clave.
- Diagramas C4/HLD/despliegue.
- README final con pasos de ejecucion.

**DoD**
- Cualquier persona del equipo puede levantar proyecto desde cero siguiendo solo README.

## Reglas de Contribucion
- No cambiar stack obligatorio.
- No introducir microservicios o EDA como base.
- Cualquier dependencia nueva debe justificarse en PR o ADR.
- Todo PR debe indicar: problema, cambio, verificacion ejecutada.
