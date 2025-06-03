"use client";
import SearchInput from "../atoms/SearchInput";
import Button from "../atoms/Button";
import { Filter } from "lucide-react";
import FilterDropdown from "../atoms/FilteredDropdown";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <SearchInput />
      <FilterDropdown />
    </div>
  );
}
