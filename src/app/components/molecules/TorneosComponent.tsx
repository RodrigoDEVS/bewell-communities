"use client";

import React, { ReactNode } from "react";
import Button from "../atoms/Button";
import { Plus } from "lucide-react";
import type { TorneosData } from "@/app/types/torneos";

interface TorneosComponentProps {
  children?: ReactNode;
  tipo: TorneosData["tipo"];
  texto?: string;
  url?: string;
  setPopUpOpen: (tipo: TorneosData["tipo"]) => void;
}

export default function TorneosComponent({
  children,
  tipo,
  url,
  setPopUpOpen,
}: TorneosComponentProps) {
  const handleClick = () => {
    const newComponent: TorneosData = {
      tipo: tipo,
      imagenes: [{ url: url ?? "" }],
    };
    setPopUpOpen(tipo);
  };

  return (
    <div>
      <span className="capitalize">{tipo}</span>
      <div className="bg-white rounded-lg shadow-md p-4 w-full flex items-center justify-between">
        <div>{children}</div>
        <Button variant="icon" size="icon" onClick={handleClick}>
          <Plus className="w-4 h-4 text-green-600" />
        </Button>
      </div>
    </div>
  );
}
