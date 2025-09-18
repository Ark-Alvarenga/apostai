import React from "react";

export interface SliderInputProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onValueChange: (value: number) => void;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  min,
  max,
  value,
  step,
  onValueChange,
}) => {
  // Handler for change events on the range input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(Number(event.target.value));
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={handleChange}
      className="w-full accent-primary-600"
    />
  );
};
