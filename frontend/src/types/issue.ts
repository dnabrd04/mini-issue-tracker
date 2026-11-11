export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'
export type Status = 'PENDING' | 'IN_PROGRESS' | 'DONE'

export interface Issue {
  id: number
  title: string
  description: string
  priority: Priority
  status: Status
  created_at: string
  updated_at: string
}

export type IssueInput = Pick<Issue, 'title' | 'description' | 'priority' | 'status'>
