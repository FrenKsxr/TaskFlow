import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, ListTodo, Filter, BarChart3 } from "lucide-react"
import { TaskCharts } from "@/components/task-charts"
import { TaskStats } from "@/components/task-stats"
import { useTasks } from "@/lib/task-context"

export default function HomePage() {
  const { tasks } = useTasks()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-background to-muted/20 border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <CheckSquare className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 text-balance">Bienvenido a TaskFlow</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Sistema inteligente de gestión de tareas con implementación del patrón Strategy
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link to="/tareas">
                <Button size="lg">Ver Tareas</Button>
              </Link>
              <Link to="/estrategias">
                <Button size="lg" variant="outline">
                  Explorar Estrategias
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {tasks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Resumen de Tareas</h2>
            <TaskStats />
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Análisis Visual</h2>
            <TaskCharts />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6">Características</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <ListTodo className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Gestión de Tareas</CardTitle>
                <CardDescription>Crea, edita y organiza tus tareas con facilidad</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Filter className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Patrón Strategy</CardTitle>
                <CardDescription>Aplica diferentes estrategias de ordenamiento y filtrado</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Indicadores Visuales</CardTitle>
                <CardDescription>Visualiza tu progreso con gráficos y estadísticas</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckSquare className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Prioridades</CardTitle>
                <CardDescription>Organiza por prioridad: Alta, Media o Baja</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
