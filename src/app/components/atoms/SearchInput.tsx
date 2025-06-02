"use client";
import { Search } from "lucide-react";
export default function SearchInput() {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar..."
        className="pl-12 py-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
}
