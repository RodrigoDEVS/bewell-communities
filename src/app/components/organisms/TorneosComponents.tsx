import React from "react";
import TorneosComponent from "../molecules/TorneosComponent";
import { TorneosData } from "@/app/types/torneos";

interface TorneosComponentsProps {
  setLabelPopUpOpen: (tipo: TorneosData["tipo"]) => void;
}

export default function TorneosComponents({
  setLabelPopUpOpen,
}: TorneosComponentsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full h-full space-y-3 max-h-[calc(100vh-100px)] overflow-x-auto">
      <h1 className="text-xl font-bold">Componentes</h1>
      <TorneosComponent tipo="label" setPopUpOpen={setLabelPopUpOpen}>
        <span className="font-bold text-lg">Titulo</span>
      </TorneosComponent>
      <TorneosComponent tipo="imagen" setPopUpOpen={setLabelPopUpOpen}>
        <div className="overflow-hidden rounded-lg">
          <img
            className="h-30 w-48 object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/bewell-desarrollo.appspot.com/o/2.%20Imagen%20principal%20dentro%20del%20servicio%20Claro%20Telefoni%CC%81a.png?alt=media&token=1ca482e8-2a10-49a6-ae43-5302181b80e4"
            alt=""
          />
        </div>
      </TorneosComponent>
      <TorneosComponent tipo="switch" setPopUpOpen={setLabelPopUpOpen} />
      <TorneosComponent tipo="button" setPopUpOpen={setLabelPopUpOpen} />
      <TorneosComponent
        tipo="carousel"
        url="https://firebasestorage.googleapis.com/v0/b/bewell-desarrollo.appspot.com/o/2.%20Imagen%20principal%20dentro%20del%20servicio%20Claro%20Telefoni%CC%81a.png?alt=media&token=1ca482e8-2a10-49a6-ae43-5302181b80e4"
        setPopUpOpen={setLabelPopUpOpen}
      >
        <div className="overflow-hidden rounded-lg flex space-x-2">
          <div className="overflow-hidden rounded-lg">
            <img
              className="h-30 w-48 object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/bewell-desarrollo.appspot.com/o/2.%20Imagen%20principal%20dentro%20del%20servicio%20Claro%20Telefoni%CC%81a.png?alt=media&token=1ca482e8-2a10-49a6-ae43-5302181b80e4"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              className="h-30 w-48 object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/bewell-desarrollo.appspot.com/o/2.%20Imagen%20principal%20dentro%20del%20servicio%20Claro%20Telefoni%CC%81a.png?alt=media&token=1ca482e8-2a10-49a6-ae43-5302181b80e4"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              className="h-30 w-48 object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/bewell-desarrollo.appspot.com/o/2.%20Imagen%20principal%20dentro%20del%20servicio%20Claro%20Telefoni%CC%81a.png?alt=media&token=1ca482e8-2a10-49a6-ae43-5302181b80e4"
              alt=""
            />
          </div>
        </div>
      </TorneosComponent>
    </div>
  );
}
