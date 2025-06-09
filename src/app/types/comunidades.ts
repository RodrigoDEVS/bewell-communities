import { EstadoGeneral } from "./enums";

export interface Comunidad {
  com_id?: number | null;
  com_nombre: string;
  com_descripcion: string;
  com_img_url?: string;
  com_status: EstadoGeneral | string;
  com_url_video?: string;
  com_descripcion_corta?: string;
  ContenidoAdicionalComunidades?: ContenidoAdicionalComunidades[];
}

// Tipo para la respuesta de la consulta GraphQL
export interface GetCommunitiesResponse {
  getCommunities: Comunidad[];
}

export interface ContenidoAdicionalComunidades {
  cac_id?: number;
  com_id?: number;
  cac_imr_url?: string;
  cac_titulo?: string;
  cac_subtitulo?: string;
  cac_url_contenido?: string;
  cac_url_info?: string;
  cac_estado?: EstadoGeneral | string;
  cac_sucursal?: string;
}
