import { ChartConfiguration } from "chart.js";
import { useEffect, useState } from "react";
import { generateCardsChartConfig } from "../../../../helpers/charts/generateCardsChartConfig";
import {
  generateGoalsChartConfig,
  GoalsData,
} from "../../../../helpers/charts/generateGoalsChartConfig";
import ChartBar from "@/components/atoms/chart/ChartBar";

export type GoalsByMinuteProps = {
  minuteData: GoalsData;
};

export const GoalsByMinuteChart: React.FC<GoalsByMinuteProps> = ({
  minuteData,
}) => {
  const [teamGolsConfig, setTeamGolsConfig] = useState<ChartConfiguration<
    "bar",
    (number | [number, number] | null)[],
    unknown
  > | null>(null);

  useEffect(() => {
    if (minuteData) {
      setTeamGolsConfig(generateGoalsChartConfig(minuteData));
    }
  }, [minuteData]);

  return (
    <div className="bg-background-heavy-800 p-4 rounded-lg shadow-md">
      <h4 className="text-white font-bold mb-4">
        Distribuição de Gols por Minuto
      </h4>
      {teamGolsConfig && (
        <ChartBar
          chartConfig={teamGolsConfig}
          description="Este gráfico exibe a distribuição de gols marcados e sofridos por intervalos de 15 minutos ao longo da partida. Use-o para identificar momentos de maior efetividade ofensiva ou vulnerabilidade defensiva do time."
        />
      )}
    </div>
  );
};
