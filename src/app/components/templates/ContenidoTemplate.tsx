"use client";
import { type ReactNode } from "react";

interface ContenidoTemplateProps {
  children: ReactNode;
  title: string;
}

export default function ContenidoTemplate({
  children,
  title,
}: ContenidoTemplateProps) {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-red-600">
        <img src="/squares.png" alt="icono de cuadrados" />
        {title}
      </h1>
      {children}
    </div>
  );
}
