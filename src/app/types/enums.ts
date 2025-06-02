// Enum que coincide con el backend
export enum EstadoGeneral {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

// Mapeo para mostrar valores legibles en la UI
export const EstadoGeneralLabels = {
  [EstadoGeneral.ACTIVO]: "Activo",
  [EstadoGeneral.INACTIVO]: "Inactivo",
} as const;

// Función para convertir de label a enum value
export const getEstadoGeneralFromLabel = (
  label: string
): EstadoGeneral | null => {
  const entry = Object.entries(EstadoGeneralLabels).find(
    ([_, value]) => value === label
  );
  return entry ? (entry[0] as EstadoGeneral) : null;
};

// Función para convertir de enum value a label
export const getEstadoGeneralLabel = (estado: EstadoGeneral): string => {
  return EstadoGeneralLabels[estado] || estado;
};

// Opciones para el Select component - CORREGIDO: id como number
export const estadoGeneralOptions = Object.entries(EstadoGeneralLabels).map(
  ([key, label], index) => ({
    id: index + 1, // Usar índice numérico
    value: key, // Usamos la clave del enum (ACTIVO, INACTIVO)
    label: label, // Mostramos el label legible (Activo, Inactivo)
  })
);

// Alternativa si necesitas mantener compatibilidad con el store existente
export const estadoGeneralOptionsCompatible = [
  { id: 1, value: EstadoGeneral.ACTIVO, label: "Activo" },
  { id: 2, value: EstadoGeneral.INACTIVO, label: "Inactivo" },
];
