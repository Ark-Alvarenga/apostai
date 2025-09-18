import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type OverUnderCardProps = {
  underOverData: Record<string, { over: number; under: number }>;
};

export const OverUnderCard: React.FC<OverUnderCardProps> = ({
  underOverData,
}) => {
  const entries = Object.entries(underOverData);

  return (
    <div className="bg-background-heavy-800 p-4 rounded-lg shadow-md">
      <h4 className="text-white font-bold mb-4 text-center">Over/Under</h4>
      <p className="text-center text-gray-400 mb-4 text-sm">
        Os dados abaixo mostra a quantidade de partidas com mais (Over) e menos
        (Under) de um número específico de gols.
      </p>
      <div
        className={`grid gap-4 grid-cols-2 sm:grid-cols-3 ${
          entries.length % 2 === 1 ? "sm:grid-cols-2 md:grid-cols-3" : ""
        }`}
      >
        {entries.map(([key, { over, under }], index) => (
          <div
            key={key}
            className={`bg-background-heavy-700 p-3 rounded-lg flex flex-col items-center justify-center shadow-md ${
              index === entries.length - 1 && entries.length % 2 !== 0
                ? "col-span-2 md:col-span-1"
                : ""
            }`}
          >
            <h5 className="text-white font-bold mb-2">{key} Gols</h5>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <FaArrowUp className="text-green-400 text-xl mb-1" />
                <span className="text-green-400 font-bold">Over: {over}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaArrowDown className="text-red-400 text-xl mb-1" />
                <span className="text-red-400 font-bold">Under: {under}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
