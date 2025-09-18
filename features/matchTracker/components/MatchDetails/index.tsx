import React, { useState } from "react";
import { InternalFixture } from "@/types/InternalFixture";
import MatchDetailsHeader from "./Header";
import { Container, Tabs } from "@/components";
import { FaFutbol, FaBookmark, FaMoneyBillAlt, FaTimes } from "react-icons/fa";

import PredictionsSection from "./Tabs/Predictions";
import CardsSection from "./Tabs/Cards";
import { GolsSection } from "./Tabs/Gols";
import { OddsPreMatchSection } from "./Tabs/OddsPreMatch/index";
import { FaBullseye } from "react-icons/fa6";
import { isFirstGameOfLeague } from "@nextGames/helpers/isFirstGameOfLeague";

interface MatchDetailsContainerProps {
  details: InternalFixture;
}

const MatchDetailsContainer: React.FC<MatchDetailsContainerProps> = ({
  details,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leagueId = details.preMatchStatistics?.predictions.league.id;
  const firstGame = isFirstGameOfLeague(
    details.preMatchStatistics?.predictions
  );

  const allTabs = [
    {
      name: "finalResult",
      icon: <FaFutbol />,
      content: (
        <PredictionsSection
          predictions={details.preMatchStatistics?.predictions.predictions}
          resume={details.preMatchOpenaiReport?.resume.resume}
          insights={details.preMatchOpenaiReport?.result_final.insights}
          betSuggestions={
            details.preMatchOpenaiReport?.result_final.bet_suggestions
          }
        />
      ),
    },
    {
      name: "gols",
      icon: <FaBullseye />,
      content: (
        <GolsSection
          gols={{
            home: details.preMatchStatistics?.home.statistics.goals,
            away: details.preMatchStatistics?.away.statistics.goals,
          }}
          teams={{
            home: {
              name: details.preMatchStatistics?.predictions.teams.home.name,
              logo: details.preMatchStatistics?.predictions.teams.home.logo,
            },
            away: {
              name: details.preMatchStatistics?.predictions.teams.away.name,
              logo: details.preMatchStatistics?.predictions.teams.away.logo,
            },
          }}
          insights={{
            home: details.preMatchOpenaiReport?.total_goals.insights.home_team,
            away: details.preMatchOpenaiReport?.total_goals.insights.away_team,
          }}
          betSuggestions={
            details.preMatchOpenaiReport?.total_goals.bet_suggestions
          }
        />
      ),
    },
    {
      name: "cards",
      icon: <FaBookmark />,
      content: (
        <CardsSection
          cards={{
            home: details.preMatchStatistics?.home.statistics.cards,
            away: details.preMatchStatistics?.away.statistics.cards,
          }}
          teams={{
            home: {
              name: details.preMatchStatistics?.predictions.teams.home.name,
              logo: details.preMatchStatistics?.predictions.teams.home.logo,
            },
            away: {
              name: details.preMatchStatistics?.predictions.teams.away.name,
              logo: details.preMatchStatistics?.predictions.teams.away.logo,
            },
          }}
          insights={details.preMatchOpenaiReport?.cardsSchema}
          betSuggestions={
            details.preMatchOpenaiReport?.cardsSchema.bet_suggestions
          }
        />
      ),
    },
    {
      name: "odds",
      icon: <FaMoneyBillAlt />,
      content: leagueId && (
        <OddsPreMatchSection
          leagueId={leagueId}
          fixtureId={details.fixtureId}
        />
      ),
    },
  ];

  const generateTabs = firstGame
    ? allTabs.filter((tab) => tab.name === "odds")
    : allTabs;

  const locationString = `${details.preMatchStatistics?.fixture.venue.name}, ${details.preMatchStatistics?.fixture.venue.city}`;

  return (
    <>
      {/* Desktop Container */}
      <div
        className={`w-full md:w-5/12 border-t md:border-t-0 md:border-l border-gray-700 bg-background-medium-900 hidden md:block h-full`}
      >
        <Container padding="none" title="Detalhes" fixedHeader bgColor="medium">
          <MatchDetailsHeader
            location={locationString}
            awayTeam={{
              logo: details.preMatchStatistics?.away.logo || "",
              name: details.preMatchStatistics?.away.name || "",
              form: details.preMatchStatistics?.away.statistics.form || "",
            }}
            homeTeam={{
              logo: details.preMatchStatistics?.home.logo || "",
              name: details.preMatchStatistics?.home.name || "",
              form: details.preMatchStatistics?.home.statistics.form || "",
            }}
            date={details.start}
          />
          <div className="w-full border-t border-background-light-100">
            <Tabs fullWidth tabs={generateTabs} textSize="sd" />
          </div>
        </Container>
      </div>

      {/* Mobile Modal */}
      <div className="block md:hidden">
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-background-medium-900">
            {/* Close Button */}
            <div className="flex justify-between items-center bg-background-medium-800 p-4">
              <h2 className="text-white text-lg">Detalhes do Jogo</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Match Details */}
            <div className="">
              <MatchDetailsHeader
                location={locationString}
                awayTeam={{
                  logo: details.preMatchStatistics?.away.logo || "",
                  name: details.preMatchStatistics?.away.name || "",
                  form: details.preMatchStatistics?.away.statistics.form || "",
                }}
                homeTeam={{
                  logo: details.preMatchStatistics?.home.logo || "",
                  name: details.preMatchStatistics?.home.name || "",
                  form: details.preMatchStatistics?.home.statistics.form || "",
                }}
                date={details.start}
              />
              <div className="h-[calc(100vh-271px)] w-full border-t border-background-light-600">
                <Tabs tabs={generateTabs} textSize="sd" bgColor="transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          className="fixed bottom-0 left-0 w-full bg-primary-500 text-background-heavy-500 py-3 text-lg font-semibold z-40"
          onClick={() => setIsModalOpen(true)}
        >
          Ver Detalhes do Jogo
        </button>
      </div>
    </>
  );
};

export default MatchDetailsContainer;
