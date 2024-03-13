import { TitlePage } from "@/components"

import { SidebarNav } from "./components"
import { Outlet } from "react-router-dom"

const sidebarNavItems = [
  {
    title: "General",
    href: "/settings/general",
  },
  {
    title: "Responsivas",
    href: "/settings/responsives",
  },
]

export const Settings = () => {
  return (
    <div className='w-full'>
      <div className="hidden space-y-6 pb-16 md:block">
        <TitlePage title="Settings" subtitle="Manage your account settings and set e-mail preferences." />
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}