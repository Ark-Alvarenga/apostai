import { CardsData } from "../../../../helpers/charts/generateCardsChartConfig";
import { useMemo } from "react";

import { Container, Tabs } from "@/components";

import { AiFillHome } from "react-icons/ai"; // Ícone para time da casa
import { FaPlane } from "react-icons/fa"; // Ícone para time visitante

import { FootballMatchAnalysisType } from "@/types/InternalFixture";
import { TeamCardTab } from "./TeamCardTab";
import BetSuggestions, { BetSuggestionsType } from "../../../BetSuggestions";

interface CardsSectionProps {
  cards: {
    home?: CardsData;
    away?: CardsData;
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
  insights?: FootballMatchAnalysisType["cardsSchema"];
  betSuggestions?: BetSuggestionsType;
}

const CardsSection = ({
  cards,
  teams,
  insights,
  betSuggestions,
}: CardsSectionProps) => {
  const generateTabs = useMemo(
    () => [
      {
        name: teams?.home?.name || "home",
        icon: <AiFillHome />,
        imageUrl: teams?.home?.logo,
        content: (
          <TeamCardTab
            cards={cards.home}
            insights={insights?.home_team_cards.insights}
          />
        ),
      },
      {
        name: teams?.away?.name || "away",
        icon: <FaPlane />,
        imageUrl: teams?.away?.logo,
        content: (
          <TeamCardTab
            cards={cards.away}
            insights={insights?.away_team_cards.insights}
          />
        ),
      },
    ],
    [cards, teams, insights]
  );

  return (
    <Container bgColor="medium800" borderRadius="medium">
      <Tabs
        highlightActiveTab
        tabs={generateTabs}
        bgColor="transparent"
        textSize="md"
        fullWidth
      />
      <div className="col-span-1 lg:col-span-2">
        <BetSuggestions betSuggestions={betSuggestions} />
      </div>
    </Container>
  );
};

export default CardsSection;
