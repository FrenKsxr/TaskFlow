import type { Task } from "./types"
import type { FilterState } from "../components/task-filters"

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  return tasks.filter((task) => {
    // Search text filter
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase()
      const matchesTitle = task.title.toLowerCase().includes(searchLower)
      const matchesDescription = task.description.toLowerCase().includes(searchLower)
      if (!matchesTitle && !matchesDescription) {
        return false
      }
    }

    // Priority filter
    if (filters.priority !== "all" && task.priority !== filters.priority) {
      return false
    }

    // Status filter
    if (filters.status !== "all" && task.status !== filters.status) {
      return false
    }

    return true
  })
}
