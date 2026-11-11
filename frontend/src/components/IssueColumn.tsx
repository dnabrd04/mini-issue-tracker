import { STATUS_LABELS } from '../lib/issues'
import type { Issue, Status } from '../types/issue'
import { IssueCard } from './IssueCard'

interface IssueColumnProps {
  status: Status
  issues: Issue[]
  onOpen: (issue: Issue) => void
  onEdit: (issue: Issue) => void
  onDelete: (issue: Issue) => void
}

export function IssueColumn({ status, issues, onOpen, onEdit, onDelete }: IssueColumnProps) {
  return (
    <section className="issue-column" aria-label={STATUS_LABELS[status]}>
      <header className="issue-column__header">
        <h2>{STATUS_LABELS[status]}</h2>
        <span className="issue-column__count">{issues.length}</span>
      </header>

      {issues.length === 0 ? (
        <p className="issue-column__empty">No hay issues</p>
      ) : (
        <div className="issue-column__list">
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onOpen={onOpen}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
