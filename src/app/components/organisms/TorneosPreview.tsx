import { useTorneosStore } from "@/app/store/useTorneosStore";
import React from "react";
import Button from "../atoms/Button";
import ImageCarousel from "../molecules/ImageCarousel";

export default function TorneosPreview() {
  const { componentes } = useTorneosStore();
  console.log(componentes);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full h-full max-h-[calc(100vh-100px)] items-center justify-center flex flex-col">
      <h1 className="text-xl font-bold mb-2">Preview</h1>
      <div className="bg-white rounded-3xl shadow-2xl p-4 w-[375px] h-[667px] overflow-hidden border border-gray-300 relative">
        <div className="border overflow-y-auto h-[calc(100%-20px)] p-2 rounded-lg border-gray-300">
          {componentes.map((item, index) => {
            const key = item.id
              ? `${item.tipo}-${item.id}`
              : `${item.tipo}-${index}`;

            if (item.tipo === "label") {
              return (
                <div
                  className="flex items-center justify-center font-bold text-lg"
                  key={key}
                >
                  {item.texto}
                </div>
              );
            }

            if (item.tipo === "imagen") {
              return (
                <div
                  className="flex items-center justify-center font-bold text-lg"
                  key={key}
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      className="h-90 w-70 object-cover"
                      src={item.url}
                      alt=""
                    />
                  </div>
                </div>
              );
            }

            if (item.tipo === "switch") {
              return <div key={key}>Es un switch</div>;
            }

            if (item.tipo === "button") {
              return (
                <div className="flex items-center justify-center" key={key}>
                  <Button>{item.tipo}</Button>
                </div>
              );
            }

            return item.tipo === "carousel" ? (
              <div key={key} className="my-6">
                <ImageCarousel
                  images={item.imagenes || []}
                  autoPlay={true}
                  interval={5000}
                />
              </div>
            ) : (
              <div>No definido</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
