import { useState } from "react";
import { useTasks } from "@/lib/task-context";
import { TaskCard } from "@/components/task-card";
import { StrategySelector } from "@/components/strategy-selector";
import { TaskSorter, availableStrategies, type TaskSortStrategy } from "@/lib/strategies";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Layers } from "lucide-react";

export default function EstrategiasPage() {
  const { tasks } = useTasks();
  const [sorter] = useState(() => new TaskSorter(availableStrategies[0]));
  const [currentStrategy, setCurrentStrategy] = useState<TaskSortStrategy>(availableStrategies[0]);

  const handleStrategyChange = (strategy: TaskSortStrategy) => {
    sorter.setStrategy(strategy);
    setCurrentStrategy(strategy);
  };

  const sortedTasks = sorter.sort(tasks);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-gray-200">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Estrategias de Organización</h1>
        <p className="text-gray-400">
          Implementación del patrón de diseño Strategy para ordenar tareas
        </p>
      </div>

      {/* Explicación y Beneficios */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-white">¿Qué es el Patrón Strategy?</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              El patrón Strategy es un patrón de diseño de comportamiento que permite definir una familia de algoritmos,
              encapsular cada uno de ellos y hacerlos intercambiables. Permite que el algoritmo varíe
              independientemente de los clientes que lo utilizan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>
                  <strong>Contexto:</strong> TaskSorter mantiene una referencia a una estrategia
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>
                  <strong>Estrategias:</strong> Diferentes algoritmos de ordenamiento (Prioridad, Fecha, Estado)
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>
                  <strong>Intercambiable:</strong> Puedes cambiar la estrategia en tiempo de ejecución
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-white">Beneficios</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">✓</span>
                <span>Código más limpio y mantenible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">✓</span>
                <span>Fácil agregar nuevas estrategias</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">✓</span>
                <span>Elimina condicionales complejos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">✓</span>
                <span>Cumple con Open/Closed Principle</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Selector de estrategia */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Selecciona una Estrategia</h2>
        <StrategySelector
          strategies={availableStrategies}
          currentStrategy={currentStrategy}
          onStrategyChange={handleStrategyChange}
        />
      </div>

      {/* Lista de tareas ordenadas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Tareas Ordenadas ({sortedTasks.length})
          </h2>
          <div className="text-sm text-gray-400">
            Estrategia activa:{" "}
            <span className="font-medium text-indigo-300">{currentStrategy.name}</span>
          </div>
        </div>

        {sortedTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No hay tareas para ordenar</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
