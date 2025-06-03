import { create } from "zustand";
import Swal from "sweetalert2";
import { EstadoGeneral } from "../types/enums";
import { Comunidad } from "../types/comunidades";

// Agregar esta función helper al inicio del archivo, antes del create
const downloadCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.log("No hay datos para descargar");
    return;
  }

  // Definir las columnas que queremos en el CSV
  const headers = [
    "ID",
    "Nombre de la Comunidad",
    "Estado",
    "URL de Imagen",
    "Fecha de Creación",
  ];

  // Convertir los datos a formato CSV
  const csvContent = [
    // Encabezados
    headers.join(","),
    // Datos
    ...data.map((comunidad) =>
      [
        comunidad.com_id || "",
        `"${(comunidad.com_nombre || "").replace(/"/g, '""')}"`, // Escapar comillas
        comunidad.com_status || "",
        `"${(comunidad.com_img_url || "").replace(/"/g, '""')}"`, // Escapar comillas
        comunidad.com_fecha_creacion || "",
      ].join(",")
    ),
  ].join("\n");

  // Crear el blob y descargar
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

interface ComunidadesState {
  estados: { id: number; value: string; label: string }[];
  selectedRows: number[];
  selectAll: boolean;
  filtroEstado: string | null;
  selectedCommunity: Comunidad | null;
  searchTerm: string;

  // Acciones
  toggleSelectAll: (allIds?: number[]) => void;
  toggleSelectRow: (id: number) => void;
  editComunidad: (id: number) => void;
  editEstadoComunidades: (
    comunidades: number[],
    estado: "Activo" | "Inactivo"
  ) => void;
  downloadComunidad: (id: number) => void;
  deleteComunidades: (ids: number[]) => void;
  downloadListado: (comunidadesFiltradas: any[]) => void;
  crearNuevaComunidad: () => void;
  setSelectedCommunity: (comunidad: Comunidad | null) => void;

  // Actions para filtros
  clearSelection: () => void;
  setFiltroEstado: (estado: string | null) => void;
  getFilteredComunidades: (comunidades: any[]) => any[];

  // Acciones para búsqueda
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  clearAllFilters: () => void;
}

