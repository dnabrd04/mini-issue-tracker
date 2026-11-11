import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from '../lib/issues'
import type { Priority, Status } from '../types/issue'

interface FilterBarProps {
  search: string
  priority: Priority | 'ALL'
  status: Status | 'ALL'
  onSearchChange: (value: string) => void
  onPriorityChange: (value: Priority | 'ALL') => void
  onStatusChange: (value: Status | 'ALL') => void
  onAdd: () => void
}

export function FilterBar({
  search,
  priority,
  status,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onAdd,
}: FilterBarProps) {
  return (
    <form
      className="filter-bar"
      role="search"
      aria-label="Filtros de issues"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="filter-bar__search">
        <span>Buscar por título</span>
        <input
          type="search"
          value={search}
          placeholder="Buscar issues..."
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="filter-bar__field">
        <span>Prioridad</span>
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as Priority | 'ALL')}
        >
          <option value="ALL">Todas</option>
          {PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {PRIORITY_LABELS[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-bar__field">
        <span>Estado</span>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as Status | 'ALL')}
        >
          <option value="ALL">Todos</option>
          {STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className="button button--primary filter-bar__add" onClick={onAdd}>
        Añadir issue
      </button>
    </form>
  )
}
