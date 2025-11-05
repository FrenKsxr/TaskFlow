import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { TaskSortStrategy } from "@/lib/strategies"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StrategySelectorProps {
  strategies: TaskSortStrategy[]
  currentStrategy: TaskSortStrategy
  onStrategyChange: (strategy: TaskSortStrategy) => void
}

export function StrategySelector({ strategies, currentStrategy, onStrategyChange }: StrategySelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {strategies.map((strategy) => {
        const isActive = strategy.name === currentStrategy.name

        return (
          <Card
            key={strategy.name}
            className={cn("cursor-pointer transition-all hover:shadow-md", isActive && "ring-2 ring-primary")}
            onClick={() => onStrategyChange(strategy)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{strategy.name}</CardTitle>
                  <CardDescription className="mt-2">{strategy.description}</CardDescription>
                </div>
                {isActive && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant={isActive ? "default" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onStrategyChange(strategy)
                }}
              >
                {isActive ? "Estrategia Activa" : "Aplicar Estrategia"}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}