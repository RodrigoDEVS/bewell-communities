import { create } from "zustand";
import { TorneosData } from "../types/torneos";

interface TorneosState {
  componentes: TorneosData[];

  // Acciones
  addComponent: (componente: TorneosData) => void;
  //removeComponent: (id: number) => void;
}

// Función para generar IDs únicos
//const generateId = () => Math.random();

export const useTorneosStore = create<TorneosState>((set, get) => ({
  componentes: [],

  addComponent: (componente) => {
    const newComponent: TorneosData = componente;
    //componente.id = generateId();
    set((state) => ({
      componentes: [...state.componentes, newComponent],
    }));
  },

  // removeComponent: (id) => {
  //   set((state) => ({
  //     componentes: [
  //       ...state.componentes.filter((element) => element.id !== id),
  //     ],
  //   }));
  // },
}));
