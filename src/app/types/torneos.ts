export interface TorneosData {
  id?: number;
  tipo:
    | "imagen"
    | "label"
    | "input"
    | "dropdown"
    | "checkbox"
    | "count"
    | "label"
    | "radio"
    | "medio_pago"
    | "button"
    | "carousel"
    | "card"
    | "switch"
    | "slider"
    | "calendar";
  texto?: string;
  estilo?: Estilo;
  imagenes?: Imagenes[];
  url?: string;
}

interface Imagenes {
  url: string;
  link?: string;
}

interface Estilo {
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}
