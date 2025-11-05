import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Task, Status } from "./types"

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implementar autenticación",
    description: "Crear sistema de login y registro de usuarios",
    deadline: "2025-01-15",
    priority: "Alta",
    status: "En Progreso",
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Diseñar base de datos",
    description: "Crear esquema de base de datos para el proyecto",
    deadline: "2025-01-20",
    priority: "Alta",
    status: "Completada",
    createdAt: "2025-01-02T14:30:00Z",
  },
  {
    id: "3",
    title: "Documentar API",
    description: "Escribir documentación completa de endpoints",
    deadline: "2025-02-01",
    priority: "Media",
    status: "Pendiente",
    createdAt: "2025-01-03T09:15:00Z",
  },
  {
    id: "4",
    title: "Optimizar rendimiento",
    description: "Mejorar tiempos de carga de la aplicación",
    deadline: "2025-02-15",
    priority: "Baja",
    status: "Pendiente",
    createdAt: "2025-01-04T16:45:00Z",
  },
  {
    id: "5",
    title: "Pruebas unitarias",
    description: "Implementar suite completa de tests",
    deadline: "2025-01-25",
    priority: "Media",
    status: "En Progreso",
    createdAt: "2025-01-05T11:20:00Z",
  },
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("taskflow-tasks")
    if (stored) {
      setTasks(JSON.parse(stored))
    } else {
      setTasks(initialTasks)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const newStatus: Status = task.status === "Completada" ? "Pendiente" : "Completada"
          return { ...task, status: newStatus }
        }
        return task
      }),
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskStatus }}>
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
