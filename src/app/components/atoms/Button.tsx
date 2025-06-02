"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "delete" | "delete-outline";
  size?: "small" | "medium" | "large";
}

export default function Button({
  children,
  variant = "outline",
  size = "medium",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`rounded-md cursor-pointer flex items-center space-x-2 ${
        size === "small"
          ? "px-4"
          : size === "medium"
          ? "px-4 py-1"
          : "px-4 py-2"
      } ${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : variant === "delete"
          ? "bg-red-500 text-white hover:bg-red-600"
          : variant === "delete-outline"
          ? "border border-red-500 text-red-500 hover:bg-red-100"
          : "border border-gray-300 text-gray-700"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
