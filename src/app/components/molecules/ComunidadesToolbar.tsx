import { CirclePlus, Download } from "lucide-react";
import React from "react";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";
import { useComunidades } from "@/app/api/queries/comunidades";
import { useRouter } from "next/navigation";

const ComunidadesToolbar = () => {
  // Obtenemos las comunidades usando React Query (solo para contar el total)
  const { data: comunidades } = useComunidades();
  const { selectedRows, estados, editEstadoComunidades, deleteComunidades } =
    useComunidadesStore();

  const router = useRouter();

  return (
    <div className="flex items-center justify-between space-x-4 p-4 ml-20">
      <>
        {selectedRows.length > 0 && (
          <div className="flex items-center space-x-4">
            <span className="font-semibold">
              {selectedRows.length} seleccionados
            </span>

            {/* Menú desplegable */}
            <Select
              options={estados}
              customSize="small"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") return;
                editEstadoComunidades(
                  selectedRows,
                  value as "Activo" | "Inactivo"
                );
              }}
            />

            {/* Botón de eliminar */}
            <Button
              variant="delete-outline"
              size="small"
              onClick={() => {
                deleteComunidades(selectedRows);
              }}
            >
              Desactivar
            </Button>
          </div>
        )}
      </>
      {selectedRows.length === 0 && <div className="flex-1" />}
      <div className="flex items-center space-x-4">
        {/* Botón de descargar */}
        <Button variant="outline" size="medium">
          <Download className="w-5 h-5" />
          <span>Descargar listado</span>
        </Button>

        {/* Botón nuevo */}
        <Button
          variant="delete-outline"
          size="medium"
          onClick={() => router.push("/contenido/comunidades/comunidades_form")}
        >
          <CirclePlus className="mr-2" />
          Nuevo
        </Button>
      </div>
    </div>
  );
};

export default ComunidadesToolbar;
