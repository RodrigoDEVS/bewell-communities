"use client";
import SearchInput from "../atoms/SearchInput";
import Button from "../atoms/Button";
import { Filter, X } from "lucide-react";
import FilterDropdown from "../atoms/FilteredDropdown";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";

export default function SearchBar() {
  const { searchTerm, filtroEstado, clearAllFilters } = useComunidadesStore();

  // Verificar si hay filtros activos
  const hasActiveFilters = searchTerm.trim() || filtroEstado;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-6">
        <SearchInput />
        <FilterDropdown />
        {/* Botón para limpiar todos los filtros */}
        {hasActiveFilters && (
          <Button variant="outline" size="large" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>
      {/* Indicadores de filtros activos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Búsqueda: "{searchTerm}"
            </span>
          )}
          {filtroEstado && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Estado: {filtroEstado}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
