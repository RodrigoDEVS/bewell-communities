"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import Logo from "../atoms/Logo";
import MenuItem from "../molecules/MenuItem";
import {
  User,
  LayoutGrid,
  BarChart2,
  Bell,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <Logo />

      <div className="flex-1 overflow-y-auto">
        <MenuItem
          href="/usuarios"
          icon={<User className="w-5 h-5" />}
          label="Usuarios"
          active={pathname === "/usuarios"}
        />
        <MenuItem
          href="/contenido"
          icon={<LayoutGrid className="w-5 h-5" />}
          label="Administrar contenido"
          active={pathname === "/contenido"}
        />
        <MenuItem
          href="/bewins"
          icon={<Settings className="w-5 h-5" />}
          label="Administrador de BeWins"
          active={pathname === "/bewins"}
        />
        <MenuItem
          href="/estadisticas"
          icon={<BarChart2 className="w-5 h-5" />}
          label="Estadísticas"
          active={pathname === "/estadisticas"}
        />
        <MenuItem
          href="/notificaciones"
          icon={<Bell className="w-5 h-5" />}
          label="Notificaciones"
          active={pathname === "/notificaciones"}
        />
        <MenuItem
          href="/eventos"
          icon={<Calendar className="w-5 h-5" />}
          label="Eventos"
          active={pathname === "/eventos"}
        />
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 border-t flex items-center">
        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center mr-3">
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="text-sm text-gray-600 truncate">
          {user?.email || "Usuario"}
        </div>
      </div>
    </div>
  );
}
