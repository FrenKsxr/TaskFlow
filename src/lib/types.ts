export type Priority = "Alta" | "Media" | "Baja"
export type Status = "Pendiente" | "En Progreso" | "Completada"

export interface Task {
  id: string
  title: string
  description: string
  deadline: string
  priority: Priority
  status: Status
  createdAt: string
}

export type SortStrategy = "priority" | "deadline" | "status"
export type FilterType = "all" | "completed" | "pending" | "in-progress"
