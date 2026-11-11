import type { Issue } from '../types/issue'

interface IssueCardProps {
  issue: Issue
  onOpen: (issue: Issue) => void
  onEdit: (issue: Issue) => void
  onDelete: (issue: Issue) => void
}

export function IssueCard({ issue, onOpen, onEdit, onDelete }: IssueCardProps) {
  return (
    <article
      className="issue-card"
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${issue.title}`}
      onClick={() => onOpen(issue)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) {
          return
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(issue)
        }
      }}
    >
      <h3 className="issue-card__title">{issue.title}</h3>
      <p className="issue-card__description">{issue.description}</p>
      <div className="issue-card__actions">
        <button
          type="button"
          className="button"
          onClick={(event) => {
            event.stopPropagation()
            onEdit(issue)
          }}
        >
          Editar
        </button>
        <button
          type="button"
          className="button button--danger"
          onClick={(event) => {
            event.stopPropagation()
            onDelete(issue)
          }}
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}

