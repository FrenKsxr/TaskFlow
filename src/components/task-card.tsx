import type { Task } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Check, Calendar, AlertCircle } from "lucide-react"
import { useTasks } from "@/lib/task-context"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, toggleTaskStatus } = useTasks()

  const priorityConfig = {
    Alta: {
      color: "bg-priority-high text-priority-high-foreground",
      icon: AlertCircle,
    },
    Media: {
      color: "bg-priority-medium text-priority-medium-foreground",
      icon: AlertCircle,
    },
    Baja: {
      color: "bg-priority-low text-priority-low-foreground",
      icon: AlertCircle,
    },
  }

  const statusConfig = {
    Pendiente: { color: "bg-muted text-muted-foreground", label: "Pendiente" },
    "En Progreso": { color: "bg-status-progress text-white", label: "En Progreso" },
    Completada: { color: "bg-status-completed text-white", label: "Completada" },
  }

  const priority = priorityConfig[task.priority]
  const status = statusConfig[task.status]

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== "Completada"

  return (
    <Card className={cn("transition-all hover:shadow-md", task.status === "Completada" && "opacity-75")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={priority.color}>{task.priority}</Badge>
              <Badge className={status.color}>{status.label}</Badge>
            </div>
            <CardTitle
              className={cn("text-xl mb-1", task.status === "Completada" && "line-through text-muted-foreground")}
            >
              {task.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">{task.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className={cn(isOverdue && "text-destructive font-medium")}>
              {new Date(task.deadline).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {isOverdue && (
              <Badge variant="destructive" className="text-xs">
                Vencida
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant={task.status === "Completada" ? "outline" : "default"}
            onClick={() => toggleTaskStatus(task.id)}
            className="flex-1"
          >
            <Check className="h-4 w-4 mr-1" />
            {task.status === "Completada" ? "Reabrir" : "Completar"}
          </Button>
          <Button size="sm" variant="outline" onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                deleteTask(task.id)
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
