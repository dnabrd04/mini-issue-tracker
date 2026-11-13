import type { Issue, IssueInput, Priority, Status } from '../types/issue'
import { request } from './http'

interface ListIssuesOptions {
  search?: string
  priority?: Priority | 'ALL'
  status?: Status | 'ALL'
  signal?: AbortSignal
}

export async function listIssues({
  search,
  priority,
  status,
  signal,
}: ListIssuesOptions = {}): Promise<Issue[]> {
  const params = new URLSearchParams()
  const normalizedSearch = search?.trim()

  if (normalizedSearch) {
    params.set('search', normalizedSearch)
  }
  if (priority && priority !== 'ALL') {
    params.set('priority', priority)
  }
  if (status && status !== 'ALL') {
    params.set('status', status)
  }

  const query = params.toString()

  return request<Issue[]>(`/api/issues${query ? `?${query}` : ''}`, { signal })
}

export async function createIssue(input: IssueInput): Promise<Issue> {
  return request<Issue>('/api/issues', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function updateIssue(id: number, input: IssueInput): Promise<Issue> {
  return request<Issue>(`/api/issues/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

export async function deleteIssue(id: number): Promise<void> {
  await request<void>(`/api/issues/${id}`, { method: 'DELETE' })
}
