import { useTorneosStore } from "@/app/store/useTorneosStore";
import React from "react";
import Button from "../atoms/Button";
import ImageCarousel from "../molecules/ImageCarousel";
import { Loader2, Trash2 } from "lucide-react";
import Select from "../atoms/Select";
import { TorneosData } from "@/app/types/torneos";

interface TorneosPreviewProps {
  onClick: () => void;
}

export default function TorneosPreview({ onClick }: TorneosPreviewProps) {
  const {
    componentes,
    loading,
    removeComponent,
    updateTorneoComponents,
    setSelectedComponent,
  } = useTorneosStore();

  const onSubmit = () => {
    updateTorneoComponents("B11DbzFQsO");
  };

  // Función para eliminar un componente por índice
  const handleDeleteComponent = (indexToDelete: number) => {
    removeComponent(indexToDelete);
  };

  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-2 w-full h-full max-h-[calc(100vh-100px)] items-center flex flex-col">
      <div className="flex items-center justify-center w-full space-x-20 mb-2">
        <h1 className="text-xl font-bold">Preview</h1>
        <Button variant="primary" size="medium" onClick={onSubmit}>
          Guardar
        </Button>
      </div>
      {/* Dispositivo Simulador */}
      <div className="bg-gray-200 rounded-3xl shadow-2xl p-4 w-[375px] h-[667px] overflow-hidden border border-gray-300 relative">
        <div className="border bg-white overflow-y-auto h-[calc(100%-20px)] p-2 rounded-lg border-gray-300 space-y-2">
          {
            // Si está cargando, mostramos un spinner
            loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              componentes.map((item, index) => {
                const generateId = () => Math.random();
                const key = `${item.tipo}-${generateId()}`;

                return (
                  <div
                    key={key}
                    className="relative group items-center justify-center flex flex-col space-y-2"
                    onClick={() => {
                      setSelectedComponent(index);
                      onClick();
                    }}
                  >
                    <button
                      className="absolute -top-2 -right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                      aria-label="delete-component"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteComponent(index);
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                    {(() => {
                      if (item.tipo === "label") {
                        return item.estilo?.fontSize === 22.0 ? (
                          <div
                            className="flex items-center justify-center font-bold text-xl"
                            key={key}
                          >
                            {item.texto}
                          </div>
                        ) : item.estilo?.fontSize === 20.0 ? (
                          <div
                            className="flex items-center justify-center font-bold text-lg"
                            key={key}
                          >
                            {item.texto}
                          </div>
                        ) : item.estilo?.fontSize === 17.0 ? (
                          <div
                            className="flex items-center justify-center font-bold text-base"
                            key={key}
                          >
                            {item.texto}
                          </div>
                        ) : (
                          <div
                            className="flex items-center text-center text-sm"
                            key={key}
                          >
                            {item.texto}
                          </div>
                        );
                      }

                      if (item.tipo === "imagen") {
                        return (
                          <div
                            className="overflow-hidden rounded-lg h-[240px] w-[310px]"
                            key={key}
                          >
                            <img
                              className="h-full w-full object-cover"
                              src={item.url}
                              alt=""
                            />
                          </div>
                        );
                      }

                      if (item.tipo === "divider") {
                        return (
                          <div
                            className="border-b border-gray-300 my-2 w-full"
                            key={key}
                          ></div>
                        );
                      }

                      if (item.tipo === "label_link") {
                        return (
                          <div
                            className="flex items-center justify-center text-md underline italic text-blue-600 cursor-pointer"
                            key={key}
                          >
                            {item.label}
                          </div>
                        );
                      }

                      if (item.tipo === "input") {
                        return (
                          <div className="relative w-full" key={key}>
                            <input
                              id={`input-${index}`}
                              type="text"
                              aria-label="input-label"
                              placeholder=" "
                              className="border border-gray-300 rounded-lg p-2 w-full peer"
                            />
                            <label
                              htmlFor={`input-${index}`}
                              className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all duration-200"
                              style={{ pointerEvents: "none" }}
                            >
                              {item.label || "Campo"}
                            </label>
                          </div>
                        );
                      }

                      if (item.tipo === "checkbox") {
                        return (
                          <div className="flex  space-x-2" key={key}>
                            <input
                              type="checkbox"
                              id={`checkbox-${index}`}
                              className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 accent-red-500"
                            />
                            <label
                              htmlFor={`checkbox-${index}`}
                              className="text-sm"
                            >
                              {item.label || "Checkbox"}
                            </label>
                          </div>
                        );
                      }

                      if (item.tipo === "medio_pago") {
                        return (
                          <div
                            className="w-[280px] mx-auto items-center justify-center flex flex-col space-y-2 p-2"
                            key={key}
                          >
                            <div className="flex items-center justify-center text-base font-bold mb-2 w-full">
                              <span>Medio de pago</span>
                            </div>
                            {item.mostrar_pago_bewins && (
                              <div className="flex items-center justify-left space-x-20 w-full">
                                <input
                                  type="checkbox"
                                  id={`bewins-${index}`}
                                  className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 accent-red-500"
                                />
                                <label
                                  htmlFor={`bewins-${index}`}
                                  className="text-sm"
                                >
                                  Pagar con Bewins
                                </label>
                              </div>
                            )}
                            <div className="relative w-full mt-2">
                              <input
                                id={`input-${index}`}
                                type="number"
                                aria-label="input-label"
                                placeholder=" "
                                className="border border-gray-300 rounded-lg p-2 w-full peer"
                              />
                              <label
                                htmlFor={`input-${index}`}
                                className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-red-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-red-400 transition-all duration-200"
                                style={{ pointerEvents: "none" }}
                              >
                                {`Cantidad de Bewins [máx. ${
                                  item.max_bewins || 0
                                }]`}
                              </label>
                            </div>
                            {item.mostrar_descuento_nomina && (
                              <div className="flex items-center justify-left space-x-20 w-full">
                                <input
                                  type="checkbox"
                                  id={`descuento_nomina-${index}`}
                                  className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 accent-red-500"
                                />
                                <label
                                  htmlFor={`descuento_nomina-${index}`}
                                  className="text-sm"
                                >
                                  Descuento Nómina
                                </label>
                              </div>
                            )}
                            {item.mostrar_pago_epayco && (
                              <div className="flex items-center justify-left space-x-20 w-full">
                                <input
                                  type="checkbox"
                                  id={`descuento_nomina-${index}`}
                                  className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 accent-red-500"
                                />
                                <label
                                  htmlFor={`descuento_nomina-${index}`}
                                  className="text-sm"
                                >
                                  Pagar con Epayco
                                </label>
                              </div>
                            )}
                            <div className="flex items-center justify-center space-x-2 w-full flex-col">
                              <span className="text-sm font-bold">
                                Selecciona número de cuotas:
                              </span>
                              <Select
                                className="w-[80px] h-[30px] text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={"1"}
                                disabled
                                options={[{ label: "1", value: "1", id: "1" }]}
                              />
                            </div>
                            {/* divider */}
                            <div
                              className="border-b border-gray-300 my-2 w-full"
                              key={key}
                            ></div>
                            <div className="flex items-center justify-center space-x-2 w-full mb-0">
                              <span className="text-sm font-bold">
                                Valor original:
                              </span>
                              <span className="text-sm font-bold">
                                {`$${Intl.NumberFormat("es-CO").format(
                                  item.valor_en_pesos ?? 0
                                )}`}
                              </span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 w-full flex-col mb-1">
                              <span className="text-sm ">
                                Cuotas seleccionadas: 1
                              </span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 w-full">
                              <span className="text-sm font-bold text-green-500">
                                Total por cuota:
                              </span>
                              <span className="text-sm font-bold text-green-500">
                                {`$${Intl.NumberFormat("es-CO").format(
                                  item.valor_en_pesos ?? 0
                                )}`}
                              </span>
                            </div>
                            <div className="flex items-center justify-center w-full">
                              <span className="text-xs  text-center">
                                {item.consideraciones ?? ""}
                              </span>
                            </div>
                          </div>
                        );
                      }

                      if (item.tipo === "switch") {
                        return <div key={key}>Es un switch</div>;
                      }

                      if (item.tipo === "button") {
                        return (
                          <div
                            className="flex items-center justify-center"
                            key={key}
                          >
                            <Button variant="rounded">{item.texto}</Button>
                          </div>
                        );
                      }

                      return item.tipo === "carousel" ? (
                        <div key={key} className="my-6">
                          <ImageCarousel
                            images={item.imagenes || []}
                            autoPlay={true}
                            interval={5000}
                          />
                        </div>
                      ) : (
                        <div>No definido</div>
                      );
                    })()}
                  </div>
                );
              })
            )
          }
        </div>
      </div>
    </div>
  );
}
