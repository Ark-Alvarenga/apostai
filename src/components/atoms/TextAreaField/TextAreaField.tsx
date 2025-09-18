import React, { FC, TextareaHTMLAttributes } from "react";
import { TooltipIcon } from "@/components/molecules/Tooltip/TooltipIcon";

type TextAreaFieldProps = {
  label: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  tooltip?: string;
  description?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaField: FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  tooltip,
  maxLength = 250,
  description,
  ...rest // Captura as props adicionais
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {/* Label */}
      <label className="text-white text-sm font-medium flex items-center">
        {label}
        {required && <span className="text-alert ml-1">*</span>}
        {tooltip && <TooltipIcon title={tooltip} size="xxs" />}
      </label>

      {/* Textarea Wrapper */}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full text-white py-2 px-3 rounded-lg bg-background-heavy-700 border border-background-light-600 focus:border-primary-600 transition-all text-sm`}
        required={required}
        maxLength={maxLength}
        {...rest}
      />
      <p className="text-right text-sm text-gray-500">
        {`${value?.length || "0"}/${maxLength}`}
      </p>

      {/* Description */}
      {description && (
        <p className="text-gray-400 text-xs mb-1">{description}</p>
      )}
    </div>
  );
};
