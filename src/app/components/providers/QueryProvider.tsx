"use client";

import type React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/app/config/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Esto asegura que los datos no se compartan entre diferentes usuarios y solicitudes
  const [queryClientInstance] = useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientInstance}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
