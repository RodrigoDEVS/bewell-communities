"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "delete" | "delete-outline" | "icon";
  size?: "small" | "medium" | "large" | "icon";
}

export default function Button({
  children,
  variant = "outline",
  size = "medium",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer flex items-center space-x-2 ${
        size === "small"
          ? "px-4"
          : size === "medium"
          ? "px-4 py-1"
          : size === "large"
          ? "px-4 py-2"
          : ""
      } ${
        variant === "primary"
          ? "rounded-md bg-blue-500 text-white hover:bg-blue-600"
          : variant === "delete"
          ? "rounded-md bg-red-500 text-white hover:bg-red-600"
          : variant === "delete-outline"
          ? "rounded-md border border-red-500 text-red-500 hover:bg-red-100"
          : variant === "icon"
          ? "w-8 h-8 bg-white border border-gray-300 rounded-full justify-center hover:bg-green-50 hover:border-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          : "rounded-md border border-gray-300 text-gray-700"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
