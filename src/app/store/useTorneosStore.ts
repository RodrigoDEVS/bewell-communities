import { create } from "zustand";
import { TorneosContainer, TorneosData } from "../types/torneos";
import { torneosService } from "../api/torneos/torneosService";

interface TorneosState {
  loading: boolean;
  error: string | null;
  torneo: TorneosContainer | null;
  componentes: TorneosData[];

  // Acciones
  addComponent: (componente: TorneosData) => void;
  removeComponent: (index: number) => void;
  crearTorneo: () => Promise<void>;
  getTorneoInfo: (id: string) => Promise<void>;
}

export const useTorneosStore = create<TorneosState>((set, get) => ({
  loading: false,
  error: null,
  torneo: null, // Inicialmente no hay torneo cargado
  // torneo: {
  //   ser_id: 97,
  //   cas_id: 97,
  //   cas_img_url: "https://example.com/image.png",
  //   cas_titulo: "Título de ejemplo",
  //   cas_subtitulo: "Subtítulo de ejemplo",
  //   cas_url_contenido: "https://example.com/content",
  //   cas_url_info: "ejemplo",
  //   cas_fecha_inicio: null,
  //   cas_fecha_fin: null,
  //   cas_estado: "Activo",
  //   cas_tipo: "page",
  //   cas_contenido_pantalla: [],
  // },
  componentes: [],

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

  crearTorneo: async () => {
    const { componentes, torneo } = get();
    if (torneo) {
      const updatedTorneo: TorneosContainer = {
        ...torneo,
        cas_contenido_pantalla: componentes,
      };
      set({ torneo: updatedTorneo });
      console.log(JSON.stringify(updatedTorneo));
    } else {
      console.error("No hay torneo cargado para crear.");
    }
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
}));
