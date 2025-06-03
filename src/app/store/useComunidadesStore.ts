import { create } from "zustand";
import Swal from "sweetalert2";
import { EstadoGeneral } from "../types/enums";
import { Comunidad } from "../types/comunidades";

interface ComunidadesState {
  estados: { id: number; value: string; label: string }[];
  selectedRows: number[];
  selectAll: boolean;
  filtroEstado: string | null;
  selectedCommunity: Comunidad | null;

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
  downloadListado: () => void;
  crearNuevaComunidad: () => void;
  setSelectedCommunity: (comunidad: Comunidad | null) => void;

  // Actions para filtros
  clearSelection: () => void;
  setFiltroEstado: (estado: string | null) => void;
  getFilteredComunidades: (comunidades: any[]) => any[];
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

  // Filtrar comunidades por estado
  getFilteredComunidades: (comunidades: any[]) => {
    const { filtroEstado } = get();

    console.log("🔍 Filtrando comunidades:", {
      filtroEstado,
      totalComunidades: comunidades.length,
      primerasComunidades: comunidades
        .slice(0, 2)
        .map((c) => ({ id: c.com_id, status: c.com_status })),
    }); // Debug

    if (!filtroEstado) {
      // Si no hay filtro, devolver todas las comunidades
      console.log("✅ Sin filtro, devolviendo todas las comunidades");
      return comunidades;
    }

    // Filtrar por estado usando los valores exactos del enum
    const filtered = comunidades.filter((comunidad) => {
      var fixedFilter = "";
      if (filtroEstado === "ACTIVO") {
        fixedFilter = "Activo";
      } else if (filtroEstado === "INACTIVO") {
        fixedFilter = "Inactivo";
      }
      return comunidad.com_status === fixedFilter;
    });

    console.log("✅ Comunidades filtradas:", {
      filtroEstado,
      resultados: filtered.length,
      ejemplos: filtered
        .slice(0, 2)
        .map((c) => ({ id: c.com_id, status: c.com_status })),
    }); // Debug

    return filtered;
  },

  downloadListado: () => {
    console.log("Descargar listado de comunidades");
    // Aquí iría la lógica para descargar el listado
  },

  crearNuevaComunidad: () => {
    console.log("Crear nueva comunidad");
    // Aquí iría la lógica para crear una nueva comunidad
  },

  setSelectedCommunity: (comunidad: Comunidad | null) => {
    set({ selectedCommunity: comunidad });
  },
}));
