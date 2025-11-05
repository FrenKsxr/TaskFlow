import { Link, useLocation } from "react-router-dom"
import { Moon, Sun, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"

export function Navbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/tareas", label: "Tareas" },
    { href: "/estrategias", label: "Estrategias" },
    { href: "/acerca", label: "Acerca de" },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <CheckSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TaskFlow</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button variant={pathname === item.href ? "secondary" : "ghost"} size="sm">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex md:hidden pb-3 gap-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="flex-1">
              <Button variant={pathname === item.href ? "secondary" : "ghost"} size="sm" className="w-full">
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
