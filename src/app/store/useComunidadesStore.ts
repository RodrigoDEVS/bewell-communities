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
  toggleSelectAll: () => void;
  toggleSelectRow: (id: number) => void;
  editComunidad: (id: number) => void;
  editEstadoComunidades: (
    comunidades: number[],
    estado: "Activo" | "Inactivo"
  ) => void;
  downloadComunidad: (id: number) => void;
  deleteComunidades: (ids: number[]) => void;
  setFiltroEstado: (estado: string | null) => void;
  downloadListado: () => void;
  crearNuevaComunidad: () => void;
  setSelectedCommunity: (comunidad: Comunidad | null) => void;
}

export const useComunidadesStore = create<ComunidadesState>((set, get) => ({
  estados: [
    { id: 1, value: EstadoGeneral.ACTIVO, label: "Activo" },
    { id: 2, value: EstadoGeneral.INACTIVO, label: "Inactivo" },
  ],
  selectedRows: [],
  selectAll: false,
  filtroEstado: null,

  toggleSelectAll: () => {
    const { selectAll } = get();
    set({ selectedRows: [], selectAll: true });
  },
  selectedCommunity: null,

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

  setFiltroEstado: (estado: string | null) => {
    set({ filtroEstado: estado });
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
