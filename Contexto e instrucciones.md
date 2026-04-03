# 🚀 Guía Maestra y Prompt de Desarrollo: Proyecto de Arquitectura de Software

## 📌 Contexto y Objetivo del Proyecto
El objetivo es seleccionar, modelar e implementar una solución de software mediante el análisis de estilos arquitectónicos y stacks tecnológicos reales, utilizando el modelo C4 y criterios técnicos para sustentar la toma de decisiones.

*Instrucción para la IA: En todas tus respuestas, asume el rol de Arquitecto de Software Senior y guía la implementación, el diseño y la documentación cumpliendo estrictamente los siguientes parámetros.*

---

## 🏗️ 1. Stack Tecnológico Asignado
El desarrollo y análisis debe basarse **única y exclusivamente** en el siguiente stack:
* **Estilo Arquitectónico:** Cliente - Servidor.
* **Frontend (UI):** Next.js (React) con JavaScript.
* **Backend (Servidor):** Node.js con Express.js y TypeScript.
* **Persistencia (Base de Datos):** MongoDB (Base de datos NoSQL tipo Documental).
* **Protocolo de Integración:** REST.

### 1.1 Decisiones Técnicas Cerradas (No Ambiguas)
- **Prioridad actual:** Implementación primero. El documento final en LaTeX se trabaja al cierre del proyecto.
- **Frontend:** Next.js App Router + React + JavaScript + Tailwind CSS.
- **Backend:** Express + Node.js + TypeScript con arquitectura modular por capas.
- **Autenticación:** JWT.
- **Repositorio:** Monorepo con carpetas `frontend` y `backend`.
- **Calidad mínima:** Validaciones de entrada, manejo de errores y pruebas automatizadas mínimas.
- **Datos de demostración:** Se debe incluir seed de datos.
- **Contenedores:** `docker-compose.yml` orientado a despliegue productivo.
- **Diseño:** Diagramas en PlantUML y Mermaid.
- **Documentación adicional:** README, ADRs y justificación técnica de decisiones.

### 1.2 Clasificación Arquitectónica Oficial
- **Estilo distribuido principal:** Cliente-Servidor (SPA + API REST).
- **Estilo estructural del backend:** Monolito modular.
- **Organización interna del backend:** Capas (routes/controllers/services/repositories).
- **Estilo de datos:** Arquitectura centrada en datos documentales con MongoDB.
- **Comunicación:** Síncrona request-response sobre HTTP usando REST.

### 1.3 Límites de Alcance (In/Out)
- **Incluido:** Flujo E2E login -> ver proyectos -> crear tarea con persistencia real en MongoDB.
- **Excluido por defecto:** Microservicios, service mesh, event streaming, CQRS/Event Sourcing como estilo base.
- **Regla de excepción:** Solo se permite agregar una tecnología extra si existe justificación técnica explícita en un ADR.

---

## 🧩 2. Alcance del Caso Práctico y Entidades
La solución desarrollada debe ser funcional, robusta (manejo de errores y validaciones) y consistente con el estilo Cliente-Servidor.

* **Dominio del Problema:** Sistema de Gestión de Proyectos y Tareas.
* **Mínimo 3 Entidades de Negocio interrelacionadas:**
    1.  **Usuario:** Actor del sistema (nombre, email, credenciales).
    2.  **Proyecto:** Contenedor de trabajo (título, descripción, ref. Usuario creador).
    3.  **Tarea:** Actividad (título, estado, ref. Proyecto, ref. Usuario asignado).
* **Flujo Funcional (End-to-End):** Un `Usuario` se autentica (Next.js), visualiza sus `Proyectos` consultando el backend (Express), y crea una nueva `Tarea` que es guardada persistentemente en la base de datos (MongoDB) vía un endpoint REST.

### 2.1 Reglas Funcionales Base
- Un usuario solo puede ver sus propios proyectos.
- Una tarea no puede existir sin proyecto.
- Cada tarea debe tener usuario asignado.
- Estados válidos de tarea: `todo`, `in_progress`, `done`.
- Todas las entradas del backend deben validarse.

---

## 📚 3. Entregable 1: Investigación Documental
*Instrucción para la IA: Cuando se te solicite la investigación, debes redactar con rigor académico los siguientes puntos para el Documento Técnico (en formato LaTeX).*

### A. Sobre el Estilo Arquitectónico (Cliente-Servidor)
- [ ] Definición clara (qué es y qué no es).
- [ ] Clasificación del estilo.
- [ ] Características principales.
- [ ] Historia y evolución.
- [ ] Ventajas y desventajas.
- [ ] Problemas comunes que se presentan y patrones asociados.
- [ ] Identificar patrones aplicables y cuándo usarlos.
- [ ] Casos de uso (cuándo usarlo y cuándo no).
- [ ] Casos de aplicación (ejemplos reales en la industria).

### B. Sobre el Stack Tecnológico (Next.js, Express, Mongo, REST)
- [ ] Definición clara (qué es y qué no es para cada tecnología).
- [ ] Características principales.
- [ ] Historia y evolución.
- [ ] Ventajas y desventajas.
- [ ] Casos de uso (cuándo usarlos y cuándo no).
- [ ] Casos de aplicación (ejemplos reales en la industria).
- [ ] Relación entre el estilo y las tecnologías seleccionadas.
- [ ] Qué tan común es el stack designado (relación entre tecnologías).

---

