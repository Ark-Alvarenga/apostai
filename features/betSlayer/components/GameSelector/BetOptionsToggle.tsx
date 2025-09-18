import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

type BetOptionsToggleProps = {
  isOpen: boolean;
  setIsBetOptionsOpen: (state: boolean) => void;
  translations: (key: string) => string;
};

const BetOptionsToggle: React.FC<BetOptionsToggleProps> = ({
  isOpen,
  setIsBetOptionsOpen,
  translations,
}) => {
  return (
    <div
      onClick={() => setIsBetOptionsOpen(!isOpen)}
      className="w-full py-2 flex justify-between items-center bg-background-heavy-700 rounded-b-lg cursor-pointer hover:bg-background-heavy-600 transition-colors"
    >
      <p className="text-sm text-gray-300 font-semibold px-4">
        {translations("selectBets")}
      </p>
      <div className="text-gray-300 pr-4">
        {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
      </div>
    </div>
  );
};

export default BetOptionsToggle;
