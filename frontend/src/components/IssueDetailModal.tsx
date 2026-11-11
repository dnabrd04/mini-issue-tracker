import { PRIORITY_LABELS, STATUS_LABELS } from '../lib/issues'
import type { Issue } from '../types/issue'
import { Modal } from './Modal'

interface IssueDetailModalProps {
  issue: Issue
  onClose: () => void
}

const formatDate = (value: string) =>
  new Date(value).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

export function IssueDetailModal({ issue, onClose }: IssueDetailModalProps) {
  return (
    <Modal title="Detalle de la issue" onClose={onClose}>
      <div className="issue-detail">
        <h3>{issue.title}</h3>
        <p className="issue-detail__description">{issue.description}</p>

        <dl className="issue-detail__meta">
          <div>
            <dt>Prioridad</dt>
            <dd>{PRIORITY_LABELS[issue.priority]}</dd>
          </div>
          <div>
            <dt>Estado</dt>
            <dd>{STATUS_LABELS[issue.status]}</dd>
          </div>
          <div>
            <dt>Creada</dt>
            <dd>{formatDate(issue.created_at)}</dd>
          </div>
          <div>
            <dt>Actualizada</dt>
            <dd>{formatDate(issue.updated_at)}</dd>
          </div>
        </dl>
      </div>
    </Modal>
  )
}
