"use client";

import React from "react";
import Button from "../atoms/Button";
import { Download } from "lucide-react";
import { useComunidadesFormStore } from "@/app/store/useComunidadFormStore";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";

interface ComunidadesFormHeaderProps {
  mode: "create" | "edit";
}

export default function ConmunidadesFormHeader({
  mode,
}: ComunidadesFormHeaderProps) {
  const { isSubmitting } = useComunidadesFormStore();
  const { selectedCommunity, downloadListado } = useComunidadesStore();

  const handleDownload = () => {
    downloadListado([selectedCommunity]);
  };
  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center text-red-600">
            <img src="/squares.png" alt="icono de cuadrados" className="mr-2" />
            Comunidades Bewell
          </h1>
        </div>
        <div className="flex space-x-4">
          {/* Botón de descargar */}
          {mode === "edit" && (
            <Button variant="outline" size="medium" onClick={handleDownload}>
              <Download className="w-5 h-5" />
              <span>Descargar información</span>
            </Button>
          )}

          {/* Botón nuevo */}
          <Button
            variant="primary"
            style={{ background: "red" }}
            size="medium"
            type="submit"
            form="form-comunidad"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
