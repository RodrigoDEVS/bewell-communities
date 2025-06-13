import React from "react";

interface SwitchProps {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}
export default function Switch({ text, value, onChange }: SwitchProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <label htmlFor="activo" className="text-sm font-medium text-gray-700">
        {text}
      </label>
      <button
        type="button"
        id="activo"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
