import React, { FC, InputHTMLAttributes } from "react";

interface ToggleSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: () => void;
  color?: "primary" | "secondary" | "alert" | "support";
  imageSrc?: string; // Adicionada a propriedade opcional para imagem
}

const colorClasses = {
  primary: "peer-checked:bg-primary-600 peer-focus:ring-primary-300",
  secondary: "peer-checked:bg-secondary-600 peer-focus:ring-secondary-300",
  alert: "peer-checked:bg-alert peer-focus:ring-red-300",
  support: "peer-checked:bg-support peer-focus:ring-blue-300",
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  color = "primary",
  imageSrc, // Adicionada a imagem como propriedade
  ...rest
}) => {
  return (
    <label className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-background-medium-600 transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...rest}
      />
      <div
        className={`relative w-9 h-5 bg-background-medium-200 peer-focus:outline-none  rounded-full ${colorClasses[color]} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:bg-black peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-gray-400`}
      ></div>
      <div className="flex items-center gap-2">
        {/* Exibe a bandeira, se fornecida */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={label}
            className="w-6 h-6 object-cover rounded-sm shadow-sm border border-gray-600"
          />
        )}
        <span className="text-sm font-medium text-white truncate">{label}</span>
      </div>
    </label>
  );
};
