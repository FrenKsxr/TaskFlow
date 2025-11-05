import type React from "react"
import { createContext, useContext, useMemo } from "react"

interface SelectContextType {
  value: string
  onValueChange?: (value: string) => void
  items: Array<{ value: string; label: string }>
}

const SelectContext = createContext<SelectContextType | null>(null)

interface SelectProps {
  value: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  // Collect items from children
  const items: Array<{ value: string; label: string }> = []

  function collect(node: React.ReactNode): void {
    if (!node) return
    if (Array.isArray(node)) {
      node.forEach(collect)
      return
    }
    if (typeof node === "object" && (node as any).type?.displayName === "SelectItem") {
      const props = (node as any).props as { value: string; children: React.ReactNode }
      items.push({ value: props.value, label: String(props.children) })
    }
    if (typeof node === "object" && (node as any).props?.children) {
      collect((node as any).props.children)
    }
  }

  collect(children)

  const ctxValue = useMemo<SelectContextType>(() => ({ value, onValueChange, items }), [value, onValueChange, items.length])

  return <SelectContext.Provider value={ctxValue}>{children}</SelectContext.Provider>
}

export function SelectTrigger({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { id?: string }) {
  const ctx = useContext(SelectContext)!
  return (
    <div {...rest}>
      <select
        id={(rest as any).id}
        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
        value={ctx.value}
        onChange={(e) => ctx.onValueChange?.(e.target.value)}
      >
        {ctx.items.map((it) => (
          <option key={it.value} value={it.value}>
            {it.label}
          </option>
        ))}
      </select>
      {children}
    </div>
  )
}

export function SelectValue() {
  return null
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export function SelectItem(props: SelectItemProps) {
  return null
}

SelectItem.displayName = "SelectItem"


