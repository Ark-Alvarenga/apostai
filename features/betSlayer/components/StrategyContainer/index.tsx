import React from "react";
import { Analysis } from "@/types";
import { EmptyAnalysis, GameCard, OverviewPanel } from "@betSlayer/components";
import { Container } from "@/components";

export type StrategyContainerProps = {
  analysis: Analysis | undefined;
};

export const StrategyContainer: React.FC<StrategyContainerProps> = ({
  analysis,
}) => {
  if (!analysis) {
    return <EmptyAnalysis />;
  }

  return (
    <div className="w-full min-h-full lg:max-h-full lg:h-full flex pt-4 pb-[70px] lg:pb-4 px-4 lg:px-8 bg-theme-gray-500">
      <div className="w-full">
        <OverviewPanel analysis={analysis} />
        {analysis.games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};
