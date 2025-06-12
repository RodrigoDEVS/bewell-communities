import React from "react";
import TorneosComponent from "../molecules/TorneosComponent";
import { TorneosData } from "@/app/types/torneos";
import Button from "../atoms/Button";

interface TorneosComponentsProps {
  setLabelPopUpOpen: (tipo: TorneosData["tipo"]) => void;
}

export default function TorneosComponents({
  setLabelPopUpOpen,
}: TorneosComponentsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-2 w-full h-full space-y-3 max-h-[calc(100vh-100px)] overflow-x-auto">
      <h1 className="text-xl font-bold">Componentes</h1>
      <TorneosComponent tipo="label" setPopUpOpen={setLabelPopUpOpen}>
        <span className="font-bold text-lg">Texto</span>
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
      <TorneosComponent tipo="divider" setPopUpOpen={setLabelPopUpOpen}>
        <div
          style={{ width: 300 }}
          className="border-b border-gray-300 my-2"
        ></div>
      </TorneosComponent>
      <TorneosComponent tipo="label_link" setPopUpOpen={setLabelPopUpOpen}>
        <span className="font text-lg text-blue-600 underline italic cursor-pointer">
          Link de Texto
        </span>
      </TorneosComponent>
      <TorneosComponent tipo="input" setPopUpOpen={setLabelPopUpOpen}>
        <input
          type="text"
          placeholder="Texto de entrada"
          className="border border-gray-300 rounded-md p-2 w-full h-[35px]"
          disabled
        />
      </TorneosComponent>
      <TorneosComponent tipo="checkbox" setPopUpOpen={setLabelPopUpOpen}>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="checkbox-example"
            className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
            checked
            onChange={() => {}}
          />
          <label htmlFor="checkbox-example" className="text-sm">
            Checkbox
          </label>
        </div>
      </TorneosComponent>
      <TorneosComponent tipo="medio_pago" setPopUpOpen={setLabelPopUpOpen}>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="checkbox-nomina"
            className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
            checked
            onChange={() => {}}
          />
          <label htmlFor="checkbox-nomina" className="text-sm">
            Nómina
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="checkbox-bewins"
            className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
            checked
            onChange={() => {}}
          />
          <label htmlFor="checkbox-bewins" className="text-sm">
            Bewins
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="checkbox-epayco"
            className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
            checked
            onChange={() => {}}
          />
          <label htmlFor="checkbox-epayco" className="text-sm">
            Epayco
          </label>
        </div>
      </TorneosComponent>
      <TorneosComponent tipo="button" setPopUpOpen={setLabelPopUpOpen}>
        <Button variant="rounded" size="medium">
          Botón
        </Button>
      </TorneosComponent>
      {/* <TorneosComponent tipo="switch" setPopUpOpen={setLabelPopUpOpen} />
      <TorneosComponent tipo="carousel" setPopUpOpen={setLabelPopUpOpen}>
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
      </TorneosComponent> */}
    </div>
  );
}
