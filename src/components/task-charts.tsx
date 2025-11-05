import { useTasks } from "@/lib/task-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function TaskCharts() {
  const { tasks } = useTasks()

  // Priority distribution data
  const priorityData = [
    {
      name: "Alta",
      value: tasks.filter((t) => t.priority === "Alta").length,
      fill: "hsl(var(--priority-high))",
    },
    {
      name: "Media",
      value: tasks.filter((t) => t.priority === "Media").length,
      fill: "hsl(var(--priority-medium))",
    },
    {
      name: "Baja",
      value: tasks.filter((t) => t.priority === "Baja").length,
      fill: "hsl(var(--priority-low))",
    },
  ]

  // Status distribution data
  const statusData = [
    {
      name: "Pendiente",
      value: tasks.filter((t) => t.status === "Pendiente").length,
      fill: "hsl(var(--status-pending))",
    },
    {
      name: "En Progreso",
      value: tasks.filter((t) => t.status === "En Progreso").length,
      fill: "hsl(var(--status-progress))",
    },
    {
      name: "Completada",
      value: tasks.filter((t) => t.status === "Completada").length,
      fill: "hsl(var(--status-completed))",
    },
  ]

  // Progress data
  const completed = tasks.filter((t) => t.status === "Completada").length
  const total = tasks.length
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

  const progressData = [
    { name: "Completadas", value: completed, fill: "hsl(var(--status-completed))" },
    { name: "Pendientes", value: total - completed, fill: "hsl(var(--muted))" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Prioridad</CardTitle>
          <CardDescription>Cantidad de tareas según su nivel de prioridad</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              Alta: { label: "Alta", color: "hsl(var(--priority-high))" },
              Media: { label: "Media", color: "hsl(var(--priority-medium))" },
              Baja: { label: "Baja", color: "hsl(var(--priority-low))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución por Estado</CardTitle>
          <CardDescription>Cantidad de tareas según su estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              Pendiente: { label: "Pendiente", color: "hsl(var(--status-pending))" },
              "En Progreso": { label: "En Progreso", color: "hsl(var(--status-progress))" },
              Completada: { label: "Completada", color: "hsl(var(--status-completed))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Progreso General</CardTitle>
          <CardDescription>Porcentaje de tareas completadas del total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">{progressPercentage}%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {completed} de {total} tareas completadas
                </p>
              </div>
              <div className="h-32 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-status-completed transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
