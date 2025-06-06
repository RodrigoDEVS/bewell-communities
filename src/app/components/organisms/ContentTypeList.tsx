"use client";
import ContentTypeItem from "../molecules/ContentTypeItem";

export default function ContentTypesList() {
  return (
    <div className="border rounded-md overflow-hidden">
      <ContentTypeItem
        title="Categorías Bewell"
        role="Super Administrador"
        href="/contenido/categorias"
      />
      <ContentTypeItem
        title="Servicios Bewell"
        role="Gestor de Beneficios"
        href="/contenido/servicios"
      />
      <ContentTypeItem
        title="Comunidades Bewell"
        role="Gestor de Comunidades"
        href="/contenido/comunidades"
      />
      <ContentTypeItem
        title="Gestion de Torneos"
        role="Usuario"
        href="/contenido/torneos"
      />
      <ContentTypeItem
        title="Salud: Cuidamos de ti"
        role="Usuario"
        href="/contenido/salud"
      />
    </div>
  );
}
