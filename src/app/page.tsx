"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      // Verificar autenticación
      const isLoggedIn = await checkAuth();

      // Redirigir según el estado de autenticación
      if (isLoggedIn) {
        router.push("/contenido");
      } else {
        router.push("/login");
      }
    };

    init();
  }, [router, checkAuth, isAuthenticated]);

  // Mostrar un loader mientras se verifica la autenticación
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto" />
        <p className="mt-4 text-lg text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}
