"use client";
import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { filtroEstado, setFiltroEstado } = useComunidadesStore();

  // Usar los mismos valores que espera el filtro
  const filterOptions = [
    { value: "", label: "Todos los estados" }, // Valor vacío para "todos"
    { value: "ACTIVO", label: "Activo" }, // Valor del enum
    { value: "INACTIVO", label: "Inactivo" }, // Valor del enum
  ];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (value: string) => {
    // Si el valor es vacío, pasar null para mostrar todos
    setFiltroEstado(value === "" ? null : value);
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (filtroEstado) {
      // Encontrar el label correspondiente al valor seleccionado
      const selectedOption = filterOptions.find(
        (option) => option.value === filtroEstado
      );
      return selectedOption ? selectedOption.label : filtroEstado;
    }
    return "Filtros";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
          filtroEstado
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Filter className="w-4 h-4 mr-2" />
        {getButtonText()}
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            {filterOptions.map((option) => {
              // Comparar correctamente: si filtroEstado es null y option.value es "", están seleccionados
              const isSelected =
                (filtroEstado === null && option.value === "") ||
                filtroEstado === option.value;

              return (
                <button
                  key={option.value || "all"}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                    isSelected ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
