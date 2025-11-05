import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Layers, Zap } from "lucide-react";

export default function AcercaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Acerca de TaskFlow</h1>

      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">¿Qué es TaskFlow?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 leading-relaxed">
            TaskFlow es una aplicación de gestión de tareas que implementa el patrón de diseño Strategy para
            proporcionar diferentes formas de organizar y visualizar tus tareas. Permite crear, editar y eliminar tareas
            con diferentes niveles de prioridad y estados de progreso.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <Code2 className="h-8 w-8 text-indigo-400 mb-2" />
            <CardTitle className="text-lg text-white">Patrón Strategy</CardTitle>
            <CardDescription className="text-gray-400">
              Implementación del patrón de diseño para diferentes estrategias de ordenamiento
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <Layers className="h-8 w-8 text-indigo-400 mb-2" />
            <CardTitle className="text-lg text-white">Arquitectura Limpia</CardTitle>
            <CardDescription className="text-gray-400">
              Código organizado y mantenible con separación de responsabilidades
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <Zap className="h-8 w-8 text-indigo-400 mb-2" />
            <CardTitle className="text-lg text-white">Rendimiento</CardTitle>
            <CardDescription className="text-gray-400">
              Optimizado para una experiencia de usuario rápida y fluida
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Características Principales</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>Crear, editar y eliminar tareas con título, descripción y fecha límite</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>Asignar prioridades (Alta, Media, Baja) y estados (Pendiente, En Progreso, Completada)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>Aplicar diferentes estrategias de ordenamiento y filtrado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>Visualizar estadísticas y progreso con gráficos interactivos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>Modo claro y oscuro para mejor experiencia visual</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
