import { useEffect, useState } from 'react'
import './App.css'
import { createIssue, deleteIssue, listIssues, updateIssue } from './api/issues'
import { Board } from './components/Board'
import { FilterBar } from './components/FilterBar'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { IssueDetailModal } from './components/IssueDetailModal'
import { IssueFormModal } from './components/IssueFormModal'
import type { Issue, IssueInput, Priority, Status } from './types/issue'

type FormModalState = { mode: 'create' } | { mode: 'edit'; issue: Issue } | null

function App() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL')
  const [formModal, setFormModal] = useState<FormModalState>(null)
  const [detailIssue, setDetailIssue] = useState<Issue | null>(null)

  useEffect(() => {
    let active = true

    listIssues()
      .then((data) => {
        if (active) {
          setIssues(data)
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar las issues')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const normalizedSearch = search.trim().toLowerCase()
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      normalizedSearch === '' || issue.title.toLowerCase().includes(normalizedSearch)
    const matchesPriority = priorityFilter === 'ALL' || issue.priority === priorityFilter
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleSubmit = async (input: IssueInput) => {
    if (formModal?.mode === 'edit') {
      const updated = await updateIssue(formModal.issue.id, input)
      setIssues((current) => current.map((issue) => (issue.id === updated.id ? updated : issue)))
      setDetailIssue((current) => (current && current.id === updated.id ? updated : current))
    } else {
      const created = await createIssue(input)
      setIssues((current) => [...current, created])
    }
    setFormModal(null)
  }

  const handleDelete = async (issue: Issue) => {
    if (!window.confirm(`¿Eliminar la issue "${issue.title}"?`)) {
      return
    }

    setError(null)
    try {
      await deleteIssue(issue.id)
      setIssues((current) => current.filter((item) => item.id !== issue.id))
      setDetailIssue((current) => (current && current.id === issue.id ? null : current))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar la issue')
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
            issues={filteredIssues}
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
