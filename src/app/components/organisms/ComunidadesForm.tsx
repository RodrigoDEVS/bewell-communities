"use client";

import React, { useEffect, useState } from "react";
import { Link, Plus, Trash2 } from "lucide-react";
import LittleForm from "./LittleForm";
import RetosForm from "./RetosForm";
import Select from "../atoms/Select";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";
import { useComunidadesFormStore } from "@/app/store/useComunidadFormStore";
import { useCreateComunidad } from "@/app/api/queries/comunidades";
import { toast } from "sonner";
import { Comunidad } from "@/app/types/comunidades";
import { EstadoGeneral } from "@/app/types/enums";

export default function ComunidadesForm() {
  const { estados } = useComunidadesStore();
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    validateForm,
    setSubmitting,
    resetForm,
    addLink,
    updateLink,
    removeLink,
  } = useComunidadesFormStore();

  // Hook de mutación de React Query
  const crearComunidadMutation = useCreateComunidad();

  const handleImageLinkClick = () => {
    const esUrlImagenValida = (url: string) => {
      return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    };
    const url = prompt("Ingresa la URL de la imagen:", formData.imagen || "");
    if (url) {
      if (esUrlImagenValida(url)) {
        updateField("imagen", url);
      } else {
        toast.error("La URL no es válida o no es una imagen soportada");
      }
    }
  };

  const handleImageDelete = () => {
    updateField("imagen", null);
  };

  const getYoutubeVideoId = (url: string) => {
    if (!url) return "";

    // Patrones para URLs de YouTube
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return "";
  };

  const handleVideoLinkClick = () => {
    const url = prompt(
      "Ingresa la URL del video de YouTube:",
      formData.videoUrl || ""
    );
    if (url) {
      if (getYoutubeVideoId(url)) {
        updateField("videoUrl", url);
      } else {
        toast.error("Por favor ingresa una URL válida de YouTube");
      }
    }
  };

  const handleVideoDelete = () => {
    updateField("videoUrl", "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validar formulario
    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setSubmitting(true);

    try {
      // Preparar datos para enviar
      const comunidadData = {
        com_nombre: formData.titulo,
        com_descripcion: formData.descripcion,
        com_status: formData.estado as EstadoGeneral,
        // Campos opcionales solo si tienen valor
        ...(formData.descripcionCorta && {
          com_descripcion_corta: formData.descripcionCorta,
        }),
        ...(formData.imagen && { com_img_url: formData.imagen }),
        ...(formData.videoEnabled &&
          formData.videoUrl && { com_url_video: formData.videoUrl }),
        // Incluir links si están habilitados y hay datos
        ...(formData.linksEnabled &&
          formData.links.length > 0 && {
            ContenidoAdicionalComunidades: formData.links
              .filter((link) => link.titulo.trim() || link.link.trim()) // Solo incluir links con datos
              .map((link) => ({
                cac_titulo: link.titulo,
                cac_subtitulo: link.subtitulo,
                cac_imr_url: link.imagen,
                cac_url_contenido: link.link,
                cac_estado: link.estado as EstadoGeneral,
              })),
          }),
      };

      // Llamar a la mutación
      await crearComunidadMutation.mutateAsync(comunidadData);

      toast.success("Comunidad creada exitosamente");
      resetForm();
    } catch (error: any) {
      console.warn("Error creating community:", error);
      toast.error("Error al crear la comunidad. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  // Función para manejar el primer link (agregar automáticamente si no existe)
  const handleLinksEnabledChange = (enabled: boolean) => {
    updateField("linksEnabled", enabled);
    if (enabled && formData.links.length === 0) {
      addLink(); // Agregar automáticamente el primer link
    }
  };

  return (
    <div className="bg-white overflow-x-auto rounded-lg shadow-sm border p-6 mx-auto max-w-3xl max-h-[calc(100vh-200px)]">
      <form id="form-comunidad" className="space-y-5" onSubmit={handleSubmit}>
        {/* Título - Nombre */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="titulo"
          >
            Título - Nombre<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={(e) => updateField("titulo", e.target.value)}
            className={`w-full border ${
              errors.titulo ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Nombre"
            disabled={isSubmitting}
          />
          {errors.titulo && (
            <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>
          )}
          {/* Separador */}
          <hr className="border-red-500 mt-2" />
        </div>

        {/* Descripción */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="descripcion"
          >
            Descripción Actividades Comunidad
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            maxLength={525}
            value={formData.descripcion}
            onChange={(e) => updateField("descripcion", e.target.value)}
            className={`w-full border ${
              errors.descripcion ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24`}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
          )}
        </div>

        {/* Descripción corta */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="descripcion-corta"
          >
            Descripción Corta
          </label>
          <input
            id="descripcion-corta"
            type="text"
            name="descripcion-corta"
            value={formData.descripcionCorta}
            onChange={(e) => updateField("descripcionCorta", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descripción Corta"
            disabled={isSubmitting}
          />
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
            value={formData.estado}
            onChange={(value) => updateField("estado", value)}
            disabled={isSubmitting}
          />
          {errors.estado && (
            <p className="text-red-500 text-xs mt-1">{errors.estado}</p>
          )}
        </div>

        {/* Foto Comunidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Comunidad
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
            {formData.imagen ? (
              <div className="relative">
                <img
                  src={formData.imagen || "/placeholder.svg"}
                  alt="Vista previa"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    type="button"
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={handleImageLinkClick}
                    disabled={isSubmitting}
                  >
                    <Link className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={handleImageDelete}
                    disabled={isSubmitting}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {errors.imagen && (
                  <p className="text-red-500 text-xs mt-1">{errors.imagen}</p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    type="button"
                    className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={handleImageLinkClick}
                    disabled={isSubmitting}
                  >
                    <Link className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {errors.imagen && (
                  <p className="text-red-500 text-xs mt-1">{errors.imagen}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Separador */}
        <hr className="border-red-500" />

        {/* Video Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Video
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  updateField("videoEnabled", !formData.videoEnabled)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.videoEnabled ? "bg-red-500" : "bg-gray-200"
                }`}
                disabled={isSubmitting}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.videoEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {formData.videoEnabled && (
            <>
              {/* URL Video */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="video-url"
                >
                  URL Video
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 mb-6">
                  {formData.videoUrl ? (
                    <div className="text-center">
                      <div className="w-full max-w-md mx-auto mb-4">
                        <iframe
                          src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                            formData.videoUrl
                          )}`}
                          className="w-full aspect-video rounded-lg"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleVideoLinkClick}
                          className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={isSubmitting}
                        >
                          <Link className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          type="button"
                          onClick={handleVideoDelete}
                          className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">
                        No hay video seleccionado
                      </p>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleVideoLinkClick}
                          className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={isSubmitting}
                        >
                          <Link className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          type="button"
                          onClick={handleVideoDelete}
                          className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Separador */}
                <hr className="border-red-500 mb-2" />
              </div>
            </>
          )}
        </div>
        {/* Links Section */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <label className="text-lg font-medium">Links de interés</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleLinksEnabledChange(!formData.linksEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.linksEnabled ? "bg-red-500" : "bg-gray-200"
                }`}
                disabled={isSubmitting}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.linksEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {formData.linksEnabled && (
            <div className="space-y-4">
              {formData.links.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-4">No hay links agregados</p>
                  <button
                    type="button"
                    onClick={addLink}
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Primer Link
                  </button>
                </div>
              )}

              {formData.links.map((link, index) => (
                <LittleForm
                  key={link.id}
                  formTitle={`Link #${index + 1}`}
                  linkId={link.id ?? ""}
                  initialData={link}
                  onDataChange={updateLink}
                  onRemove={removeLink}
                  onAdd={addLink}
                  disabled={isSubmitting}
                  showAddButton={index === formData.links.length - 1} // Solo mostrar botón + en el último
                  showRemoveButton={formData.links.length > 1} // Solo mostrar botón - si hay más de uno
                />
              ))}
            </div>
          )}
        </div>

        {/* Separador */}
        <hr className="border-red-500 mt-3" />

        {/* Retos Activos Section */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <label>Retos activos</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  updateField("retosEnabled", !formData.retosEnabled)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.retosEnabled ? "bg-red-500" : "bg-gray-200"
                }`}
                disabled={isSubmitting}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.retosEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
          {formData.retosEnabled && <RetosForm formTitle="Reto #1" />}
        </div>
      </form>
    </div>
  );
}
