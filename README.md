# Mini Issue Tracker

Aplicación full-stack para la gestión de incidencias, inspirada en un flujo tipo tablero Kanban. Permite crear, consultar, editar y eliminar issues, además de filtrarlos por estado, prioridad y búsqueda por título.

Este proyecto está pensado como pieza de portfolio: muestra una API REST con Spring Boot y una interfaz en React/TypeScript, manteniendo un alcance acotado y una separación clara entre backend y frontend.

## Funcionalidades

- CRUD completo de incidencias.
- Organización por estado: pendiente, en progreso y completada.
- Filtros por estado y prioridad, y búsqueda por título.
- Validación de datos y respuestas de error estructuradas en la API.
- Interfaz web para visualizar y gestionar las incidencias consumiendo la API.

## Stack tecnológico

- **Backend:** Java 21, Spring Boot 4, Spring Web, Spring Data JPA, Bean Validation, MySQL, Maven Wrapper.
- **Frontend:** React 19, TypeScript, Vite, pnpm.
- **Arquitectura:** repositorio con dos módulos (`backend/` y `frontend/`) que se ejecutan de forma independiente.

## Estructura del repositorio

```text
.
├── backend/   # API REST (Spring Boot, JPA, MySQL)
└── frontend/  # Aplicación web (React + TypeScript + Vite)
```

- Documentación específica: [`backend/README.md`](backend/README.md) y [`frontend/README.md`](frontend/README.md).

## Requisitos previos

- Java 21
- MySQL 8+ (u otra instancia MySQL compatible)
- Node.js y `pnpm`
- Bash (para usar `./mvnw` en sistemas Unix; en Windows puede usarse `mvnw.cmd`)

## Puesta en marcha

### 1. Base de datos

La aplicación usa MySQL y, por defecto, se conecta a `jdbc:mysql://localhost:3306/mini_issue_tracker` con usuario `root` y sin contraseña. No hay scripts SQL ni Docker Compose versionados en el repositorio, por lo que debes preparar la base de datos manualmente.

1. Crea la base de datos (ajusta el nombre si lo deseas):

```sql
CREATE DATABASE mini_issue_tracker;
```

2. Crea la tabla `issues`:

```sql
USE mini_issue_tracker;

CREATE TABLE issues (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  PRIMARY KEY (id)
);
```

> Nota: el backend está configurado por defecto con `spring.jpa.hibernate.ddl-auto=none`, por lo que no crea ni modifica el esquema automáticamente.

### 2. Backend

1. Configura las credenciales de base de datos. Puedes crear un archivo `backend/.env` (el backend lo importa de forma opcional):

```env
DB_URL=jdbc:mysql://localhost:3306/mini_issue_tracker?serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=tu_password
# Opcionales
# SERVER_PORT=8081
# JPA_DDL_AUTO=none
```

2. Inicia la API:

```bash
cd backend
./mvnw spring-boot:run
```

- API disponible en `http://localhost:8081` (o en el puerto definido por `SERVER_PORT`).
- Más detalles de configuración y comandos: [`backend/README.md`](backend/README.md).

### 3. Frontend

1. Instala dependencias e inicia el entorno de desarrollo:

```bash
cd frontend
pnpm install
pnpm dev
```

2. Abre la aplicación en `http://localhost:5173`.

- El frontend consume la API usando `VITE_API_URL` (por defecto `http://localhost:8081`). Si necesitas cambiarla, define la variable antes de ejecutar `pnpm dev` o en un archivo de entorno de Vite.
- Más detalles: [`frontend/README.md`](frontend/README.md).

## API REST

Base URL por defecto: `http://localhost:8081`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/issues` | Lista incidencias. Filtros opcionales: `status`, `priority`, `search` |
| `GET` | `/api/issues/{id}` | Obtiene una incidencia por id |
| `POST` | `/api/issues` | Crea una incidencia (`201 Created`) |
| `PUT` | `/api/issues/{id}` | Actualiza una incidencia |
| `DELETE` | `/api/issues/{id}` | Elimina una incidencia (`204 No Content`) |

- `status`: `PENDING`, `IN_PROGRESS`, `DONE`
- `priority`: `LOW`, `MEDIUM`, `HIGH`
- `search`: filtra por título (coincidencia parcial)

## Modelo de datos

Entidad principal: `Issue` (tabla `issues`).

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | número | Identificador autogenerado |
| `title` | string | Título obligatorio (3-100 caracteres) |
| `description` | string | Descripción obligatoria |
| `priority` | `LOW` \| `MEDIUM` \| `HIGH` | Prioridad de la incidencia (por defecto `MEDIUM`) |
| `status` | `PENDING` \| `IN_PROGRESS` \| `DONE` | Estado de la incidencia (por defecto `PENDING`) |
| `created_at` | string (fecha/hora) | Fecha de creación |
| `updated_at` | string (fecha/hora) | Fecha de última actualización |

## Pruebas

- **Backend:** `cd backend && ./mvnw test`
- **Frontend:** no hay suite de tests automatizados configurada actualmente.

## Documentación por módulo

- [Backend](backend/README.md): configuración, variables de entorno y comandos de Maven.
- [Frontend](frontend/README.md): scripts, configuración de `VITE_API_URL` y notas de desarrollo.
