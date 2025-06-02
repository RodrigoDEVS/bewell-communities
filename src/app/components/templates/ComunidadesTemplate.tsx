"use client";
import SearchBar from "../molecules/SearchBar";
import ComunidadesToolbar from "../molecules/ComunidadesToolbar";
import ComunidadesTable from "../organisms/ComunidadesTable";

export default function ComunidadesTemplate() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center text-red-600">
        <img src="/squares.png" alt="icono de cuadrados" className="mr-2" />
        Comunidades Bewell
      </h1>
      <SearchBar />
      <ComunidadesToolbar />
      <div className="mb-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ComunidadesTable />
          </div>
        </div>
      </div>
    </div>
  );
}
