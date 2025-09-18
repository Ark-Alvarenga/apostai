import React from "react";
import Last5StatsCard, { Last5Stats } from "./Last5StatsCard";
import { FaFutbol, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FormOverview } from "./FormOverview";

type ComparisonKeys =
  | "att"
  | "def"
  | "total"
  | "form"
  | "poisson_distribution"
  | "h2h"
  | "goals";

type ComparisonData = {
  home: string;
  away: string;
};

type RecentFormSectionProps = {
  comparison?: {
    [key in ComparisonKeys]: ComparisonData;
  };
  exclude?: ComparisonKeys[];
  last5Stats: {
    home: Last5Stats | undefined;
    away: Last5Stats | undefined;
  };
  insights?: {
    home?: string[];
    away?: string[];
  };
};

const labelMap: {
  [key in ComparisonKeys]: { label: string; icon: React.ReactNode };
} = {
  att: {
    label: "Ataque",
    icon: <FaFutbol className="text-blue-400 text-2xl" />,
  },
  def: {
    label: "Defesa",
    icon: <FaShieldAlt className="text-red-400 text-2xl" />,
  },
  total: {
    label: "Total Geral",
    icon: <FaChartLine className="text-gray-400 text-2xl" />,
  },
  form: {
    label: "Forma",
    icon: <FaChartLine className="text-green-400 text-2xl" />,
  },
  poisson_distribution: {
    label: "Probabilidade de Vitória",
    icon: <AiOutlineArrowUp className="text-purple-400 text-2xl" />,
  },
  h2h: {
    label: "Confronto Direto (H2H)",
    icon: <FaShieldAlt className="text-primary-400 text-2xl" />,
  },
  goals: {
    label: "Gols Marcados",
    icon: <AiOutlineArrowUp className="text-green-400 text-2xl" />,
  },
};

const scaleValue = (value: number, max: number): string =>
  `${(value / max) * 100}%`;

const RecentFormSection: React.FC<RecentFormSectionProps> = ({
  comparison,
  exclude = [],
  last5Stats,
}) => {
  if (!comparison || Object.keys(comparison).length === 0) {
    return (
      <p className="text-gray-400 text-center">
        Sem dados disponíveis para comparação.
      </p>
    );
  }

  const filteredComparison = Object.entries(comparison).filter(
    ([key]) => !exclude.includes(key as ComparisonKeys)
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 rounded-lg shadow-md bg-background-medium-800 text-white">
      {/* Últimos 5 Jogos */}
      <div className="flex justify-between items-center mb-8 gap-2">
        {last5Stats.away && <Last5StatsCard last5Stats={last5Stats.away} />}
      </div>
      <FormOverview
        att={last5Stats.home?.att}
        def={last5Stats.home?.def}
        played={last5Stats.home?.played}
      />

      {/* Comparações */}
      <div className="grid grid-cols-1 gap-6">
        {filteredComparison.map(([key, values]) => {
          const homeValue = parseFloat(values.home);
          const awayValue = parseFloat(values.away);
          const maxValue = Math.max(homeValue, awayValue, 100);
          const { label, icon } = labelMap[key as ComparisonKeys];

          return (
            <div
              key={key}
              className="bg-background-medium-900 p-4 rounded-lg shadow-md flex flex-col items-center gap-2"
            >
              {/* Ícone e Label */}
              <div className="flex justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="text-gray-200 font-semibold text-lg">
                    {label}
                  </span>
                </div>
              </div>

              {/* Barra Comparativa */}
              <div className="w-full relative h-6 bg-background-medium-800 rounded-lg overflow-hidden">
                {/* Barra com maior valor em verde */}
                {homeValue > awayValue ? (
                  <>
                    <div
                      className="absolute left-0 top-0 h-full bg-green-500 rounded-l-lg px-2 flex items-center justify-end"
                      style={{ width: scaleValue(homeValue, maxValue) }}
                    >
                      {homeValue > 0 && `${values.home}`}
                    </div>
                    <div
                      className="absolute right-0 top-0 h-full bg-red-500 rounded-r-lg px-2 flex items-center justify-start"
                      style={{ width: scaleValue(awayValue, maxValue) }}
                    >
                      {awayValue > 0 && `${values.away}`}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="absolute left-0 top-0 h-full bg-red-500 rounded-l-lg px-2 flex items-center justify-end"
                      style={{ width: scaleValue(homeValue, maxValue) }}
                    >
                      {homeValue > 0 && `${values.home}`}
                    </div>
                    <div
                      className="absolute right-0 top-0 h-full bg-green-500 rounded-r-lg px-2 flex items-center justify-start"
                      style={{ width: scaleValue(awayValue, maxValue) }}
                    >
                      {awayValue > 0 && `${values.away}`}
                    </div>
                  </>
                )}
              </div>

              {/* Comentário */}
              <div className="flex justify-between w-full text-sm text-gray-400 mt-2">
                <span>Time da Casa: {values.home}</span>
                <span>Time Visitante: {values.away}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentFormSection;
