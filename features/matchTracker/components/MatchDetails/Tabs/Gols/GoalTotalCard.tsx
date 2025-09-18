import { Container } from "@/components";
import React from "react";
import { FaFutbol } from "react-icons/fa";

type GoalTotalCardProps = {
  type: "for" | "against";
  total: { home: number; away: number; total: number };
  average: { home: string; away: string; total: string };
};

export const GoalTotalCard: React.FC<GoalTotalCardProps> = ({
  type,
  total,
  average,
}) => {
  const isScored = type === "for";
  const color = isScored ? "text-green-400" : "text-red-400";
  const label = isScored ? "Marcados" : "Sofridos";

  return (
    <Container padding="medium" borderRadius="large" shadow="medium">
      <div className="flex flex-col items-center">
        {/* Título e ícone */}
        <div className="flex items-center gap-2">
          <FaFutbol className={`${color} text-2xl`} />
          <h4 className="text-gray-300 font-bold">Gols {label}</h4>
        </div>

        {/* Média em destaque */}
        <p className="text-gray-300 text-4xl font-bold mt-4">{average.total}</p>
        <p className="text-gray-400 text-sm">Média por jogo</p>

        {/* Totais organizados horizontalmente */}
        <div className="flex justify-between gap-6 mt-4 w-full px-14 ">
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Casa</span>
            <span className="text-gray-300 font-bold">{total.home}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Fora</span>
            <span className="text-gray-300 font-bold">{total.away}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Total</span>
            <span className="text-gray-300 font-bold">{total.total}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};
