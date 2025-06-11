"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../atoms/Button";
import { TorneosData } from "@/app/types/torneos";
import Select, { SelectOption } from "../../atoms/Select";

interface ComponentsPopUpProps {
  isOpen: boolean;
  tipo: TorneosData["tipo"];
  onAdd: (component: TorneosData) => void;
  onClose: () => void;
}

export const ComponentsPopUp = ({
  isOpen,
  tipo,
  onAdd,
  onClose,
}: ComponentsPopUpProps) => {
  // Estados para los diferentes tipos de formularios
  const [labelText, setLabelText] = useState("");
  const [labelOption, setLabelOption] = useState("");
  const [urlLink, setUrlLink] = useState<string>("");
  const [carouselImages, setCarouselImages] = useState(["", "", ""]);
  const [image, setImage] = useState("");
  const [selectedInputOption, setSelectedInputOption] =
    useState<SelectOption | null>();
  const [maxBewins, setMaxBewins] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);
  const [valorPesos, setValorPesos] = useState<number>(0);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // No renderizar nada si el popup no está abierto
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cerrar solo si se hace click en el overlay, no en el contenido del modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function clearFields() {
    setLabelText("");
    setImage("");
    setCarouselImages(["", "", ""]);
  }
  const handleClick = () => {
    let newComponent: TorneosData = {
      tipo: tipo,
    };

    // Configurar el componente según el tipo
    if (tipo === "label") {
      newComponent = {
        ...newComponent,
        texto: labelText,
        estilo:
          labelOption === "Titulo"
            ? { fontSize: 22.0, fontWeight: "bold", color: "#000000" }
            : labelOption === "Subtitulo"
            ? {
                fontSize: 20.0,
                fontWeight: "bold",
                color: "#000000",
              }
            : labelOption === "Subtitulo2"
            ? {
                fontSize: 17.0,
                fontWeight: "bold",
                color: "#000000",
                alineacion: "centro",
              }
            : {
                fontSize: 15.0,
                fontWeight: "normal",
                color: "#000000",
                alineacion: "centro",
              },
      };
    } else if (tipo === "imagen") {
      newComponent = {
        ...newComponent,
        url: image,
        estilo: { width: 150, height: 150, borderRadius: 12 },
      };
    } else if (tipo === "label_link") {
      newComponent = {
        ...newComponent,
        label: labelText,
        url: urlLink,
      };
    } else if (tipo === "input") {
      newComponent = {
        ...newComponent,
        id: (selectedInputOption?.value as string) || "",
        label: selectedInputOption?.label || "",
        inputType: (selectedInputOption?.id as string) || "",
        requerido: true,
      };
    } else if (tipo === "checkbox") {
      newComponent = {
        ...newComponent,
        id: "acepta_terminos",
        label: labelText,
        requerido: true,
      };
    } else if (tipo === "button") {
      newComponent = {
        ...newComponent,
        texto: labelText,
        accion: { tipo: "navegar", ruta: "/confirmacionPago" },
      };
    } else if (tipo === "medio_pago") {
      newComponent = {
        ...newComponent,
        max_bewins: maxBewins,
        valor_unitario: valorUnitario,
        valor_en_pesos: valorPesos,
        consideraciones: labelText,
        requerido: true,
      };
    } else if (tipo === "carousel") {
      newComponent = {
        ...newComponent,
        imagenes: carouselImages
          .filter((url) => url.trim() !== "")
          .map((url) => ({ url })),
      };
    }

    onAdd(newComponent);
    clearFields();
    onClose();
  };

  // Actualizar una imagen específica en el carrusel
  const handleCarouselImageChange = (index: number, value: string) => {
    const newImages = [...carouselImages];
    newImages[index] = value;
    setCarouselImages(newImages);
  };

  // Label Options
  const labelOptions = [
    { value: "Titulo", label: "Titulo", id: "Titulo" },
    { value: "Subtitulo", label: "Subtitulo", id: "Subtitulo" },
    { value: "Subtitulo2", label: "Subtitulo2", id: "Subtitulo2" },
    { value: "Contenido", label: "Contenido", id: "Contenido" },
  ];

  // Input Options value = id, label = label, id = inputType
  const inputOptions = [
    { value: "correo", label: "Correo", id: "correo" },
    { value: "numero", label: "Número de identificación", id: "numero" },
    { value: "nombre", label: "Nombre completo", id: "text" },
    { value: "telefono", label: "Nombre de celular", id: "telefono" },
    { value: "nombreequipo", label: "Nombre del equipo", id: "text" },
    {
      value: "nombre_participante",
      label: "Nombre del Participante",
      id: "text",
    },
  ];

  // Renderizar el contenido según el tipo
  const renderContent = () => {
    switch (tipo) {
      case "label":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Texto</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo
              </label>
              <Select
                className="w-[200px] h-[35px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                options={labelOptions}
                value={labelOption}
                onChange={(value) => {
                  setLabelOption(value as string);
                }}
              ></Select>
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Texto
              </label>
              {labelOption === "Contenido" ? (
                <textarea
                  className="border border-gray-300 rounded-md shadow-sm w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={labelText}
                  onChange={(e) => setLabelText(e.target.value)}
                  placeholder="Ingrese el contenido"
                  rows={4}
                  name="laberArea"
                  id="laberArea"
                ></textarea>
              ) : (
                <input
                  type="text"
                  id="labelText"
                  value={labelText}
                  onChange={(e) => setLabelText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingrese el título"
                />
              )}
            </div>
          </div>
        );

      case "imagen":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Imagen</h3>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor={`image`}
                  className="block text-sm font-medium text-gray-700"
                >
                  URL de imagen
                </label>
                <input
                  type="text"
                  id={`image`}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>
          </div>
        );

      case "divider":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Linea de Division</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Divider
              </label>
              <div className="border-b border-gray-300 my-2"></div>
            </div>
          </div>
        );

      case "label_link":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Link de Texto</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Texto
              </label>
              <input
                type="text"
                id="labelText"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto"
              />
              <label
                htmlFor="label_link"
                className="block text-sm font-medium text-gray-700"
              >
                Url
              </label>
              <input
                type="text"
                id="label_link"
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese la url"
              />
            </div>
          </div>
        );

      case "input":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Campo de Texto</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo
              </label>
              <Select
                className="w-[250px] h-[35px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                options={inputOptions}
                value={selectedInputOption?.value || ""}
                returnObject
                onChange={(value) => {
                  if (value !== null) {
                    console.log("Selected value:", JSON.stringify(value));
                    setSelectedInputOption(value as SelectOption);
                  }
                }}
              ></Select>
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Checkbox</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Texto
              </label>
              <input
                type="text"
                id="labelText"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto del checkbox"
              />
            </div>
          </div>
        );

      case "medio_pago":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Medio de Pago</h3>
            <div className="space-y-2">
              <label
                htmlFor="consideraciones"
                className="block text-sm font-medium text-gray-700"
              >
                Consideraciones
              </label>
              <input
                type="text"
                id="consideraciones"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="max_bewins"
                className="block text-sm font-medium text-gray-700"
              >
                Max Bewins
              </label>
              <input
                type="number"
                id="max_bewins"
                value={maxBewins}
                onChange={(e) =>
                  setMaxBewins(e.target.value ? parseInt(e.target.value) : 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el máximo de bewins"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="valor_unitario"
                className="block text-sm font-medium text-gray-700"
              >
                Valor Unitario
              </label>
              <input
                type="number"
                id="valor_unitario"
                value={valorUnitario}
                onChange={(e) =>
                  setValorUnitario(
                    e.target.value ? parseInt(e.target.value) : 0
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el valor unitario"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="valor_en_pesos"
                className="block text-sm font-medium text-gray-700"
              >
                Valor en Pesos
              </label>
              <input
                type="number"
                id="valor_en_pesos"
                value={valorPesos}
                onChange={(e) =>
                  setValorPesos(e.target.value ? parseInt(e.target.value) : 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto"
              />
            </div>
          </div>
        );

      case "button":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Botón</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Texto
              </label>
              <input
                type="text"
                id="labelText"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto del botón"
              />
            </div>
          </div>
        );

      case "carousel":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Carrusel</h3>
            <div className="space-y-3">
              {carouselImages.map((url, index) => (
                <div key={index} className="space-y-2">
                  <label
                    htmlFor={`image-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    URL de imagen {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`image-${index}`}
                    value={url}
                    onChange={(e) =>
                      handleCarouselImageChange(index, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 text-center">
            <p>Tipo de componente no implementado: {tipo}</p>
          </div>
        );
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-gray-600/30 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-[500px]">
        {renderContent()}
        <div className="flex items-center justify-end mt-6">
          <Button variant="primary" onClick={handleClick}>
            Agregar
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
