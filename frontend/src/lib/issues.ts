import type { Priority, Status } from '../types/issue'

export const PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH']
export const STATUSES: Status[] = ['PENDING', 'IN_PROGRESS', 'DONE']

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
}

export const STATUS_LABELS: Record<Status, string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En progreso',
  DONE: 'Hecho',
}
