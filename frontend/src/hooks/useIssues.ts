import { useEffect, useState } from 'react'
import {
  createIssue as createIssueRequest,
  deleteIssue as deleteIssueRequest,
  listIssues,
  updateIssue as updateIssueRequest,
} from '../api/issues'
import type { Issue, IssueInput, Priority, Status } from '../types/issue'

interface UseIssuesOptions {
  search: string
  priority: Priority | 'ALL'
  status: Status | 'ALL'
}

export function useIssues({ search, priority, status }: UseIssuesOptions) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search), 300)

    return () => window.clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    const controller = new AbortController()

    listIssues({
      search: debouncedSearch,
      priority,
      status,
      signal: controller.signal,
    })
      .then((data) => {
        setIssues(data)
        setError(null)
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') {
          return
        }

        setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar las issues')
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [debouncedSearch, priority, status, reloadToken])

  const reload = () => setReloadToken((current) => current + 1)

  const createIssue = async (input: IssueInput) => {
    const created = await createIssueRequest(input)
    reload()
    return created
  }

  const updateIssue = async (id: number, input: IssueInput) => {
    const updated = await updateIssueRequest(id, input)
    reload()
    return updated
  }

  const deleteIssue = async (id: number) => {
    try {
      await deleteIssueRequest(id)
      reload()
      return true
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar la issue')
      return false
    }
  }

  return {
    issues,
    loading,
    error,
    reload,
    createIssue,
    updateIssue,
    deleteIssue,
  }
}