export const useComunidadesStore = create<ComunidadesState>((set, get) => ({
  estados: [
    { id: 1, value: EstadoGeneral.ACTIVO, label: "Activo" },
    { id: 2, value: EstadoGeneral.INACTIVO, label: "Inactivo" },
  ],
  selectedRows: [],
  selectAll: false,
  filtroEstado: null,
  selectedCommunity: null,
  searchTerm: "",

  toggleSelectAll: (allIds?: number[]) => {
    const { selectedRows, selectAll } = get();

    // Si no se pasan IDs, no podemos hacer nada
    if (!allIds || allIds.length === 0) {
      set({ selectedRows: [], selectAll: false });
      return;
    }

    // Verificar si todos los elementos están seleccionados
    const areAllSelected =
      allIds.length > 0 && allIds.every((id) => selectedRows.includes(id));

    if (areAllSelected) {
      // Si todos están seleccionados, deseleccionar todos
      set({
        selectedRows: [],
        selectAll: false,
      });
    } else {
      // Si no todos están seleccionados, seleccionar todos
      set({
        selectedRows: [...allIds],
        selectAll: true,
      });
    }
  },

  toggleSelectRow: (id: number) => {
    const { selectedRows } = get();
    if (selectedRows.includes(id)) {
      const newSelectedRows = selectedRows.filter((rowId) => rowId !== id);
      set({
        selectedRows: newSelectedRows,
        selectAll: false,
      });
    } else {
      const newSelectedRows = [...selectedRows, id];
      set({
        selectedRows: newSelectedRows,
        selectAll: false,
      });
    }
  },

  editComunidad: (id: number) => {
    console.log(`Editar comunidad con ID: ${id}`);
    // Aquí iría la lógica para editar una comunidad
  },

  editEstadoComunidades: (idList: number[], estado: "Activo" | "Inactivo") => {
    console.log(
      `Cambiar estado de comunidades ${idList.join(", ")} a ${estado}`
    );
  },

  downloadComunidad: (id: number) => {
    console.log(`Descargar información de comunidad con ID: ${id}`);
    // Aquí iría la lógica para descargar información de una comunidad
  },

  deleteComunidades: (ids: number[]) => {
    const buttons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-gray-400 hover:bg-gray-500 cursor-pointe text-white font-bold py-2 px-4 rounded-full mx-2",
        cancelButton:
          "bg-gray-400 hover:bg-gray-500 cursor-pointer text-white font-bold py-2 px-4 rounded-full mx-2",
      },
      buttonsStyling: false,
    });
    buttons
      .fire({
        title: '<span class="swal2-title-custom">Atención</span>',
        text: "¿Esta seguro que desea eliminar estas comunidades?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        iconColor: "#f44336",
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(`Eliminar comunidades con IDs: ${ids.join(", ")}`);
          // Esta función ahora debería llamar a una mutación de React Query
          // Después de eliminar, limpiar la selección
          set({
            selectedRows: [],
            selectAll: false,
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  },

  // Limpiar toda la selección
  clearSelection: () => {
    set({
      selectedRows: [],
      selectAll: false,
    });
  },

  // Establecer filtro por estado
  setFiltroEstado: (estado: string | null) => {
    set({ filtroEstado: estado });
    // Limpiar selección cuando se cambia el filtro
    set({ selectedRows: [], selectAll: false });
  },

  // 🔧 Función de filtrado con búsqueda
  getFilteredComunidades: (comunidades: Comunidad[]) => {
    const { filtroEstado, searchTerm } = get();

    console.log("🔍 Filtrando comunidades:", {
      filtroEstado,
      searchTerm,
      totalComunidades: comunidades.length,
    });

    let filtered = [...comunidades];

    // 🆕 Filtrar por término de búsqueda (nombre de comunidad)
    if (searchTerm.trim()) {
      filtered = filtered.filter((comunidad) =>
        comunidad.com_nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(
        `🔍 Filtrado por búsqueda "${searchTerm}": ${filtered.length} resultados`
      );
    }

    // Filtrar por estado
    if (filtroEstado) {
      filtered = filtered.filter((comunidad) => {
        if (filtroEstado === "ACTIVO") {
          return (
            comunidad.com_status === "ACTIVO" ||
            comunidad.com_status === "Activo"
          );
        } else if (filtroEstado === "INACTIVO") {
          return (
            comunidad.com_status === "INACTIVO" ||
            comunidad.com_status === "Inactivo"
          );
        } else if (filtroEstado === "Activo") {
          return (
            comunidad.com_status === "ACTIVO" ||
            comunidad.com_status === "Activo"
          );
        } else if (filtroEstado === "Inactivo") {
          return (
            comunidad.com_status === "INACTIVO" ||
            comunidad.com_status === "Inactivo"
          );
        }
        return true;
      });
      console.log(
        `🔍 Filtrado por estado "${filtroEstado}": ${filtered.length} resultados`
      );
    }

    console.log("✅ Resultado final del filtrado:", {
      filtroEstado,
      searchTerm,
      resultados: filtered.length,
      ejemplos: filtered.slice(0, 2).map((c) => ({
        id: c.com_id,
        nombre: c.com_nombre,
        status: c.com_status,
      })),
    });

    return filtered;
  },

  downloadListado: (comunidadesFiltradas: any[]) => {
    console.log("Descargando listado de comunidades filtradas...");

    if (!comunidadesFiltradas || comunidadesFiltradas.length === 0) {
      // Mostrar mensaje si no hay datos para descargar
      Swal.fire({
        title: "Sin datos",
        text: "No hay comunidades para descargar con los filtros actuales.",
        icon: "info",
        confirmButtonText: "Entendido",
        customClass: {
          confirmButton:
            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
      return;
    }

    // Generar nombre del archivo con fecha y hora
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, "");
    const filename = `comunidades_${timestamp}.csv`;

    // Descargar el CSV
    downloadCSV(comunidadesFiltradas, filename);

    // Mostrar mensaje de éxito
    Swal.fire({
      title: "¡Descarga exitosa!",
      text: `Se ha descargado el archivo ${filename} con ${comunidadesFiltradas.length} comunidades.`,
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  },

  crearNuevaComunidad: () => {
    console.log("Crear nueva comunidad");
    // Aquí iría la lógica para crear una nueva comunidad
  },

  setSelectedCommunity: (comunidad: Comunidad | null) => {
    set({ selectedCommunity: comunidad });
  },

  // Funciones para búsqueda
  setSearchTerm: (term: string) => {
    console.log("🔍 Estableciendo término de búsqueda:", term);
    set({ searchTerm: term });
    // Limpiar selección cuando se busca
    set({ selectedRows: [], selectAll: false });
  },

  clearSearch: () => {
    set({ searchTerm: "" });
    set({ selectedRows: [], selectAll: false });
  },

  clearAllFilters: () => {
    set({
      searchTerm: "",
      filtroEstado: null,
      selectedRows: [],
      selectAll: false,
    });
  },
}));
