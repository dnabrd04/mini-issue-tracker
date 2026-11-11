import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from '../lib/issues'
import type { Issue, IssueInput, Priority, Status } from '../types/issue'
import { Modal } from './Modal'

interface IssueFormModalProps {
  mode: 'create' | 'edit'
  initialIssue?: Issue
  onClose: () => void
  onSubmit: (input: IssueInput) => Promise<void>
}

interface FieldErrors {
  title?: string
  description?: string
}

export function IssueFormModal({ mode, initialIssue, onClose, onSubmit }: IssueFormModalProps) {
  const [title, setTitle] = useState(initialIssue?.title ?? '')
  const [description, setDescription] = useState(initialIssue?.description ?? '')
  const [priority, setPriority] = useState<Priority>(initialIssue?.priority ?? 'MEDIUM')
  const [status, setStatus] = useState<Status>(initialIssue?.status ?? 'PENDING')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    const nextErrors: FieldErrors = {}

    if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      nextErrors.title = 'El título debe tener entre 3 y 100 caracteres'
    }
    if (trimmedDescription.length === 0) {
      nextErrors.description = 'La descripción es obligatoria'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSaving(true)
    setFormError(null)

    try {
      await onSubmit({
        title: trimmedTitle,
        description: trimmedDescription,
        priority,
        status,
      })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No se pudo guardar la issue')
      setSaving(false)
    }
  }

  return (
    <Modal title={mode === 'create' ? 'Añadir issue' : 'Editar issue'} onClose={onClose}>
      <form className="issue-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="issue-title">Título</label>
          <input
            id="issue-title"
            type="text"
            value={title}
            maxLength={100}
            aria-invalid={Boolean(errors.title)}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="issue-description">Descripción</label>
          <textarea
            id="issue-description"
            rows={5}
            value={description}
            aria-invalid={Boolean(errors.description)}
            onChange={(event) => setDescription(event.target.value)}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="issue-priority">Prioridad</label>
            <select
              id="issue-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value as Priority)}
            >
              {PRIORITIES.map((value) => (
                <option key={value} value={value}>
                  {PRIORITY_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="issue-status">Estado</label>
            <select
              id="issue-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as Status)}
            >
              {STATUSES.map((value) => (
                <option key={value} value={value}>
                  {STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formError && (
          <p className="form-error" role="alert">
            {formError}
          </p>
        )}

        <div className="form-actions">
          <button type="button" className="button" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button type="submit" className="button button--primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
