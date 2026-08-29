import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  LogOut,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Sidebar = () => {
  
  const {user,logout} = useAuthContext();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      name: "Incomes",
      path: "/incomes",
      icon: TrendingUp,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: TrendingDown,
    },
  ];

  return (
    <aside
      className="
  fixed
  left-0
  top-0
  hidden
  h-screen
  w-[260px]
  shrink-0
  flex-col
  bg-[#111827]
  p-5
  text-white
  lg:flex
"
    >
      {/* Logo */}
      <div className="mb-12 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a3e635] text-[#111827]">
          <Wallet size={21} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide">FINANCE</h1>

          <p className="text-[10px] tracking-[3px] text-slate-400">OS</p>
        </div>
      </div>

      {/* Menu */}
      <div className="mb-3 px-3 text-[10px] font-semibold tracking-[2px] text-slate-500">
        WORKSPACE
      </div>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#a3e635] text-[#111827]"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />

              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="mb-5 border-t border-slate-800" />

        <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-800 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a3e635] text-sm font-bold text-[#111827]">
            JD
          </div>

          <div>
            <p className="text-sm font-semibold">{user?.name}</p>

            <p className="text-xs text-slate-500">Personal</p>
          </div>
        </div>

        <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
