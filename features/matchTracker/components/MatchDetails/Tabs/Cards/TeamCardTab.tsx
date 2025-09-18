import React, { useEffect, useState } from "react";
import {
  CardsData,
  generateCardsChartConfig,
} from "../../../../helpers/charts/generateCardsChartConfig";
import { ChartConfiguration } from "chart.js";
import ChartBar from "@/components/atoms/chart/ChartBar";
import Insights from "../../../Insigths";
import AverageCards from "./AverageCards";

type TeamCardTabProps = {
  cards?: CardsData;
  insights?: string[];
};

export const TeamCardTab = ({ cards, insights }: TeamCardTabProps) => {
  const [teamCardTabConfig, setTeamCardTabConfig] = useState<ChartConfiguration<
    "bar",
    (number | [number, number] | null)[],
    unknown
  > | null>(null);

  useEffect(() => {
    if (cards) {
      setTeamCardTabConfig(generateCardsChartConfig(cards));
    }
  }, [cards]);
  return (
    <div className="flex flex-col gap-3 mt-4">
      <AverageCards cardsData={cards} />
      {insights && <Insights insights={insights} />}
      {teamCardTabConfig && (
        <ChartBar
          chartConfig={teamCardTabConfig}
          description="Este gráfico exibe a distribuição de cartões por intervalos de 15 minutos, destacando momentos de maior disciplina. Use-o para ajustar apostas em mercados como 'Cartões no Jogo' ou 'Cartões por Tempo'."
        />
      )}
    </div>
  );
};
