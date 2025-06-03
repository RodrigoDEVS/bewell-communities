"use client";

import { useComunidadesFormStore } from "@/app/store/useComunidadFormStore";
import ComunidadesForm from "../organisms/ComunidadesForm";
import ConmunidadesFormHeader from "../organisms/ConmunidadesFormHeader";
import { useEffect } from "react";
import { EstadoGeneral } from "@/app/types/enums";
import { toast } from "sonner";
import { useComunidadesStore } from "@/app/store/useComunidadesStore";

interface ComunidadesFormTemplateProps {
  mode: "create" | "edit";
}
export default function ComunidadesFormTemplate({
  mode,
}: ComunidadesFormTemplateProps) {
  const { updateField, resetForm } = useComunidadesFormStore();
  const { selectedCommunity: comunidad } = useComunidadesStore();

  // Cargar datos de la comunidad en el formulario cuando estemos en modo edición
  useEffect(() => {
    if (mode === "create") {
      resetForm();
    } else if (mode === "edit" && comunidad) {
      // Cargar datos de la comunidad en el store
      updateField("id", comunidad.com_id);
      updateField("titulo", comunidad.com_nombre);
      updateField("descripcion", comunidad.com_descripcion);
      updateField("descripcionCorta", comunidad.com_descripcion_corta || "");
      updateField("estado", comunidad.com_status.toUpperCase());
      updateField("imagen", comunidad.com_img_url || null);
      updateField("videoUrl", comunidad.com_url_video || "");
      updateField("videoEnabled", !!comunidad.com_url_video);

      // Cargar contenido adicional (links)
      if (
        comunidad.ContenidoAdicionalComunidades &&
        comunidad.ContenidoAdicionalComunidades.length > 0
      ) {
        updateField("linksEnabled", true);
        const links = comunidad.ContenidoAdicionalComunidades.map(
          (contenido, index) => ({
            id: `link-${index}`,
            linkId: contenido.cac_id,
            comId: contenido.com_id,
            titulo: contenido.cac_titulo || "",
            subtitulo: contenido.cac_subtitulo || "",
            imagen: contenido.cac_imr_url || "",
            estado: contenido.cac_estado?.toUpperCase() || EstadoGeneral.ACTIVO,
            link: contenido.cac_url_contenido || "",
          })
        );
        updateField("links", links);
      }
    }
  }, [mode, comunidad, updateField, resetForm]);

  return (
    <div className="flex-1 p-8">
      <ConmunidadesFormHeader mode={mode} />
      <ComunidadesForm mode={mode} />
    </div>
  );
}
