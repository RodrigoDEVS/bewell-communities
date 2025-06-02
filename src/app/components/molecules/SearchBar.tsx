"use client";
import SearchInput from "../atoms/SearchInput";
import Button from "../atoms/Button";
import { Filter } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <SearchInput />
      <Button>
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </div>
      </Button>
    </div>
  );
}
