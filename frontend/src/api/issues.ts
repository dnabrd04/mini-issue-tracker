import type { Issue, IssueInput } from '../types/issue'

const delay = (ms = 150) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const cloneIssue = (issue: Issue): Issue => ({ ...issue })

let nextId = 6
let issues: Issue[] = [
  {
    id: 1,
    title: 'Configurar el proyecto base',
    description:
      'Inicializar el proyecto con Vite, React y TypeScript, y dejar preparada la configuración de lint y compilación.',
    priority: 'HIGH',
    status: 'DONE',
    created_at: '2026-10-01T09:00:00.000Z',
    updated_at: '2026-10-02T10:30:00.000Z',
  },
  {
    id: 2,
    title: 'Diseñar el tablero de issues',
    description:
      'Definir las tres columnas por estado y el aspecto de las tarjetas, incluyendo el truncado de la descripción a dos líneas.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    created_at: '2026-10-03T11:15:00.000Z',
    updated_at: '2026-10-05T16:45:00.000Z',
  },
  {
    id: 3,
    title: 'Añadir filtros de búsqueda',
    description:
      'Permitir buscar issues por título y filtrar por prioridad y estado. Los filtros deben poder combinarse entre sí.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    created_at: '2026-10-06T08:20:00.000Z',
    updated_at: '2026-10-07T09:10:00.000Z',
  },
  {
    id: 4,
    title: 'Crear formulario de issues',
    description:
      'Implementar la ventana emergente para crear y editar issues con los campos título, descripción, prioridad y estado.',
    priority: 'MEDIUM',
    status: 'PENDING',
    created_at: '2026-10-08T14:00:00.000Z',
    updated_at: '2026-10-08T14:00:00.000Z',
  },
  {
    id: 5,
    title: 'Preparar integración con el backend',
    description:
      'Sustituir el módulo mock por llamadas reales a la API cuando el backend esté disponible, manteniendo el mismo contrato de datos.',
    priority: 'LOW',
    status: 'PENDING',
    created_at: '2026-10-09T10:05:00.000Z',
    updated_at: '2026-10-09T10:05:00.000Z',
  },
]

export async function listIssues(): Promise<Issue[]> {
  await delay()
  return issues.map(cloneIssue)
}

export async function createIssue(input: IssueInput): Promise<Issue> {
  await delay()
  const now = new Date().toISOString()
  const issue: Issue = {
    id: nextId,
    ...input,
    created_at: now,
    updated_at: now,
  }
  nextId += 1
  issues = [...issues, issue]
  return cloneIssue(issue)
}

export async function updateIssue(id: number, input: IssueInput): Promise<Issue> {
  await delay()
  const current = issues.find((issue) => issue.id === id)
  if (!current) {
    throw new Error('Issue no encontrada')
  }
  const updated: Issue = {
    ...current,
    ...input,
    updated_at: new Date().toISOString(),
  }
  issues = issues.map((issue) => (issue.id === id ? updated : issue))
  return cloneIssue(updated)
}

export async function deleteIssue(id: number): Promise<void> {
  await delay()
  if (!issues.some((issue) => issue.id === id)) {
    throw new Error('Issue no encontrada')
  }
  issues = issues.filter((issue) => issue.id !== id)
}
