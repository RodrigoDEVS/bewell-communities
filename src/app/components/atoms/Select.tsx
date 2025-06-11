"use client";

import type React from "react";

export interface SelectOption {
  id: string | number;
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  customSize?: "small" | "medium" | "large";
  placeholder?: string;
  onChange?: (value: string | SelectOption | null) => void;
  returnObject?: boolean;
}

function SelectImproved(props: SelectProps) {
  const {
    options,
    customSize = "large",
    placeholder = "Select...",
    onChange,
    returnObject = false,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (onChange) {
      if (returnObject) {
        const selectedOption =
          options.find((opt) => opt.value === selectedValue) || null;
        onChange(selectedOption);
      } else {
        onChange(selectedValue);
      }
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
        <option key={`${option.id}-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectImproved;
