
import { InternalFixture } from "@/types/InternalFixture";
import { leaguesInfos } from "@nextGames/constants/leagueInfos";

type GroupedFixtures = {
  [leagueName: string]: InternalFixture[];
};

export const groupFixturesByLeague = (
  fixtures: InternalFixture[]
): GroupedFixtures => {
  const grouped = fixtures.reduce((grouped, fixture) => {
    const { leagueName } = fixture;

    if (!grouped[leagueName]) {
      grouped[leagueName] = [];
    }

    grouped[leagueName].push(fixture);

    return grouped;
  }, {} as GroupedFixtures);

  // Ordenação das ligas com base na propriedade order
  return Object.fromEntries(
    Object.entries(grouped)
      .map(([leagueName, fixtures]) => ({
        leagueName,
        fixtures,
        order:
          leaguesInfos.find((league) => league.apiName === leagueName)?.order ?? Infinity,
      }))
      .sort((a, b) => a.order - b.order)
      .map(({ leagueName, fixtures }) => [leagueName, fixtures])
  );
};
