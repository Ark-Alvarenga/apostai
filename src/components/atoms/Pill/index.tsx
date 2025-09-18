import React, { FC, InputHTMLAttributes } from "react";

interface PillProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: () => void;
  color?: "primary" | "secondary" | "alert" | "support";
  imageSrc?: string; // Adicionada a propriedade opcional para imagem
}

const colorClasses = {
  unchecked: "border rounded-xl px-3 py-0.5 cursor-pointer",
  checked: "border rounded-xl px-3 py-0.5 cursor-pointer bg-primary-800",
};

export const Pill: FC<PillProps> = ({ label, checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={checked ? colorClasses.checked : colorClasses.unchecked}
    >
      <label className="text-white font-semibold cursor-pointer break-words whitespace-nowrap">
        {label}
      </label>
    </div>
  );
};
