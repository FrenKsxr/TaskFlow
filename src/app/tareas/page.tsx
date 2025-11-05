import { useState, useMemo } from "react"
import { useTasks } from "@/lib/task-context"
import type { Task } from "@/lib/types"
import { TaskCard } from "@/components/task-card"
import { TaskStats } from "@/components/task-stats"
import { TaskForm } from "@/components/task-form"
import { TaskFilters, type FilterState } from "@/components/task-filters"
import { filterTasks } from "@/lib/filter-utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function TareasPage() {
  const { tasks } = useTasks()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    searchText: "",
    priority: "all",
    status: "all",
  })

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters)
  }, [tasks, filters])

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Tareas</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <TaskStats />

      <div className="mt-6">
        <TaskFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {filteredTasks.length === tasks.length
            ? `Todas las Tareas (${tasks.length})`
            : `Tareas Filtradas (${filteredTasks.length} de ${tasks.length})`}
        </h2>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>
              {tasks.length === 0
                ? "No hay tareas. ¡Crea tu primera tarea!"
                : "No se encontraron tareas con los filtros aplicados."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      <TaskForm open={showForm} onOpenChange={handleCloseForm} task={editingTask} />
    </div>
  )
}
