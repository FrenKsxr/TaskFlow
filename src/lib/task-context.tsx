import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Task, Status } from "./types"
import { fetchTasks, createTask, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from "./api"

interface TaskContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  addTask: (task: Omit<Task, "id" | "createdAt">) => Promise<void>
  updateTask: (id: string, task: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTaskStatus: (id: string) => Promise<void>
  refreshTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await fetchTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar las tareas")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const refreshTasks = async () => {
    await loadTasks()
  }

  const addTask = async (task: Omit<Task, "id" | "createdAt">) => {
    try {
      setError(null)
      await createTask(task)
      await refreshTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la tarea")
      throw err
    }
  }

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      setError(null)
      await updateTaskApi(id, updatedTask)
      await refreshTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar la tarea")
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      setError(null)
      await deleteTaskApi(id)
      await refreshTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar la tarea")
      throw err
    }
  }

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const newStatus: Status = task.status === "Completada" ? "Pendiente" : "Completada"
    await updateTask(id, { status: newStatus })
  }

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask, toggleTaskStatus, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider")
  }
  return context
}
