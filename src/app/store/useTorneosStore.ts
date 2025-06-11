import { create } from "zustand";
import { TorneosData } from "../types/torneos";

interface TorneosState {
  componentes: TorneosData[];

  // Acciones
  addComponent: (componente: TorneosData) => void;
  removeComponent: (index: number) => void;
}

export const useTorneosStore = create<TorneosState>((set, get) => ({
  componentes: [],

  addComponent: (componente) => {
    const newComponent: TorneosData = componente;
    //componente.id = generateId();
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
}));
