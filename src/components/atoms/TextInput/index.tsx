import React from "react";

interface TextInputProps {
  label: string;
  icon: React.ReactElement;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  icon,
  placeholder,
  error = false,
  errorMessage = "",
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div
        className={`flex items-center border-b ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="pr-2 text-gray-500">{icon}</div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`outline-none flex-1 py-2 ${
            error ? "text-red-500 placeholder-red-300" : "text-gray-700"
          }`}
        />
      </div>
      {error && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
