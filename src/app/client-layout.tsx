"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/organisms/SideBar";
import AuthTemplate from "./components/templates/AuthTemplate";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Determinar si estamos en la página de login
  const isLoginPage = pathname === "/login";

  return (
    <AuthTemplate>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Renderizar el SideBar solo si estamos autenticados y no estamos en la página de login */}
        {isAuthenticated && !isLoginPage && <Sidebar key="sidebar" />}

        {/* Ajustar el contenido principal según si el SideBar está visible o no */}
        <div
          className={`flex-1 ${
            isAuthenticated && !isLoginPage ? "p-8" : "w-full"
          }`}
        >
          {children}
        </div>
      </div>
    </AuthTemplate>
  );
}
