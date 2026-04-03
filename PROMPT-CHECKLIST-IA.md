# Prompt Checklist para IA (Anti-Alucinacion)

## Antes de pedir
- Especificar fase y actividad exacta.
- Indicar archivos concretos a tocar.
- Incluir restricciones del proyecto (stack fijo y alcance).
- Incluir criterio de aceptacion verificable (build/test/ruta).

## Durante la respuesta
- Rechazar propuestas fuera del stack.
- Rechazar cambios sin evidencia ejecutable.
- Pedir que separe cambios grandes en pasos pequenos.

## Despues de aplicar cambios
- Ejecutar build y pruebas relevantes.
- Confirmar que no se rompio flujo E2E.
- Actualizar documentacion si cambia arquitectura o setup.

## Plantilla minima de prompt
1. Objetivo: que se va a implementar.
2. Contexto: stack y arquitectura actual.
3. Restricciones: que no se puede cambiar.
4. Criterio de aceptacion: como validar.
5. Salida esperada: formato y archivos.
