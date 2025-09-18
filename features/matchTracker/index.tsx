"use client";
import { useEffect, useMemo, useState } from "react";
import { useInternalFixtures } from "@/hooks/useInternalFixtures";
import { PageLoader } from "@betSlayer/components";
import FixtureTable from "./components/MatchList/FixtureTable";
import FilterContainer from "./components/Filter";
import MatchDetailsContainer from "./components/MatchDetails";
import { groupFixturesByLeague } from "./helpers/groupFixturesByLeague";
import { InternalFixture } from "@/types/InternalFixture";
import { Container } from "@/components";

interface MatchTrackerProps {
  period: "future" | "past";
}

const MatchTracker = ({ period }: MatchTrackerProps) => {
  const { fixtures, isLoading, isError } = useInternalFixtures({ period });
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [filterToday, setFilterToday] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<InternalFixture | null>(
    null
  );

  const fixturesByLeague = fixtures?.length
    ? groupFixturesByLeague(fixtures)
    : {};

  const leagueNames = Object.keys(fixturesByLeague);

  const filteredFixtures = useMemo(() => {
    if (!fixtures) return [];

    return fixtures.filter((fixture) => {
      const fixtureDate = new Date(fixture.start);
      const isToday = fixtureDate.toDateString() === new Date().toDateString();
      const isLeagueSelected =
        selectedLeagues.length === 0 ||
        selectedLeagues.includes(fixture.leagueName);

      return isLeagueSelected && (!filterToday || isToday);
    });
  }, [fixtures, selectedLeagues, filterToday]);

  useEffect(() => {
    if (!selectedMatch) {
      setSelectedMatch(filteredFixtures[0]);
    }
  }, [filteredFixtures, selectedMatch]);

  const handleLeagueFilterChange = (league: string) => {
    setSelectedLeagues((prev) =>
      prev.includes(league)
        ? prev.filter((l) => l !== league)
        : [...prev, league]
    );
  };

  return (
    <div className="h-full flex w-full min-h-full">
      <PageLoader isLoading={isLoading} showText={false} />
      <div className="md:overflow-y-scroll overflow-hidden flex flex-col w-full max-h-[calc(100%-50px)] md:h-full md:min-h-full gap-4 p-1 md:p-4">
        <div className="w-full">
          <Container
            height="auto"
            title="Filtros"
            collapsibleOnMobile
            bgColor="medium"
            padding="none"
          >
            <FilterContainer
              leagueNames={leagueNames}
              selectedLeagues={selectedLeagues}
              onLeagueChange={handleLeagueFilterChange}
              filterToday={filterToday}
              onFilterTodayChange={() => setFilterToday(!filterToday)}
            />
          </Container>
        </div>

        <div className="w-full h-[calc(100%-167px)] lg:h-auto">
          <Container
            height="auto"
            bgColor="medium"
            title="Ligas"
            padding="none"
            extraClasses="scrollbar-hide h-full md:h-full overflow-x-hiden"
          >
            {!isLoading &&
            filteredFixtures.length > 0 &&
            Object.keys(fixturesByLeague).length > 0 ? (
              Object.entries(groupFixturesByLeague(filteredFixtures)).map(
                ([leagueName, leagueFixtures]) => (
                  <div key={leagueName} className="w-full overflow-x-hidden">
                    <FixtureTable
                      leagueName={leagueName}
                      fixtures={leagueFixtures}
                      handleSelectMatch={(match) => setSelectedMatch(match)}
                      selectedMatch={selectedMatch}
                    />
                  </div>
                )
              )
            ) : (
              <div className="w-full h-auto p-6 text-center bg-background-medium text-gray-300 border border-gray-700 rounded">
                Nenhuma partida disponível para exibir no momento.
              </div>
            )}
          </Container>
        </div>
      </div>

      {selectedMatch && <MatchDetailsContainer details={selectedMatch} />}
    </div>
  );
};

export default MatchTracker;
