import SearchBar from "@/app/components/molecules/SearchBar";
import ContentTypesList from "@/app/components/organisms/ContentTypeList";
import ContenidoTemplate from "@/app/components/templates/ContenidoTemplate";

export default function ContenidoPage() {
  return (
    <ContenidoTemplate title="Comunidades Bewell">
      <SearchBar />
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Tipos de Contenidos</h2>
        <ContentTypesList />
      </div>
    </ContenidoTemplate>
  );
}
