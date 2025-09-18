import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-background-medium-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
};
