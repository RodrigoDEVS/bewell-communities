import { Plus, Trash2 } from "lucide-react";
import React from "react";
import Select from "../atoms/Select";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";

interface FormProps {
  formTitle?: string;
}

export default function LittleForm(props: FormProps) {
  const { estados } = useComunidadesStore();
  const { formTitle } = props;
  return (
    <div className="items-center justify-center flex">
      <div>
        <span className="font-medium">{formTitle}</span>
        <div className="bg-gray-300 rounded-xl">
          <div className="bg-white p-6 border border-gray-300 rounded-xl shadow-sm max-w-100 min-w-100">
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="titulo"
                >
                  Titulo
                </label>
                <input
                  id="titulo"
                  type="text"
                  name="titulo"
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2"
                />
                {/* Separador */}
                <hr className="border-gray-200 mt-2" />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="subtitulo"
                >
                  Subtitulo
                </label>
                <input
                  id="subtitulo"
                  type="text"
                  name="subtitulo"
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2"
                />
                {/* Separador */}
                <hr className="border-gray-200 mt-2" />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="imagen"
                >
                  Imagen
                </label>
                <input
                  id="imagen"
                  type="text"
                  name="imagen"
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2"
                />
                {/* Separador */}
                <hr className="border-gray-200 mt-2" />
              </div>
              {/* Estado */}
              <div>
                <label
                  htmlFor="estados"
                  className="text-sm mr-2 text-gray-700 font-medium"
                >
                  Estado:
                </label>
                <Select
                  options={estados}
                  customSize="small"
                  style={{ fontSize: 14 }}
                  onChange={(e) => {}}
                />
              </div>
              <div>
                {/* <div className="flex space-x-4">
                  <div>
                    <label
                      className="block text-gray-700 text-sm"
                      htmlFor="vigenciaInicio"
                    >
                      Fecha Inicio
                    </label>
                    <input
                      id="vigenciaInicio"
                      type="text"
                      name="vigenciaInicio"
                      className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm"
                      htmlFor="vigenciaFin"
                    >
                      Fecha Fin
                    </label>
                    <input
                      id="vigenciaFin"
                      type="text"
                      name="vigenciaFin"
                      className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2"
                    />
                  </div>
                </div> */}

                {/* Separador */}
                {/* <hr className="border-gray-200 mt-2" /> */}
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="link"
                >
                  Link
                </label>
                <input
                  id="link"
                  type="text"
                  name="link"
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2"
                />
                {/* Separador */}
                <hr className="border-gray-200 mt-2" />
              </div>
            </div>
          </div>
          <div className="flex p-2 items-center justify-center">
            <button
              type="button"
              onClick={() => {}}
              className="mr-6 w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors hover:cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              type="button"
              onClick={() => {}}
              className=" w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors hover:cursor-pointer"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
