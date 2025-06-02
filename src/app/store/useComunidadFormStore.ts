import { create } from "zustand";
import { EstadoGeneral } from "../types/enums";

interface FormData {
  titulo: string;
  descripcion: string;
  descripcionCorta: string;
  estado: EstadoGeneral | "";
  imagen: string | null;
  videoUrl: string;
  videoEnabled: boolean;
  linksEnabled: boolean;
  retosEnabled: boolean;
  links: LinkData[];
  retos: RetoData[];
}

interface LinkData {
  id?: string;
  titulo: string;
  subtitulo: string;
  imagen: string;
  estado: EstadoGeneral | "";
  link: string;
}

interface RetoData {
  id: string;
  titulo: string;
  subtitulo: string;
  vigenciaInicio: string;
  vigenciaFin: string;
  mensaje: string;
  link: string;
}

interface FormErrors {
  titulo?: string;
  descripcion?: string;
  imagen?: string;
  estado?: string;
}

interface ComunidadesFormStore {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;

  // Actions
  updateField: (field: keyof FormData, value: any) => void;
  setError: (field: keyof FormErrors, error: string | undefined) => void;
  setErrors: (errors: FormErrors) => void;
  clearErrors: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;

  // Links management
  addLink: () => void;
  updateLink: (id: string, data: Partial<LinkData>) => void;
  removeLink: (id: string) => void;

  // Retos management
  addReto: () => void;
  updateReto: (id: string, data: Partial<RetoData>) => void;
  removeReto: (id: string) => void;

  // Validation
  validateForm: () => boolean;
}

const initialFormData: FormData = {
  titulo: "",
  descripcion: "",
  descripcionCorta: "",
  estado: "",
  imagen: null,
  videoUrl: "",
  videoEnabled: true,
  linksEnabled: true,
  retosEnabled: false,
  links: [],
  retos: [],
};

export const useComunidadesFormStore = create<ComunidadesFormStore>(
  (set, get) => ({
    formData: initialFormData,
    errors: {},
    isSubmitting: false,

    updateField: (field, value) => {
      set((state) => ({
        formData: { ...state.formData, [field]: value },
      }));
    },

    setError: (field, error) => {
      set((state) => ({
        errors: { ...state.errors, [field]: error },
      }));
    },

    setErrors: (errors) => {
      set({ errors });
    },

    clearErrors: () => {
      set({ errors: {} });
    },

    setSubmitting: (isSubmitting) => {
      set({ isSubmitting });
    },

    resetForm: () => {
      set({
        formData: initialFormData,
        errors: {},
        isSubmitting: false,
      });
    },

    // Links management
    addLink: () => {
      const newLink: LinkData = {
        id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        titulo: "",
        subtitulo: "",
        imagen: "",
        estado: "",
        link: "",
      };
      set((state) => ({
        formData: {
          ...state.formData,
          links: [...state.formData.links, newLink],
        },
      }));
    },

    updateLink: (id, data) => {
      set((state) => ({
        formData: {
          ...state.formData,
          links: state.formData.links.map((link) =>
            link.id === id ? { ...link, ...data } : link
          ),
        },
      }));
    },

    removeLink: (id) => {
      set((state) => ({
        formData: {
          ...state.formData,
          links: state.formData.links.filter((link) => link.id !== id),
        },
      }));
    },

    // Retos management
    addReto: () => {
      const newReto: RetoData = {
        id: `reto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        titulo: "",
        subtitulo: "",
        vigenciaInicio: "",
        vigenciaFin: "",
        mensaje: "",
        link: "",
      };
      set((state) => ({
        formData: {
          ...state.formData,
          retos: [...state.formData.retos, newReto],
        },
      }));
    },

    updateReto: (id, data) => {
      set((state) => ({
        formData: {
          ...state.formData,
          retos: state.formData.retos.map((reto) =>
            reto.id === id ? { ...reto, ...data } : reto
          ),
        },
      }));
    },

    removeReto: (id) => {
      set((state) => ({
        formData: {
          ...state.formData,
          retos: state.formData.retos.filter((reto) => reto.id !== id),
        },
      }));
    },

    validateForm: () => {
      const { formData } = get();
      const newErrors: FormErrors = {};

      if (!formData.titulo.trim()) {
        newErrors.titulo = "El título es obligatorio";
      }

      if (!formData.descripcion.trim()) {
        newErrors.descripcion = "La descripción es obligatoria";
      }

      if (!formData.imagen) {
        newErrors.imagen = "La imagen es obligatoria";
      }
      if (!formData.estado.trim()) {
        newErrors.estado = "El estado es obligatorio";
      }

      set({ errors: newErrors });
      return Object.keys(newErrors).length === 0;
    },
  })
);
