import type React from "react"
import { useEffect } from "react"
import ReactDOM from "react-dom"

import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange?.(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onOpenChange])

  if (!open) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-100 animate-in fade-in duration-150"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-10 w-full max-w-lg opacity-100 animate-in fade-in-0 zoom-in-95 duration-150">
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-2xl",
        "ring-1 ring-black/5",
        className,
      )}
      {...props}
    />
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-4 border-b bg-card/60 backdrop-blur", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-4 flex justify-end gap-2 bg-card/60 backdrop-blur", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold tracking-tight", className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
}


