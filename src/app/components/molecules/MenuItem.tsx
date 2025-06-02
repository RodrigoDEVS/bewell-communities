"use client";
import Link from "next/link";
import type { ReactNode } from "react";

interface MenuItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}

export default function MenuItem({
  href,
  icon,
  label,
  active = false,
}: MenuItemProps) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center px-4 py-3 hover:bg-gray-100 ${
          active ? "text-red-600 font-medium" : "text-gray-600"
        }`}
      >
        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
          {icon}
        </span>
        <span>{label}</span>
      </div>
    </Link>
  );
}
