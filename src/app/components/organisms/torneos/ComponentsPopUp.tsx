"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../atoms/Button";
import { TorneosData } from "@/app/types/torneos";

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
  const [carouselImages, setCarouselImages] = useState(["", "", ""]);
  const [image, setImage] = useState("");

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
        estilo: { fontSize: 22.0, fontWeight: "bold", color: "#000000" },
      };
    } else if (tipo === "imagen") {
      newComponent = {
        ...newComponent,
        url: image,
        estilo: { width: 150, height: 150, borderRadius: 12 },
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

  // Renderizar el contenido según el tipo
  const renderContent = () => {
    switch (tipo) {
      case "label":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Titulo</h3>
            <div className="space-y-2">
              <label
                htmlFor="labelText"
                className="block text-sm font-medium text-gray-700"
              >
                Título de la etiqueta
              </label>
              <input
                type="text"
                id="labelText"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el título"
              />
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
