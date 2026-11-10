# Frontend (Vite + React 19 + TypeScript)

App única; el backend se añadirá después en la raíz del repo. No asumas que existe una API todavía.

## Comandos (desde `frontend/`)

- Instalar: `pnpm install` — pnpm es el gestor (`pnpm-lock.yaml`); no usar npm/yarn.
- Dev: `pnpm dev`
- Typecheck + build: `pnpm build` (`tsc -b && vite build`)
- Solo typecheck: `pnpm exec tsc -b`
- Lint: `pnpm lint` (`eslint .`, flat config, sin reglas type-aware)
- Preview: `pnpm preview`
- No hay test runner ni script de test; no añadir tests sin preguntar.

## Modelo de datos / contrato API esperado

El backend expondrá una sola entidad, `Issue`, respaldada por una única tabla `issues`.
La API solo devolverá/aceptará estos campos (no inventar relaciones, paginación, auth ni campos extra):

| Campo         | Tipo TS                                | Reglas                                              |
| ------------- | -------------------------------------- | --------------------------------------------------- |
| `id`          | `number` (BIGINT; puede venir como string) | PK autoincremental; cuidado con enteros > 2^53  |
| `title`       | `string`                               | obligatorio, 3–100 caracteres                       |
| `description` | `string`                               | obligatorio, TEXT (sin límite de 2000)              |
| `priority`    | `'LOW' \| 'MEDIUM' \| 'HIGH'`          | obligatorio, default `'MEDIUM'`                     |
| `status`      | `'PENDING' \| 'IN_PROGRESS' \| 'DONE'` | obligatorio, default `'PENDING'`                    |
| `created_at`  | `string` (ISO timestamp)               | generado por la BD                                  |
| `updated_at`  | `string` (ISO timestamp)               | generado/actualizado por la BD                      |

Notas:

- En TypeScript modelar `priority`/`status` como string unions, no como `enum` (además `erasableSyntaxOnly` lo prohíbe).
- `description` es `TEXT` (el esquema original con `VARCHAR(2000)` ya no aplica).
- El esquema canónico vivirá en `backend/AGENTS.md` cuando exista; aquí solo importa la forma de la respuesta.

## Gotchas de toolchain

- React Compiler activo vía `@rolldown/plugin-babel` en `vite.config.ts`; no quitar `babel({ presets: [reactCompilerPreset()] })`. Evita memoización manual (`useMemo`/`useCallback`/`memo`) salvo necesidad real.
- `tsc -b` usa project references: `tsconfig.app.json` (`src`) y `tsconfig.node.json` (`vite.config.ts`).
- `verbatimModuleSyntax`: usa `import type { X }` para imports solo de tipos.
- `erasableSyntaxOnly`: no usar `enum`, `namespace` ni parameter properties.
- `noUnusedLocals` y `noUnusedParameters` activos.
- `strict` NO está activado (default de la plantilla); no cambiarlo sin preguntar.
- Imports relativos con extensión (`./App.tsx`); no hay path aliases.

## Estructura

- `index.html` monta `#root`; `src/main.tsx` arranca `src/App.tsx`.
- `src/index.css` estilos globales; `src/App.css` estilos de componente.

## Estilo

- Sin Prettier/formatter configurado. Seguir el código existente: sin punto y coma, comillas simples, indentación de 2 espacios.
- El `README.md` es la plantilla por defecto de Vite con sugerencias opcionales; no son requisitos del proyecto.
