import { useTranslations } from "@/hooks/useTranslations";
import React from "react";
import { FaChartLine } from "react-icons/fa"; // Ícone para Probabilidade

interface OddsValue {
  bookmaker: string;
  odd: number;
  link: string;
}

interface DynamicOddsProps {
  odds: Record<string, OddsValue> | any;
  market: string;
}

export const DynamicOdds: React.FC<DynamicOddsProps> = ({ odds, market }) => {
  const translation = useTranslations("betSelector");
  const tOptions = useTranslations("betOptions");
  // Calcular probabilidade implícita
  const calculateProbabilities = (odds: Record<string, OddsValue>) => {
    const probabilities = Object.entries(odds).map(([key, { odd }]) => ({
      key,
      probability: 1 / odd,
    }));

    // Calcular soma das probabilidades
    const totalProbability = probabilities.reduce(
      (sum, { probability }) => sum + probability,
      0
    );

    // Ajustar as probabilidades para remover a margem da casa
    return probabilities.map(({ key, probability }) => ({
      key,
      adjustedProbability: (probability / totalProbability) * 100,
    }));
  };

  const probabilities = calculateProbabilities(odds);

  function formatBetSelectorKey(text: string): string {
    return text
      .replace(/\s+/g, "") // Remove todos os espaços
      .replace(/\(|\)|\/|\-/g, (match) => {
        return match;
      });
  }

  return (
    <div className="bg-background-heavy-800 p-3 rounded-lg shadow-md mb-4">
      <h4 className="text-gray-300 font-bold mb-2 text-center text-md">
        {translation(formatBetSelectorKey(market)) || market}
      </h4>
      <div className="bg-background-heavy-700 p-3 rounded-lg shadow-md">
        <ul className="space-y-2">
          {/* @ts-ignore */}
          {Object.entries(odds).map(([key, { bookmaker, odd, link }]) => {
            const adjustedProbability = probabilities.find(
              (p) => p.key === key
            )?.adjustedProbability;

            return (
              <li
                key={key}
                className="grid grid-cols-4 items-center border-b border-background-light-600 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
              >
                {/* Nome do Resultado */}
                <div className="text-left">
                  <h5 className="text-gray-400 font-medium text-sm">{key}</h5>
                </div>

                {/* Nome do Bookmaker com link */}
                <div className="text-left">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs underline hover:text-support"
                  >
                    {bookmaker}
                  </a>
                </div>

                {/* Odd */}
                <div className="flex justify-center text-left text-primary-500 font-bold text-sm">
                  {odd}
                </div>

                {/* Probabilidade */}
                <div className="text-left flex items-center justify-end gap-1 text-gray-300 text-xs">
                  <FaChartLine className="text-secondary-500" />{" "}
                  {adjustedProbability?.toFixed(2)}%
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
