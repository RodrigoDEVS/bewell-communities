"use client";

import { Plus, Trash2 } from "lucide-react";
import React from "react";
import Select from "../atoms/Select";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";
import { EstadoGeneral } from "@/app/types/enums";

interface LinkData {
  id?: string;
  linkId?: number | null;
  titulo: string;
  subtitulo: string;
  imagen: string;
  estado: EstadoGeneral | "";
  link: string;
}

interface FormProps {
  formTitle?: string;
  linkId: string;
  initialData?: Partial<LinkData>;
  onDataChange: (id: string, data: LinkData) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  disabled?: boolean;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

export default function LittleForm({
  formTitle,
  linkId,
  initialData = {},
  onDataChange,
  onRemove,
  onAdd,
  disabled = false,
  showAddButton = true,
  showRemoveButton = true,
}: FormProps) {
  const { estados } = useComunidadesStore();

  const [formData, setFormData] = React.useState<LinkData>({
    titulo: initialData.titulo || "",
    subtitulo: initialData.subtitulo || "",
    imagen: initialData.imagen || "",
    estado: initialData.estado || "",
    link: initialData.link || "",
  });

  const handleInputChange = (field: keyof LinkData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(linkId, newData);
  };

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
                  htmlFor={`titulo-${linkId}`}
                >
                  Titulo
                </label>
                <input
                  id={`titulo-${linkId}`}
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  disabled={disabled}
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2 disabled:opacity-50"
                  placeholder="Título del link"
                />
                <hr className="border-gray-200 mt-2" />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor={`subtitulo-${linkId}`}
                >
                  Subtitulo
                </label>
                <input
                  id={`subtitulo-${linkId}`}
                  type="text"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={(e) =>
                    handleInputChange("subtitulo", e.target.value)
                  }
                  disabled={disabled}
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2 disabled:opacity-50"
                  placeholder="Subtítulo del link"
                />
                <hr className="border-gray-200 mt-2" />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor={`imagen-${linkId}`}
                >
                  Imagen
                </label>
                <input
                  id={`imagen-${linkId}`}
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={(e) => handleInputChange("imagen", e.target.value)}
                  disabled={disabled}
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2 disabled:opacity-50"
                  placeholder="URL de la imagen"
                />
                <hr className="border-gray-200 mt-2" />
              </div>

              {/* Estado */}
              <div>
                <label
                  htmlFor={`estados-${linkId}`}
                  className="text-sm mr-2 text-gray-700 font-medium"
                >
                  Estado:
                </label>
                <Select
                  options={estados}
                  customSize="small"
                  style={{ fontSize: 14 }}
                  value={formData.estado}
                  onChange={(value) =>
                    handleInputChange("estado", value as string)
                  }
                  disabled={disabled}
                  placeholder="Seleccionar estado..."
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor={`link-${linkId}`}
                >
                  Link
                </label>
                <input
                  id={`link-${linkId}`}
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  disabled={disabled}
                  className="w-full border rounded border-gray-300 bg-gray-100 focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 text-sm px-3 py-2 disabled:opacity-50"
                  placeholder="URL del link"
                />
                <hr className="border-gray-200 mt-2" />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex p-2 items-center justify-center gap-2">
            {showRemoveButton && (
              <button
                type="button"
                onClick={() => onRemove(linkId)}
                disabled={disabled}
                className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Eliminar link"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            )}

            {showAddButton && (
              <button
                type="button"
                onClick={onAdd}
                disabled={disabled}
                className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Agregar nuevo link"
              >
                <Plus className="w-4 h-4 text-green-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
