import { useState } from 'react'
import './App.css'
import { Board } from './components/Board'
import { FilterBar } from './components/FilterBar'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { IssueDetailModal } from './components/IssueDetailModal'
import { IssueFormModal } from './components/IssueFormModal'
import { useIssues } from './hooks/useIssues'
import type { Issue, IssueInput, Priority, Status } from './types/issue'

type FormModalState = { mode: 'create' } | { mode: 'edit'; issue: Issue } | null

function App() {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL')
  const [formModal, setFormModal] = useState<FormModalState>(null)
  const [detailIssue, setDetailIssue] = useState<Issue | null>(null)

  const { issues, loading, error, createIssue, updateIssue, deleteIssue } = useIssues({
    search,
    priority: priorityFilter,
    status: statusFilter,
  })

  const handleSubmit = async (input: IssueInput) => {
    if (formModal?.mode === 'edit') {
      const updated = await updateIssue(formModal.issue.id, input)
      setDetailIssue((current) => (current && current.id === updated.id ? updated : current))
    } else {
      await createIssue(input)
    }
    setFormModal(null)
  }

  const handleDelete = async (issue: Issue) => {
    if (!window.confirm(`¿Eliminar la issue "${issue.title}"?`)) {
      return
    }

    const deleted = await deleteIssue(issue.id)

    if (deleted) {
      setDetailIssue((current) => (current && current.id === issue.id ? null : current))
    }
  }

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <FilterBar
          search={search}
          priority={priorityFilter}
          status={statusFilter}
          onSearchChange={setSearch}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onAdd={() => setFormModal({ mode: 'create' })}
        />

        {error && (
          <p className="app-error" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p className="app-status">Cargando issues...</p>
        ) : (
          <Board
            issues={issues}
            statusFilter={statusFilter}
            onOpen={setDetailIssue}
            onEdit={(issue) => setFormModal({ mode: 'edit', issue })}
            onDelete={handleDelete}
          />
        )}
      </main>

      <Footer />

      {formModal && (
        <IssueFormModal
          key={formModal.mode === 'edit' ? formModal.issue.id : 'create'}
          mode={formModal.mode}
          initialIssue={formModal.mode === 'edit' ? formModal.issue : undefined}
          onClose={() => setFormModal(null)}
          onSubmit={handleSubmit}
        />
      )}

      {detailIssue && (
        <IssueDetailModal issue={detailIssue} onClose={() => setDetailIssue(null)} />
      )}
    </div>
  )
}

export default App
