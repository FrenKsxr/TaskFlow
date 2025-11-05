import { useTasks } from "@/lib/task-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, ListTodo, AlertCircle } from "lucide-react"

export function TaskStats() {
  const { tasks } = useTasks()

  const total = tasks.length
  const completed = tasks.filter((t) => t.status === "Completada").length
  const pending = tasks.filter((t) => t.status === "Pendiente").length
  const inProgress = tasks.filter((t) => t.status === "En Progreso").length
  const highPriority = tasks.filter((t) => t.priority === "Alta" && t.status !== "Completada").length

  const stats = [
    {
      title: "Total",
      value: total,
      icon: ListTodo,
      color: "text-primary",
    },
    {
      title: "Completadas",
      value: completed,
      icon: CheckCircle2,
      color: "text-status-completed",
    },
    {
      title: "En Progreso",
      value: inProgress,
      icon: Clock,
      color: "text-status-progress",
    },
    {
      title: "Alta Prioridad",
      value: highPriority,
      icon: AlertCircle,
      color: "text-priority-high",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
