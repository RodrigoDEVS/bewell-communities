"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../atoms/Button";
import { TorneosData } from "@/app/types/torneos";
import Select, { SelectOption } from "../../atoms/Select";
import Switch from "../../atoms/Switch";
import { useTorneosStore } from "@/app/store/useTorneosStore";

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
  const { selectedComponent, cleanSelectedComponent, updateSelectedComponent } =
    useTorneosStore();
  // Estados para los diferentes tipos de formularios
  const [labelText, setLabelText] = useState("");
  const [labelOption, setLabelOption] = useState("");
  const [urlLink, setUrlLink] = useState<string>("");
  const [carouselImages, setCarouselImages] = useState(["", "", ""]);
  const [image, setImage] = useState("");
  const [selectedInputOption, setSelectedInputOption] =
    useState<SelectOption | null>();
  const [inputId, setInputId] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [mostrarPagoBewins, setMostrarPagoBewins] = useState<boolean>(false);
  const [mostrarDescuentoNomina, setMostrarDescuentoNomina] =
    useState<boolean>(false);
  const [mostrarPagoEpayco, setMostrarPagoEpayco] = useState<boolean>(false);
  const [maxBewins, setMaxBewins] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);
  const [valorPesos, setValorPesos] = useState<number>(0);
  const [accion, setAccion] = useState<string>("");
  const [urlAction, setUrlAction] = useState<string>("");

  useEffect(() => {
    if (selectedComponent) {
      setImage(
        selectedComponent.tipo === "imagen" ? selectedComponent.url ?? "" : ""
      );
      setLabelText(
        selectedComponent.tipo === "label" ||
          selectedComponent.tipo === "button"
          ? selectedComponent.texto ?? ""
          : selectedComponent.tipo === "label_link" ||
            selectedComponent.tipo === "input" ||
            selectedComponent.tipo === "checkbox"
          ? selectedComponent.label ?? ""
          : selectedComponent.tipo === "medio_pago"
          ? selectedComponent.consideraciones ?? ""
          : ""
      );
      setLabelOption(
        selectedComponent.estilo?.fontSize === 22.0
          ? "Titulo"
          : selectedComponent.estilo?.fontSize === 20.0
          ? "Subtitulo"
          : selectedComponent.estilo?.fontSize === 17.0
          ? "Subtitulo2"
          : "Contenido"
      );
      setUrlLink(
        selectedComponent.tipo === "label_link"
          ? selectedComponent.url ?? ""
          : ""
      );
      setInputId(
        selectedComponent.tipo === "input" ||
          selectedComponent.tipo === "checkbox"
          ? selectedComponent.id ?? ""
          : ""
      );
      setSelectedInputOption(
        inputOptions.find(
          (option) => option.value === selectedComponent.inputType
        ) ?? null
      );
      setIsRequired(selectedComponent.requerido ?? false);
      setMostrarPagoBewins(selectedComponent.mostrar_pago_bewins ?? false);
      setMostrarDescuentoNomina(
        selectedComponent.mostrar_descuento_nomina ?? false
      );
      setMostrarPagoEpayco(selectedComponent.mostrar_pago_epayco ?? false);
      setMaxBewins(selectedComponent.max_bewins ?? 0);
      setValorUnitario(selectedComponent.valor_unitario ?? 0);
      setValorPesos(selectedComponent.valor_en_pesos ?? 0);
      setAccion(selectedComponent.accion?.tipo ?? "");
      setUrlAction(selectedComponent.accion?.ruta ?? "");
    }
  }, [selectedComponent]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearFields();
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
      clearFields();
      onClose();
    }
  };

  const clearFields = () => {
    setLabelText("");
    setImage("");
    setCarouselImages(["", "", ""]);
    setInputId("");
    setIsRequired(false);
    setLabelOption("");
    setSelectedInputOption(null);
    setAccion("");
    setUrlAction("");
    setMostrarPagoBewins(false);
    setMostrarDescuentoNomina(false);
    setMostrarPagoEpayco(false);
    setMaxBewins(0);
    setValorUnitario(0);
    setValorPesos(0);
    setUrlLink("");
    cleanSelectedComponent();
  };

  const handleClick = () => {
    let newComponent: TorneosData = selectedComponent
      ? selectedComponent
      : {
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
        id: inputId || "",
        label: labelText || "",
        inputType: (selectedInputOption?.value as string) || "",
        requerido: isRequired,
      };
    } else if (tipo === "checkbox") {
      newComponent = {
        ...newComponent,
        id: inputId,
        label: labelText,
        requerido: true,
      };
    } else if (tipo === "medio_pago") {
      newComponent = {
        ...newComponent,
        mostrar_pago_bewins: mostrarPagoBewins,
        mostrar_descuento_nomina: mostrarDescuentoNomina,
        mostrar_pago_epayco: mostrarPagoEpayco,
        max_bewins: maxBewins,
        valor_unitario: valorUnitario,
        valor_en_pesos: valorPesos,
        consideraciones: labelText,
        requerido: true,
      };
    } else if (tipo === "button") {
      newComponent = {
        ...newComponent,
        texto: labelText,
        accion: { tipo: accion, ruta: urlAction },
      };
    } else if (tipo === "carousel") {
      newComponent = {
        ...newComponent,
        imagenes: carouselImages
          .filter((url) => url.trim() !== "")
          .map((url) => ({ url })),
      };
    }

    selectedComponent
      ? updateSelectedComponent(newComponent)
      : onAdd(newComponent);

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
    { value: "Titulo", label: "Titulo (22px)", id: "Titulo" },
    { value: "Subtitulo", label: "Subtitulo (20px)", id: "Subtitulo" },
    { value: "Subtitulo2", label: "Subtitulo2 (17px)", id: "Subtitulo2" },
    { value: "Contenido", label: "Contenido (15px)", id: "Contenido" },
  ];

  // Input Options value = inputType
  const inputOptions = [
    { value: "correo", label: "Correo", id: "correo" },
    { value: "numero", label: "Numero", id: "numero" },
    { value: "text", label: "Texto", id: "text" },
    { value: "telefono", label: "Telefono", id: "telefono" },
  ];

  const accionesList = [
    { value: "redirigir_app", label: "Redirigir App", id: "redirigir_app" },
    { value: "redirigir_web", label: "Redirigir Web", id: "redirigir_web" },
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
                htmlFor="consideraciones"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Entrada
              </label>
              <Select
                className="w-[250px] h-[35px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                options={inputOptions}
                value={selectedInputOption?.value || ""}
                returnObject
                onChange={(value) => {
                  if (value !== null) {
                    setSelectedInputOption(value as SelectOption);
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="input_id"
                className="block text-sm font-medium text-gray-700"
              >
                Input Id
              </label>
              <input
                type="text"
                id="input_id"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="input_label"
                className="block text-sm font-medium text-gray-700"
              >
                Label
              </label>
              <input
                type="text"
                id="labelText"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto"
              />
            </div>
            <div>
              <Switch
                text="Obligatorio"
                value={isRequired}
                onChange={(value) => setIsRequired(value)}
              />
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agregar Checkbox</h3>
            <div className="space-y-2">
              <label
                htmlFor="checbox_id"
                className="block text-sm font-medium text-gray-700"
              >
                Checkbox Id
              </label>
              <input
                type="text"
                id="checbox_id"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese el texto del checkbox"
              />
            </div>
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
            <div>
              <Switch
                text="Mostrar Pago con Bewins"
                value={mostrarPagoBewins}
                onChange={(value) => {
                  setMostrarPagoBewins(value);
                }}
              />
              <Switch
                text="Mostrar Descuento Nómina"
                value={mostrarDescuentoNomina}
                onChange={(value) => {
                  setMostrarDescuentoNomina(value);
                }}
              />
              <Switch
                text="Mostrar Pago Epayco"
                value={mostrarPagoEpayco}
                onChange={(value) => {
                  setMostrarPagoEpayco(value);
                }}
              />
            </div>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="max_bewins"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor Máximo de Bewins
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
              <div>
                <label
                  htmlFor="valor_unitario"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor Unitario de Bewins
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
              <div>
                <label
                  htmlFor="valor_en_pesos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor en Pesos de la Inscripción
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
              <div>
                <label
                  htmlFor="consideraciones"
                  className="block text-sm font-medium text-gray-700"
                >
                  Datos a Tener en Cuenta
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
            <div>
              <h3 className="text-lg font-medium mb-4">Acciones</h3>
              <div className="space-y-2">
                <label
                  htmlFor="acciones"
                  className="block text-sm font-medium text-gray-700"
                >
                  Seleccionar Acción
                </label>
                <Select
                  options={accionesList}
                  value={accion}
                  onChange={(value) => {
                    if (value !== "") {
                      setAccion(value as string);
                    }
                  }}
                />
                <div className="space-y-2">
                  <label
                    htmlFor="urlAction"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ruta
                  </label>
                  <input
                    type="text"
                    id="urlAction"
                    value={urlAction}
                    onChange={(e) => setUrlAction(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ingrese la ruta del botón"
                  />
                </div>
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
            {selectedComponent ? "Editar" : "Agregar"}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
