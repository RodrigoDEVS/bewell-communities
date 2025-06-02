"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Loader2 } from "lucide-react";

interface AuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setChecking(true);
      // Intentar login automático
      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) {
        // Si no hay sesión activa, redirigir al login
        router.push("/login");
      }
      setChecking(false);
    };

    initAuth();
  }, [checkAuth, router]);

  // Mientras verificamos la autenticación, mostramos un loader
  if (checking || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostramos el contenido
  return <>{children}</>;
}
