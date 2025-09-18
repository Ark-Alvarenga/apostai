import React, { FC, InputHTMLAttributes } from "react";
import { TooltipIcon } from "@/components/molecules/Tooltip/TooltipIcon";
import { FaDollarSign, FaPhone, FaEnvelope, FaQuestion } from "react-icons/fa6";

// Mapeamento de ícones disponíveis
const iconMap = {
  email: FaEnvelope,
  phone: FaPhone,
  dollar: FaDollarSign,
  question: FaQuestion,
};

type IconKey = keyof typeof iconMap;

type InputFieldProps = {
  label: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconLeft?: IconKey; // Chave para o ícone exibido dentro do input
  tooltip?: string; // Mensagem de tooltip
  description?: string; // Descrição adicional do campo
} & InputHTMLAttributes<HTMLInputElement>; // Aceita todas as props de um input

export const InputField: FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  iconLeft,
  tooltip,
  step = 1, // Valor padrão para o incremento
  description,
  ...rest // Captura as props adicionais
}) => {
  // Obtém o ícone correspondente, se existir
  const IconComponent = iconLeft ? iconMap[iconLeft] : null;

  return (
    <div className="flex flex-col space-y-1">
      {/* Label */}
      <label className="text-white text-sm font-medium flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {tooltip && <TooltipIcon title={tooltip} size="xxs" />}
      </label>

      {/* Input Wrapper */}
      <div className="relative w-full">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconComponent className="text-gray-500" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full text-white py-2 px-3 ${
            iconLeft ? "pl-10" : ""
          } rounded-lg bg-background-heavy-700 border border-background-light-600 focus:border-primary-600 transition-all text-sm`}
          required={required}
          step={type === "number" ? step : undefined} // Aplicar step apenas para números
          {...rest} // Passa as props adicionais para o input
        />
      </div>
      {/* Description */}
      {description && (
        <p className="text-gray-400 text-xs mb-1">{description}</p>
      )}
    </div>
  );
};
