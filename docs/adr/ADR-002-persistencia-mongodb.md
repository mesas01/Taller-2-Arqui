# ADR-002: Persistencia en MongoDB

## Estado
Aceptado

## Contexto
El taller requiere persistencia documental y el dominio tiene entidades con relaciones simples y crecimiento acotado.

## Decision
Usar MongoDB con Mongoose como ODM.

## Consecuencias
- El modelado documental encaja con Usuario, Proyecto y Tarea.
- Se simplifica el desarrollo con esquemas y validacion centralizada.
- Se aceptan referencias entre documentos para mantener el modelo flexible.
