
# Incident Tracker 🚨

Proyecto fullstack:
- Frontend: Ionic + Angular
- Backend: Spring WebFlux

## Estructura

- /frontend: app móvil
- /backend: API reactiva
- /docs: documentación y contrato API



# Backend Incident Tracker

API REST reactiva para gestión de incidentes en tiempo real usando Spring WebFlux.

## Requisitos

- Java 17+
- Maven 3.6+

## Ejecución

```bash
./mvnw spring-boot:run
```

La aplicación estará disponible en `http://localhost:8080`

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/incidents` | Listar todos los incidentes |
| GET | `/incidents/stream` | Stream SSE de nuevos incidentes |
| POST | `/incidents` | Crear un nuevo incidente |
| GET | `/incidents/{id}` | Obtener incidente por ID |
| PATCH | `/incidents/{id}/acknowledge` | Marcar como ACKNOWLEDGED |
| PATCH | `/incidents/{id}/resolve` | Marcar como RESOLVED |
| DELETE | `/incidents/{id}` | Eliminar (solo si está RESOLVED) |

## Modelo de datos

### Incident

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "severity": "P1 | P2 | P3",
  "status": "OPEN | ACKNOWLEDGED | RESOLVED",
  "assignedTo": "string (nullable)",
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

### Ciclo de vida

```
OPEN → ACKNOWLEDGED → RESOLVED
```

- Un incidente no puede volver a OPEN una vez ACKNOWLEDGED
- Un incidente no puede modificarse si ya está RESOLVED
- Solo se pueden eliminar incidentes RESOLVED

## Ejemplos de uso

Ver archivo `incidents.http` para ejemplos de todas las operaciones.

## Estructura del proyecto

```
src/main/java/com/incidenttracker/
├── config/          # Configuración (CORS)
├── controller/      # Controladores REST
├── dto/             # DTOs (Request/Response)
├── exception/       # Excepciones y manejadores
├── model/           # Entidades de dominio
├── repository/      # Capa de persistencia
└── service/         # Lógica de negocio



#  Incident Tracker – Frontend

Aplicación móvil desarrollada con Ionic + Angular para la gestión de incidentes en tiempo real.

---

## Arquitectura

El proyecto sigue una adaptación de **Clean Architecture** para frontend:

* **domain/** → modelos y reglas de negocio
* **data/** → acceso a API (services)
* **presentation/** → UI (pages y componentes)
* **core/** → servicios globales e interceptores
* **shared/** → componentes reutilizables

---

##  Tecnologías

* Ionic
* Angular
* RxJS
* TypeScript

---

##  Estructura del proyecto

```
src/app/
├── core/
├── shared/
├── domain/
├── data/
├── presentation/
```

---

## Cómo ejecutar el proyecto

### 1. Instalar dependencias

```
npm install
```

### 2. Ejecutar la aplicación

```
ionic serve
```

La app estará disponible en:

```
http://localhost:8100
```

---

##  Conexión con backend

El frontend consume la API en:

```
http://localhost:8080
```

Asegúrate de que el backend esté corriendo antes de probar la app.

---

##  Funcionalidades principales

* Feed de incidentes en tiempo real (SSE)
* Creación de incidentes
* Visualización de detalle
* Cambio de estado (Acknowledge / Resolve)
* Indicadores visuales por severidad
* Manejo de errores con interceptor

---

##  Consideraciones

* El backend debe permitir CORS desde `http://localhost:8100`
* El contrato de API debe respetarse estrictamente
* Se manejan estados de UI:

  * loading
  * error
  * success
  * empty

---

##  Scripts útiles

```
ionic serve       # desarrollo
ionic build       # build producción
```

---

##  Desarrollo

Este proyecto forma parte de un sistema fullstack junto a un backend en Spring WebFlux.

---

## Contrato API

Consultar el archivo `api-contract.md` compartido con el equipo backend.
