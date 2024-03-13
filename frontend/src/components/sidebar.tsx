import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  UserSquare2,
  PlaneTakeoff,
  Settings,
  Smartphone,
  File,
} from "lucide-react";

import { UserNav } from "./user-nav";
import { useIsAuthenticated } from "@azure/msal-react";

const items = [
  {
    title: "Responsivas",
    to: "/responsives",
    icon: <File />,
  },
  {
    title: "Empleados",
    to: "/employees",
    icon: <UserSquare2 />,
  },
  {
    title: "Dispositivos",
    to: "/devices",
    icon: <Smartphone />,
  },
  {
    title: "Configuración",
    to: "/settings/general",
    icon: <Settings />,
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const isAuthenticated = useIsAuthenticated()

  console.log(isAuthenticated)

  if(!isAuthenticated) {
    navigate('/login')
    return 
  }

  return (
    <aside className="border-r-1 dark:bg-sidebar fixed flex h-full w-[248px] flex-col justify-between border bg-white py-[24px]">
      <div>
        <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          <PlaneTakeoff />
          <span className="ml-3 text-base font-semibold">Volaris</span>
        </div>
        <ul className="space-y-1 px-3">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ||
                    (pathname === "/new-responsive" &&
                      item.to === "/responsives") ||
                    (pathname.startsWith("/settings/") &&
                      item.to.startsWith("/settings"))
                    ? "dark:bg-primary [&>svg]:text-primary bg-zinc-50 text-gray-700 dark:[&>svg]:text-zinc-50"
                    : ""
                  }
                    dark:hover:bg-primary [&>svg]:hover:text-primary flex h-[42px] items-center rounded-lg px-[12px] py-[8px] font-medium text-gray-400 transition-all ease-in hover:bg-zinc-50 hover:text-gray-700 dark:text-zinc-50 [&>svg]:mr-5 [&>svg]:w-[20px] dark:[&>svg]:hover:text-zinc-50`
                }
                to={item.to}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-3">
        <UserNav />
      </div>
    </aside>
  );
};