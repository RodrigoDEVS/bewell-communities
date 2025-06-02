"use client";
import type { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
}

export default function Icon({ children }: IconProps) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
      {children}
    </span>
  );
}
