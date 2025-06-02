import { create } from "zustand";
import { EstadoGeneral } from "../types/enums";

interface FormData {
  titulo: string;
  descripcion: string;
  descripcionCorta: string;
  estado: string;
  imagen: string | null;
  videoUrl: string;
  videoEnabled: boolean;
  linksEnabled: boolean;
  retosEnabled: boolean;
  links: Array<{
    id: string;
    titulo: string;
    subtitulo: string;
    imagen: string;
    estado: EstadoGeneral | "";
    link: string;
  }>;
  retos: Array<{
    id: string;
    titulo: string;
    subtitulo: string;
    vigenciaInicio: string;
    vigenciaFin: string;
    mensaje: string;
    link: string;
  }>;
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
