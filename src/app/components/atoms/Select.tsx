"use client";

import type React from "react";

interface SelectOption {
  id: string | number;
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  customSize?: "small" | "medium" | "large";
  placeholder?: string;
  onChange?: (value: string) => void;
}

function SelectImproved(props: SelectProps) {
  const {
    options,
    customSize = "large",
    placeholder = "Select...",
    onChange,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <select
      className={`border border-gray-300 rounded-md ${
        customSize === "small" ? "px-2 py-0.75" : "p-2"
      }`}
      onChange={handleChange}
      {...rest}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectImproved;