## 📊 4. Entregable 2: Análisis Arquitectónico
*Instrucción para la IA: Generar el contenido, justificaciones y tablas para las siguientes matrices.*

- [ ] **Matriz de atributos de calidad vs estilo:** Identificar cómo el Cliente-Servidor soporta o limita cada atributo de calidad.
- [ ] **Matriz de análisis de Principios vs estilo:** Identificar cómo el estilo cumple los principios SOLID, KISS, DRY, YAGNI, PoLA, Ley de Demeter, STUPID y Composición sobre Herencia.
- [ ] **Matriz de análisis de tácticas vs estilo y stack:** Identificar cómo un ADR (Architecture Decision Record) puede ser justificado para el estilo y stack asignado (Ej. Justificar el uso de Mongoose como ODM).
- [ ] **Matriz de análisis de mercado Laboral vs estilo y stack:** Identificar el estado del mercado actual para el stack (MERN variante), salarios mensuales/anuales y proyección (Usando fuentes como GitHub, StackOverflow, LinkedIn, etc.).

---

## 📐 5. Entregable 3: Diseño (Ejemplo Práctico y Funcional)
*Instrucción para la IA: Generar el código PlantUML, Mermaid o descripciones detalladas para modelar el sistema usando HLD + C4 Model.*

**Obligatorio:**
- [ ] Diagrama de alto nivel (HLD).
- [ ] Diagrama de Contexto (Nivel 1).
- [ ] Diagrama de Contenedores (Nivel 2).
- [ ] Diagrama Dinámico (flujo principal E2E de Proyectos/Tareas).
- [ ] Diagrama de Despliegue.

**Opcional:**
- [ ] Modelo de datos (Colecciones de Mongo para Usuario, Proyecto, Tarea).

---

## 💻 6. Entregable 4: Implementación
*Instrucción para la IA: Proporcionar el código fuente modular, comentado y aplicando buenas prácticas para cumplir con:*

- [ ] Código funcional preparado para un repositorio Git público (con TAG).
- [ ] Uso obligatorio de contenedores: Generar `docker-compose.yml` para orquestar Next.js, Express y MongoDB (Docker).
- [ ] Implementación del flujo principal E2E con manejo real de persistencia en Mongo.
- [ ] Integración mediante peticiones REST.
- [ ] Backend modular por capas (`routes/controllers/services/repositories`).
- [ ] Autenticación JWT en endpoints protegidos.
- [ ] Seed de datos para demo reproducible.
- [ ] Pruebas mínimas automatizadas.

### 6.1 Reglas Operativas para Evitar Alucinaciones (IA)
- Cada solicitud a IA debe indicar actividad exacta, archivo objetivo y criterio de aceptación verificable.
- No se aceptan respuestas de IA sin evidencia ejecutable (build/test/comando).
- Si falta contexto, la IA debe pedirlo antes de asumir.
- Cualquier decisión nueva debe enlazarse con el stack obligatorio o con un ADR.
- Mantener formato de respuesta API consistente en todo el backend.

### 6.2 Checklist de Prompt para Contribuyentes
- Definir fase y actividad exacta (ejemplo: "Implementación backend: POST /api/projects").
- Declarar restricciones (sin cambiar stack, sin microservicios, sin librerías no justificadas).
- Declarar criterios de aceptación (código compila, tests pasan, ruta responde según contrato).
- Declarar salida esperada (archivos a modificar y formato de respuesta).

---

## 📦 7. Entregables Finales (Checklist de Validación)

**Documento Técnico:**
- [ ] Investigación (Estilo y Stack).
- [ ] Análisis arquitectónico (4 Matrices).
- [ ] Diseño ejemplo práctico (C4).
- [ ] Lecciones aprendidas.
- [ ] Citas y bibliografía en formato IEEE.

**Repositorio Git público:**
- [ ] Código fuente.
- [ ] Creación de TAG y Release.
- [ ] `README.md` con: Descripción del sistema, Tecnologías usadas y Pasos exactos para despliegue (Docker).
- [ ] ADRs de decisiones clave (mínimo autenticación, persistencia y estructura del sistema).

**Presentación:**
- [ ] Uso de diagramas e infografías.
- [ ] Explicación clara de los temas.
- [ ] Estructura fluida y uso adecuado de colores.
- [ ] Participación de todos los integrantes (10 a 20 minutos).

---

## 🧭 8. Roadmap de Implementación Colaborativa

### Fase 1 - Base técnica
- Crear monorepo (`frontend` + `backend`).
- Configurar variables de entorno y Docker Compose.
- Definir estructura modular del backend.

**Definition of Done:** el proyecto instala dependencias sin errores y ambos servicios compilan.

### Fase 2 - Flujo E2E mínimo
- Implementar registro/login con JWT.
- Implementar listar/crear proyectos.
- Implementar listar/crear tareas por proyecto.

**Definition of Done:** un usuario puede autenticarse, crear proyecto y crear tarea con persistencia en MongoDB.

### Fase 3 - Calidad y hardening
- Validaciones Zod.
- Manejo de errores uniforme.
- Pruebas mínimas automatizadas del flujo principal.

**Definition of Done:** pruebas principales pasan y las rutas manejan errores 400/401/404/500.

### Fase 4 - Documentación técnica
- Escribir ADRs.
- Completar diagramas HLD + C4 + despliegue.
- Cerrar README con guía de ejecución.

**Definition of Done:** cualquier contribuidor puede levantar el sistema local y entender decisiones sin ambigüedad.