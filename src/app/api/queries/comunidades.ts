import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Comunidad,
  GetCommunitiesResponse,
} from "@/app/types/comunidades";
import { graphqlClient } from "@/app/config/graphql-client";

// Claves de consulta para React Query
export const queryKeys = {
  comunidades: ["comunidades"] as const,
  comunidad: (id: number) => ["comunidades", id] as const,
};

// Consulta GraphQL para obtener todas las comunidades
const GET_COMMUNITIES_QUERY = `
  query {
    getCommunities {
      com_id
      com_nombre
      com_descripcion
      com_img_url
      com_status
      com_url_video
      com_descripcion_corta
      ContenidoAdicionalComunidades{
        cac_id
        com_id
        cac_imr_url
        cac_titulo
        cac_subtitulo
        cac_url_contenido
        cac_url_info
        cac_estado
        cac_sucursal
      }
    }
  }
`;

// Función para obtener comunidades desde la API GraphQL
async function fetchComunidades(): Promise<Comunidad[]> {
  try {
    const data = await graphqlClient.query<GetCommunitiesResponse>(
      GET_COMMUNITIES_QUERY
    );
    return data.getCommunities;
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}

// Hook para obtener todas las comunidades
export function useComunidades() {
  return useQuery({
    queryKey: queryKeys.comunidades,
    queryFn: fetchComunidades,
  });
}

// Consulta GraphQL para obtener una comunidad por ID
const GET_COMMUNITY_BY_ID_QUERY = `
  query GetCommunity($id: Int!) {
    getCommunity(id: $id) {
      com_id
      com_nombre
      com_descripcion
      com_img_url
      com_status
      com_url_video
      com_descripcion_corta
    }
  }
`;

// Función para obtener una comunidad por ID
async function fetchComunidadById(id: number): Promise<Comunidad | null> {
  try {
    const data = await graphqlClient.query<{ getCommunity: Comunidad | null }>(
      GET_COMMUNITY_BY_ID_QUERY,
      { id }
    );
    return data.getCommunity;
  } catch (error) {
    console.error(`Error fetching community with ID ${id}:`, error);
    throw error;
  }
}

// Hook para obtener una comunidad por ID
export function useComunidad(id: number) {
  return useQuery({
    queryKey: queryKeys.comunidad(id),
    queryFn: () => fetchComunidadById(id),
    // Solo ejecutar la consulta si se proporciona un ID válido
    enabled: !!id,
  });
}

// Mutación GraphQL para crear una comunidad
const CREATE_COMMUNITY_MUTATION = `
  mutation CrearComunidad($input: CrearComunidadInput!) {
    createCommunity(comunidad: $input) {
      com_id
      com_nombre
      com_descripcion
      com_img_url
      com_status
      com_url_video
      com_descripcion_corta
      ContenidoAdicionalComunidades{
        cac_id
        com_id
        cac_imr_url
        cac_titulo
        cac_subtitulo
        cac_url_contenido
        cac_url_info
        cac_estado
        cac_sucursal
      }
    }
  }
`;

// Función para crear una comunidad
async function createComunidad(data: Comunidad): Promise<Comunidad> {
  try {
    // Separar el ID del resto de los datos
    const { com_id, ...comunidadData } = data;

    const response = await graphqlClient.query<{ createCommunity: Comunidad }>(
      CREATE_COMMUNITY_MUTATION,
      {
        input: comunidadData,
      }
    );
    return response.createCommunity;
  } catch (error) {
    console.error("Error creating community:", error);
    throw error;
  }
}

// Hook para crear una comunidad
export function useCreateComunidad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComunidad,
    // Invalidar la consulta de comunidades cuando se crea una nueva
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comunidades });
    },
  });
}

// Mutación GraphQL para editar una comunidad
const EDIT_COMMUNITY_MUTATION = `
  mutation ActualizarComunidad($comId: Int!, $input: ActualizarComunidadInput!) {
    updateCommunity(com_id: $comId, comunidad: $input) {
      com_id
      com_nombre
      com_descripcion
      com_img_url
      com_status
      com_url_video
      com_descripcion_corta
      ContenidoAdicionalComunidades{
        cac_id
        com_id
        cac_imr_url
        cac_titulo
        cac_subtitulo
        cac_url_contenido
        cac_url_info
        cac_estado
        cac_sucursal
      }
    }
  }
`;

// Función para editar una comunidad
async function updateCommunity(data: Comunidad): Promise<Comunidad> {
  try {
    // Separar el ID del resto de los datos
    const { com_id, ...comunidadData } = data;

    const response = await graphqlClient.query<{ updateCommunity: Comunidad }>(
      EDIT_COMMUNITY_MUTATION,
      {
        comId: com_id,
        input: comunidadData,
      }
    );
    return response.updateCommunity;
  } catch (error) {
    console.error("Error updatingCommunity community:", error);
    throw error;
  }
}

// Hook para editar una comunidad
export function useEditarComunidad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommunity,
    // Invalidar la consulta de comunidades cuando se edita
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comunidades });
    },
  });
}

// Mutación GraphQL para eliminar contenido adicional
const DELETE_COMMUNITY_CONTENT_MUTATION = `
  mutation EliminarContenidoComunidad($cacId: Int!) {
    deleteCommunityContentById(cac_id: $cacId) 
    }
`;

// Función para eliminar contenido adicional
async function deleteCommunityContentById(cacId: number): Promise<string> {
  try {
    const response = await graphqlClient.query<{
      deleteCommunityContentById: string;
    }>(DELETE_COMMUNITY_CONTENT_MUTATION, {
      cacId: cacId,
    });
    return response.deleteCommunityContentById;
  } catch (error) {
    console.error("Error deleting content:", error);
    throw error;
  }
}

// Hook para eliminar contenido adicional
export function useEliminarContenidoComunidad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommunityContentById,
    // Invalidar la consulta de comunidades cuando se elimina
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comunidades });
    },
  });
}
