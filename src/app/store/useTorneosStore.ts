import { create } from "zustand";
import { TorneosContainer, TorneosData } from "../types/torneos";
import { torneosService } from "../api/torneos/torneosService";

interface TorneosState {
  loading: boolean;
  error: string | null;
  torneo: TorneosContainer | null;
  componentes: TorneosData[];
  selectedComponent: TorneosData | null;
  selectedIndex: number | null;

  // Acciones
  addComponent: (componente: TorneosData) => void;
  removeComponent: (index: number) => void;
  getTorneoInfo: (id: string) => Promise<void>;
  updateTorneoComponents: (torneoId: string) => Promise<void>;
  setSelectedComponent: (index: number) => void;
  cleanSelectedComponent: () => void;
  updateSelectedComponent: (item: TorneosData) => void;
}

export const useTorneosStore = create<TorneosState>((set, get) => ({
  loading: false,
  error: null,
  torneo: null,
  componentes: [],
  selectedComponent: null,
  selectedIndex: null,

  addComponent: (componente) => {
    const newComponent: TorneosData = componente;
    set((state) => ({
      componentes: [...state.componentes, newComponent],
    }));
  },

  removeComponent: (index) => {
    set((state) => ({
      componentes: [
        ...state.componentes.filter((_, i) => i !== index),
        // Elimina el componente en el índice especificado
      ],
    }));
  },

  getTorneoInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await torneosService.getTorneoInfo(id);
      set({
        torneo: response,
        componentes: response.cas_contenido_pantalla,
        loading: false,
        error: null,
      });
      console.log("Torneo obtenido:", response);
    } catch (error) {
      console.error("Error al obtener la información del torneo:", error);
      set({
        loading: false,
        error: "Error al obtener la información del torneo",
      });
    }
  },

  updateTorneoComponents: async (torneoId) => {
    const { componentes } = get();
    set({ loading: true, error: null });
    try {
      const response = await torneosService.updateTorneoComponents(
        torneoId,
        componentes
      );
      set({
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: "Error al actualizar los componentes del torneo",
      });
    }
  },

  setSelectedComponent: (index) => {
    const { componentes } = get();
    set({ selectedComponent: componentes[index], selectedIndex: index });
  },

  cleanSelectedComponent: () => {
    set({ selectedComponent: null, selectedIndex: null });
  },

  updateSelectedComponent: (item: TorneosData) => {
    const { selectedComponent, componentes, selectedIndex } = get();
    const updatedComponents = [...componentes];
    if (selectedComponent && selectedIndex !== null) {
      updatedComponents[selectedIndex] = item;
      set({
        componentes: updatedComponents,
        selectedComponent: null,
        selectedIndex: null,
      });
    }
  },
}));
