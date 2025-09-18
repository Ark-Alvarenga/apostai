import React, { FC } from "react";
import Select, { Props as SelectProps } from "react-select";

type Option = { value: string; label: string };

type CustomSelectProps = SelectProps<Option, true> & {
  label?: string; // Rótulo do campo
  description?: string; // Descrição adicional
  tooltip?: string; // Mensagem de tooltip
};

export const CustomSelect: FC<CustomSelectProps> = ({
  label,
  description,
  tooltip,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {/* Label */}
      {label && (
        <label className="text-white text-sm font-medium flex items-center">
          {label}
          {tooltip && (
            <div className="relative group ml-2">
              <span
                className="text-secondary-500 cursor-pointer"
                data-tooltip={tooltip}
              >
                ℹ
              </span>
              <div className="absolute z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-white bg-background-heavy-900 rounded-lg shadow-lg">
                {tooltip}
              </div>
            </div>
          )}
        </label>
      )}

      {/* Select Component */}
      <Select
        classNamePrefix="custom-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#222529", // Usando background-heavy-300
            borderColor: "#334155", // Adicione bordas customizadas
            color: "#E6FFF2", // primary-50 para o texto
            padding: "4px",
            borderRadius: "4px",
            "&:hover": {
              borderColor: "#30343C", // primary-600 no hover
            },
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#23272D", // background-medium-500
            borderRadius: "4px",
            overflow: "hidden",
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? "#00D959" // primary-600 para opção selecionada
              : isFocused
              ? "#1C2024" // background-medium-600 para hover
              : "#23272D", // background-medium-500 para opções padrão
            color: isSelected ? "#FFFFFF" : "#E6FFF2", // Branco ou primary-50
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#E6FFF2", // primary-50 para o valor selecionado
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#00D959", // primary-600 para valores múltiplos
            color: "#111",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#111", // Branco para o texto dos valores múltiplos
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#111", // Branco para o botão de remoção
            ":hover": {
              backgroundColor: "#008D3B", // primary-800 no hover
              color: "#111",
            },
          }),
        }}
        {...props}
      />

      {/* Description */}
      {description && (
        <p className="text-secondary-400 text-xs mt-1">{description}</p>
      )}
    </div>
  );
};
