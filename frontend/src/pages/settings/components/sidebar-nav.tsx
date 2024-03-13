import { NavLink } from "react-router-dom"
import { buttonVariants } from "@/components"
import { cn } from "@/lib/utils"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => cn(
            buttonVariants({ variant: "ghost" }),
            isActive ? "bg-accent text-accent-foreground" : "",
            "justify-start font-semibold border border-background"
          )}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}