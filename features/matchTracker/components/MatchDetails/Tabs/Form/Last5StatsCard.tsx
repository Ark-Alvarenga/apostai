import React from "react";
import { FaShieldAlt, FaFutbol, FaArrowUp, FaArrowDown } from "react-icons/fa";

export interface Last5Stats {
  form: string; // Exemplo: "60%"
  att: string; // Exemplo: "60%"
  def: string; // Exemplo: "0%"
  played: string;
  goals: {
    for: {
      total: number; // Total de gols marcados
      average: number; // Média de gols marcados
    };
    against: {
      total: number; // Total de gols sofridos
      average: number; // Média de gols sofridos
    };
  };
}

interface Last5StatsCardProps {
  last5Stats: Last5Stats;
}

const Last5StatsCard: React.FC<Last5StatsCardProps> = ({ last5Stats }) => {
  return (
    <div className="bg-background-medium-900 p-6 rounded-xl shadow-lg w-full  text-white space-y-6">
      {/* Gols */}
      <div className="bg-background-medium-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <FaFutbol className="text-secondary-400 text-2xl" />
          <h3 className="text-lg font-semibold">Gols</h3>
        </div>
        <div className="flex justify-between mt-3">
          <div className="text-center">
            <p className="font-bold text-gray-300">Marcados</p>
            <p className="text-green-400">{last5Stats.goals.for.total} gols</p>
            <p className="text-gray-400 text-sm">
              Média: {last5Stats.goals.for.average}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-300">Sofridos</p>
            <p className="text-red-400">
              {last5Stats.goals.against.total} gols
            </p>
            <p className="text-gray-400 text-sm">
              Média: {last5Stats.goals.against.average}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Last5StatsCard;
