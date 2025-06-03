"use client";

import { Pencil, ImageIcon, Loader2 } from "lucide-react";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";
import { useComunidades } from "@/app/api/queries/comunidades";
import { useRouter } from "next/navigation";
import { Comunidad } from "@/app/types/comunidades";
import { useEffect, useMemo } from "react";

export default function ComunidadesTable() {
  const router = useRouter();
  // Obtenemos las comunidades usando React Query
  const { data: comunidades, isLoading, error } = useComunidades();

  // Accedemos al store de comunidades para las funciones de selección y acciones
  const {
    selectedRows,
    selectAll,
    filtroEstado,
    searchTerm,
    toggleSelectAll,
    toggleSelectRow,
    setSelectedCommunity,
    clearSelection,
    getFilteredComunidades,
  } = useComunidadesStore();

  // Filtrar comunidades usando la función del store
  const filteredComunidades = useMemo(() => {
    if (!comunidades) return [];
    return getFilteredComunidades(comunidades);
  }, [comunidades, getFilteredComunidades, filtroEstado, searchTerm]);

  // Limpiar selección cuando cambian las comunidades filtradas
  useEffect(() => {
    clearSelection();
  }, [filteredComunidades.length, clearSelection]);

  // Si está cargando, mostramos un spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Si hay un error, lo mostramos
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Error al cargar las comunidades: {(error as Error).message}
        </div>
      </div>
    );
  }

  // Si no hay comunidades, mostramos un mensaje
  if (!comunidades || comunidades.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No hay comunidades disponibles</div>
      </div>
    );
  }

  // Si no hay resultados después del filtrado
  if (filteredComunidades.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-center">
          <p>No se encontraron comunidades</p>
          {searchTerm && (
            <p className="text-sm mt-1">que contengan "{searchTerm}"</p>
          )}
          {filtroEstado && (
            <p className="text-sm mt-1">con estado "{filtroEstado}"</p>
          )}
          <p className="text-sm mt-2">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      </div>
    );
  }

  const handleEditComunidad = (comunidad: Comunidad) => {
    setSelectedCommunity(comunidad);
    router.push(`/contenido/comunidades/editar`);
  };

  // Obtener todos los IDs de las comunidades
  const allComunidadIds = filteredComunidades.map((c) => c.com_id!);

  const handleSelectAllChange = () => {
    toggleSelectAll(allComunidadIds);
  };

  return (
    <div className="space-y-4">
      {/* Header con información de selección */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedRows.length > 0 ? (
            <span>
              {selectedRows.length} de {filteredComunidades.length} comunidades
              seleccionadas
            </span>
          ) : (
            <span>
              {filteredComunidades.length} de {comunidades.length} comunidades
              {(searchTerm || filtroEstado) && " (filtradas)"}
            </span>
          )}
        </div>

        {selectedRows.length > 0 && (
          <button
            onClick={clearSelection}
            className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-md"
          >
            Limpiar selección
          </button>
        )}
      </div>

      <div className="max-h-[calc(100vh-360px)] overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left border-b-2 border-gray-800 sticky top-0 bg-white"
              >
                <div className="flex items-center ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b-2 border-gray-800 sticky top-0 bg-white"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b-2 border-gray-800 sticky top-0 bg-white"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b-2 border-gray-800 sticky top-0 bg-white"
              >
                Nombre Comunidad
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b-2 border-gray-800 sticky top-0 bg-white"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider border-b-2 border-gray-800 sticky top-0 bg-white"
              >
                Acciones
              </th>
              {/* <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider border-b-2 border-gray-800 sticky top-0 bg-white"
            ></th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComunidades.map((comunidad, index) => (
              <tr
                key={comunidad.com_id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectedRows.includes(comunidad.com_id!)}
                      onChange={() => toggleSelectRow(comunidad.com_id!)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comunidad.com_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-20 w-30 flex items-center justify-center bg-gray-100 overflow-hidden rounded-md border border-gray-200">
                    {comunidad.com_img_url !== "" ? (
                      <img
                        src={comunidad.com_img_url}
                        alt=""
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {/* Resaltar término de búsqueda */}
                  {searchTerm ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: comunidad.com_nombre.replace(
                          new RegExp(`(${searchTerm})`, "gi"),
                          '<mark class="bg-yellow-200">$1</mark>'
                        ),
                      }}
                    />
                  ) : (
                    comunidad.com_nombre
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 rounded-md ${
                      comunidad.com_status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-(--brown-light) text-(--brown-dark)"
                    }`}
                  >
                    {comunidad.com_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditComunidad(comunidad)}
                    className="text-gray-400 hover:text-gray-600 inline-flex items-center"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Editar
                  </button>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <IconButton onClick={() => downloadComunidad(comunidad.com_id)}>
                  <Download className="h-5 w-5" />
                </IconButton>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
