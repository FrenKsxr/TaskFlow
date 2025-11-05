import type React from "react"

export function ChartContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function ChartTooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ChartTooltipContent() {
  return null
}


