export interface TorneosContainer {
  ser_id: number;
  cas_id: number;
  cas_img_url: string;
  cas_titulo: string;
  cas_subtitulo: string;
  cas_url_contenido: string;
  cas_url_info: string;
  cas_fecha_inicio: string | null;
  cas_fecha_fin: string | null;
  cas_estado: string;
  cas_tipo: string;
  cas_contenido_pantalla: TorneosData[];
}

export interface TorneosData {
  id?: string;
  tipo:
    | "imagen"
    | "label"
    | "label_link"
    | "divider"
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
  label?: string;
  url?: string;
  inputType?: string;
  placeholder?: string;
  requerido?: boolean;
  accion?: Accion;
  max_bewins?: number;
  valor_unitario?: number;
  valor_en_pesos?: number;
  consideraciones?: string;
}

interface Imagenes {
  url: string;
  link?: string;
}

interface Estilo {
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  alineacion?: "left" | "centro" | "right" | "justify";
  width?: number;
  height?: number;
  borderRadius?: number;
}

interface Accion {
  tipo?: string;
  ruta?: string;
}
