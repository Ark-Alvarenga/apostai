import React, { useMemo } from "react";
import { Container, Tabs } from "@/components";
import { AiFillHome } from "react-icons/ai"; // Ícone para time da casa
import { FaPlane } from "react-icons/fa"; // Ícone para time visitante
import { TeamStatisticsResponse } from "football-wrapper";
import { TeamGoals } from "./TeamGoals";
import BetSuggestions, { BetSuggestionsType } from "../../../BetSuggestions";

type GolsSectionProps = {
  gols?: {
    home?: TeamStatisticsResponse["goals"];
    away?: TeamStatisticsResponse["goals"];
  };
  teams?: {
    home?: {
      name?: string;
      logo?: string;
    };
    away?: {
      name?: string;
      logo?: string;
    };
  };
  insights?: {
    home?: string[];
    away?: string[];
  };
  betSuggestions?: BetSuggestionsType;
};

export const GolsSection: React.FC<GolsSectionProps> = ({
  gols,
  teams,
  insights,
  betSuggestions,
}) => {
  const generateTabs = useMemo(
    () => [
      {
        name: teams?.home?.name || "Time da Casa",
        icon: <AiFillHome />,
        content: <TeamGoals goalsData={gols?.home} insights={insights?.home} />,
        imageUrl: teams?.home?.logo,
      },
      {
        name: teams?.away?.name || "Time Visitante",
        icon: <FaPlane />,
        content: <TeamGoals goalsData={gols?.away} insights={insights?.away} />,
        imageUrl: teams?.away?.logo,
      },
    ],
    [gols, teams, insights]
  );

  return (
    <Container bgColor="medium800">
      <div className="max-h-[calc(100%-666px)]">
        <Tabs
          tabs={generateTabs}
          bgColor="transparent"
          textSize="md"
          fullWidth
          highlightActiveTab
        />
        <div className="col-span-1 lg:col-span-2 h-full">
          <BetSuggestions betSuggestions={betSuggestions} />
        </div>
      </div>
    </Container>
  );
};
