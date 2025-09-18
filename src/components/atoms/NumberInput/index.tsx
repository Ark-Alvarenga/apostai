// components/NumberInput.tsx
import { ChangeEvent } from "react";
import { Badge } from "../Badge";

interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
}) => {
  const minValue = 1;
  const maxValue = 1000000;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
      onChange(newValue);
    }
  };

  const increment = () => {
    if (value < maxValue) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > minValue) {
      onChange(value - 1);
    }
  };

  const incrementSpecificAmmount = (ammount: number) => {
    onChange(value + ammount);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button
          className="w-10 h-10 text-2xl bg-blue-800 disabled:bg-background-medium-200 border-y border-gray-300 text-white"
          onClick={decrement}
          disabled={value === minValue}
        >
          -
        </button>
        <input
          type="number"
          className="w-auto h-10 text-center border-y border-gray-300 text-xl"
          value={value}
          onChange={handleInputChange}
          min={minValue}
          max={maxValue}
        />
        <button
          className="w-10 h-10 text-2xl bg-blue-800 border-y border-gray-300 text-white "
          onClick={increment}
        >
          +
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <Badge
          text="+10"
          color="bg-red"
          onClick={() => incrementSpecificAmmount(10)}
        />
        <Badge
          text="+100"
          color="bg-red"
          onClick={() => incrementSpecificAmmount(100)}
        />
        <Badge
          text="+1000"
          color="bg-red"
          onClick={() => incrementSpecificAmmount(1000)}
        />
      </div>
    </div>
  );
};
