import ComunidadesForm from "../organisms/ComunidadesForm";
import ConmunidadesFormHeader from "../organisms/ConmunidadesFormHeader";

export default function ComunidadesFormTemplate() {
  return (
    <div className="flex-1 p-8">
      <ConmunidadesFormHeader />
      <ComunidadesForm />
    </div>
  );
}
