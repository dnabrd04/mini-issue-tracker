# Frontend - Mini Issue Tracker

Interfaz web del proyecto desarrollada con React 19, TypeScript y Vite. Consume la API REST del backend para visualizar y gestionar incidencias.

Para la descripción general del proyecto, el modelo de datos y la puesta en marcha completa (incluida la preparación de la base de datos y el backend), consulta el [README raíz](../README.md).

## Requisitos

- Node.js
- `pnpm`
- Backend en ejecución y accesible (por defecto en `http://localhost:8081`)

## Configuración

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `VITE_API_URL` | URL base de la API backend | `http://localhost:8081` |

Puedes definirla en un archivo de entorno de Vite (por ejemplo `.env.local`) o al ejecutar los comandos.

## Scripts

Ejecutar desde el directorio `frontend/`:

```bash
# Instalar dependencias
pnpm install

# Entorno de desarrollo
pnpm dev

# Comprobar tipos y generar build
pnpm build

# Lint
pnpm lint

# Previsualizar build
pnpm preview
```

## Notas

- La aplicación se sirve normalmente en `http://localhost:5173` durante el desarrollo.
- Consume el recurso `/api/issues` documentado en el [README raíz](../README.md#api-rest).
- No hay suite de tests automatizados configurada actualmente.
