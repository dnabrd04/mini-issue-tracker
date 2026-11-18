# Backend - Mini Issue Tracker

API REST del proyecto desarrollada con Spring Boot, Spring Data JPA y MySQL. Expone el recurso `/api/issues` para la gestión de incidencias.

Para la descripción general del proyecto, el modelo de datos, el esquema SQL y la puesta en marcha completa (backend + frontend), consulta el [README raíz](../README.md).

## Requisitos

- Java 21
- MySQL accesible y con el esquema preparado (ver [Puesta en marcha](../README.md#puesta-en-marcha) en el README raíz)

## Configuración

La configuración principal está en `src/main/resources/application.yaml`. Se pueden definir variables en `backend/.env` (se importa de forma opcional).

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `DB_URL` | URL JDBC de MySQL | `jdbc:mysql://localhost:3306/mini_issue_tracker?serverTimezone=UTC` |
| `DB_USERNAME` | Usuario de la base de datos | `root` |
| `DB_PASSWORD` | Contraseña de la base de datos | *(vacío)* |
| `SERVER_PORT` | Puerto HTTP del servidor | `8081` |
| `JPA_DDL_AUTO` | Estrategia DDL de Hibernate | `none` |

## Comandos

Ejecutar desde el directorio `backend/` (usa el Maven Wrapper incluido):

```bash
# Iniciar la aplicación
./mvnw spring-boot:run

# Ejecutar pruebas
./mvnw test

# Empaquetar
./mvnw package
```

## Notas

- Endpoints y contrato de la API: ver [API REST](../README.md#api-rest) en el README raíz.
- El controlador permite peticiones desde `http://localhost:5173` (entorno de desarrollo del frontend).
- Las entradas se validan con Jakarta Bean Validation y los errores se devuelven en formato JSON.
