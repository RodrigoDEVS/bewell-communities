import { QueryClient } from "@tanstack/react-query";

// Crear una instancia del cliente de consulta
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configuración por defecto para todas las consultas
      refetchOnWindowFocus: false, // No volver a consultar cuando la ventana recupera el foco
      retry: 1, // Reintentar consultas fallidas una vez
      staleTime: 5 * 60 * 1000, // Datos considerados frescos durante 5 minutos
    },
  },
});
