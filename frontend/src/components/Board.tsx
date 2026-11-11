import { STATUSES } from '../lib/issues'
import type { Issue, Status } from '../types/issue'
import { IssueColumn } from './IssueColumn'

interface BoardProps {
  issues: Issue[]
  statusFilter: Status | 'ALL'
  onOpen: (issue: Issue) => void
  onEdit: (issue: Issue) => void
  onDelete: (issue: Issue) => void
}

export function Board({ issues, statusFilter, onOpen, onEdit, onDelete }: BoardProps) {
  const visibleStatuses = statusFilter === 'ALL' ? STATUSES : [statusFilter]

  return (
    <section
      className={`board${visibleStatuses.length === 1 ? ' board--single' : ''}`}
      aria-label="Tablero de issues"
    >
      {visibleStatuses.map((status) => (
        <IssueColumn
          key={status}
          status={status}
          issues={issues.filter((issue) => issue.status === status)}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}
