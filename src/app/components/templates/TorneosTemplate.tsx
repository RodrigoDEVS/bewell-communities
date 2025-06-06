"use client";
import SearchBar from "../molecules/SearchBar";
import ComunidadesToolbar from "../molecules/ComunidadesToolbar";
import ComunidadesTable from "../organisms/ComunidadesTable";
import TorneosComponents from "../organisms/TorneosComponents";
import TorneosPreview from "../organisms/TorneosPreview";
import { ComponentsPopUp } from "../organisms/torneos/ComponentsPopUp";
import { useState } from "react";
import { useTorneosStore } from "@/app/store/useTorneosStore";
import { TorneosData } from "@/app/types/torneos";

export default function TorneosTemplate() {
  const { addComponent } = useTorneosStore();

  const [showComponentsPopUp, setShowLabelPopUp] = useState<boolean>(false);
  const [componentType, setComponentType] =
    useState<TorneosData["tipo"]>("label");

  function handleOpenLabelPopUp(tipo: TorneosData["tipo"]) {
    setComponentType(tipo);
    setShowLabelPopUp(true);
  }

  function handleClosePopUp() {
    setShowLabelPopUp(false);
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="flex-shrink text-2xl font-bold mb-6 flex items-center text-red-600">
        <img src="/squares.png" alt="icono de cuadrados" className="mr-2" />
        Gestor de Torneos
      </h1>
      <div className="flex-1 flex gap-6 flex-row pb-12">
        <div className="flex-1">
          <TorneosComponents setLabelPopUpOpen={handleOpenLabelPopUp} />
        </div>
        <div className="flex-1">
          <TorneosPreview />
        </div>
      </div>
      <ComponentsPopUp
        isOpen={showComponentsPopUp}
        tipo={componentType}
        onClose={handleClosePopUp}
        onAdd={addComponent}
      />
    </div>
  );
}
