import type React from "react"

import { cn } from "@/lib/utils"

type Variant = "default" | "outline" | "ghost" | "secondary"
type Size = "sm" | "md" | "lg" | "icon"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

const variantClasses: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-input bg-transparent hover:bg-accent",
  ghost: "hover:bg-accent",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
}

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-6",
  icon: "h-10 w-10",
}

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  return <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props} />
}

export default Button


