import type { Task, Priority, Status } from "./types"

// Strategy Interface
export interface TaskSortStrategy {
  name: string
  description: string
  sort(tasks: Task[]): Task[]
}

// Concrete Strategy: Sort by Priority
export class PrioritySortStrategy implements TaskSortStrategy {
  name = "Ordenar por Prioridad"
  description = "Ordena las tareas de mayor a menor prioridad (Alta → Media → Baja)"

  sort(tasks: Task[]): Task[] {
    const priorityOrder: Record<Priority, number> = {
      Alta: 1,
      Media: 2,
      Baja: 3,
    }

    return [...tasks].sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (priorityDiff !== 0) return priorityDiff

      // Secondary sort by deadline if priorities are equal
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })
  }
}

// Concrete Strategy: Sort by Deadline
export class DeadlineSortStrategy implements TaskSortStrategy {
  name = "Ordenar por Fecha Límite"
  description = "Ordena las tareas por fecha límite (más próximas primero)"

  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      const dateDiff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      if (dateDiff !== 0) return dateDiff

      // Secondary sort by priority if dates are equal
      const priorityOrder: Record<Priority, number> = {
        Alta: 1,
        Media: 2,
        Baja: 3,
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }
}

// Concrete Strategy: Sort by Status
export class StatusSortStrategy implements TaskSortStrategy {
  name = "Ordenar por Estado"
  description = "Ordena las tareas por estado (Pendiente → En Progreso → Completada)"

  sort(tasks: Task[]): Task[] {
    const statusOrder: Record<Status, number> = {
      Pendiente: 1,
      "En Progreso": 2,
      Completada: 3,
    }

    return [...tasks].sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status]
      if (statusDiff !== 0) return statusDiff

      // Secondary sort by deadline if statuses are equal
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })
  }
}

// Concrete Strategy: Sort by Creation Date
export class CreationDateSortStrategy implements TaskSortStrategy {
  name = "Ordenar por Fecha de Creación"
  description = "Ordena las tareas por fecha de creación (más recientes primero)"

  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
}

// Context: Uses a strategy to sort tasks
export class TaskSorter {
  private strategy: TaskSortStrategy

  constructor(strategy: TaskSortStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: TaskSortStrategy) {
    this.strategy = strategy
  }

  getStrategy(): TaskSortStrategy {
    return this.strategy
  }

  sort(tasks: Task[]): Task[] {
    return this.strategy.sort(tasks)
  }
}

// Available strategies
export const availableStrategies = [
  new PrioritySortStrategy(),
  new DeadlineSortStrategy(),
  new StatusSortStrategy(),
  new CreationDateSortStrategy(),
]
