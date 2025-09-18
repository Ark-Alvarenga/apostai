import { useState, useCallback, useEffect } from "react";
import { Bookmaker, OddsFixture } from "football-wrapper";
import { AllowedBookmakers, BettingHouse } from "@/constants/bettingHouse";
import { oddsService } from "@/services/sportsAPI/apiWrapper";
import {
  FilteredMarketOpportunity,
  MarketOpportunity,
} from "@/types/InternalFixture";
import { getSeasonByLeagueId } from "../../features/matchTracker/constants/leagueInfos";

export interface FilterCriteria {
  minOdd?: number; // Odd mínima aceitável
  maxOdd?: number; // Odd máxima aceitável
  minBookmakers?: number; // Número mínimo de casas de apostas
  relevantMarkets?: string[]; // Lista de mercados de interesse
  arbitrageThreshold?: number; // Máximo valor de arbitragem para incluir
  allowedBookmakers?: string[]; // Lista de casas de apostas permitidas
}

export const defaultFilterCriteria: FilterCriteria = {
  minOdd: undefined, // Odds muito baixas são excluídas
  maxOdd: undefined, // Odds absurdamente altas são excluídas
  minBookmakers: undefined, // Mercados com ao menos 3 casas de apostas
  relevantMarkets: AllowedBookmakers, // Apenas mercados principais
  arbitrageThreshold: undefined, // Valor máximo de arbitragem (1 significa lucro garantido)
};

export const useArbitrage = (leagueId: number, fixtureId: number) => {
  const [opportunities, setOpportunities] = useState<MarketOpportunity[] | any>(
    []
  );
  const [filteredOpportunities, setFilteredOpportunities] = useState<
    MarketOpportunity[]
  >([]);
  const [allMarkets, setAllMarkets] = useState<
    { value: string; label: string }[] | any
  >([]);
  const [criteria, setCriteria] = useState<FilterCriteria>(
    defaultFilterCriteria
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Atualize mercados disponíveis
    const markets = Array.from(
      new Set(opportunities.map((opportunity: any) => opportunity.market))
    ).map((market) => ({ value: market, label: market }));
    setAllMarkets(markets);
  }, [opportunities]);

  useEffect(() => {
    // Filtra as oportunidades com base nos critérios
    const filtered = opportunities.filter((opportunity: any) =>
      isMarketValid(opportunity, criteria)
    );
    setFilteredOpportunities(filtered);
  }, [criteria, opportunities]);

  const fetchAndProcessOdds = useCallback(
    async (fetchCriteria: FilterCriteria = defaultFilterCriteria) => {
      setLoading(true);
      setError(null);

      try {
        const { response: oddsFixtures } = await oddsService.fetchFixtureOdds({
          fixture: fixtureId,
          season: getSeasonByLeagueId(leagueId),
        });

        if (!oddsFixtures || !Array.isArray(oddsFixtures)) {
          throw new Error("Odds fixtures inválidos ou ausentes.");
        }

        const processedMarkets = oddsFixtures.flatMap(
          (oddsFixture: OddsFixture) => {
            const filteredBookmakers = filterBookmakers(
              oddsFixture.bookmakers,
              fetchCriteria.allowedBookmakers
            );
            //fetchCriteria
            return getMarketsWithBestOdds(filteredBookmakers);
          }
        );

        setOpportunities(processedMarkets);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [fixtureId, leagueId]
  );

  const filterBookmakers = (
    bookmakers: Bookmaker[],
    allowedBookmakers: string[] = AllowedBookmakers
  ): Bookmaker[] => {
    return bookmakers.filter((bookmaker) =>
      allowedBookmakers.includes(bookmaker.name)
    );
  };

  const getMarketsWithBestOdds = (bookmakers: Bookmaker[]) => {
    const allMarkets = extractAllMarkets(bookmakers);

    return allMarkets.map((market) => {
      const marketOdds = extractMarketOdds(bookmakers, market.name);
      if (marketOdds.length === 0) return null;

      const bestOdds = findBestOdds(marketOdds);
      const arbitrageResult = calculateArbitrage(bestOdds);

      return {
        market: market.name,
        bestOdds,
        arbitrageResult,
        message: arbitrageResult.hasArbitrage
          ? "Arbitragem encontrada"
          : "Melhor odd encontrada",
      };
    });
  };

  const extractAllMarkets = (bookmakers: Bookmaker[]) => {
    const allMarketsSet = new Set<string>();
    bookmakers.forEach((bookmaker) => {
      bookmaker.bets?.forEach((bet) => {
        if (bet.values?.length) allMarketsSet.add(bet.name);
      });
    });
    return Array.from(allMarketsSet).map((name) => ({ name }));
  };

  const extractMarketOdds = (bookmakers: Bookmaker[], marketName: string) => {
    return bookmakers.flatMap(
      (bookmaker) =>
        bookmaker.bets
          ?.filter((bet) => bet.name === marketName)
          ?.flatMap((bet) =>
            bet.values.map((value) => ({
              bookmaker: bookmaker.name,
              result: value.value,
              odd: parseFloat(value.odd),
              link:
                BettingHouse.find((house) => house.name === bookmaker.name)
                  ?.link || "",
            }))
          ) ?? []
    );
  };

  const findBestOdds = (marketOdds: Array<any>) => {
    const bestOdds: Record<
      string,
      { bookmaker: string; odd: number; link: string }
    > = {};

    marketOdds.forEach(({ bookmaker, result, odd, link }) => {
      if (!bestOdds[result] || odd > bestOdds[result].odd) {
        bestOdds[result] = { bookmaker, odd, link };
      }
    });

    return bestOdds;
  };

  const calculateArbitrage = (
    bestOdds: Record<string, { bookmaker: string; odd: number }>
  ) => {
    const arbitrageValue = Object.values(bestOdds).reduce(
      (sum, { odd }) => sum + 1 / odd,
      0
    );

    return {
      arbitrageValue,
      hasArbitrage: arbitrageValue < 1,
    };
  };

  const isMarketValid = (
    market: FilteredMarketOpportunity,
    {
      minOdd,
      maxOdd,
      minBookmakers,
      arbitrageThreshold,
      relevantMarkets,
      allowedBookmakers,
    }: FilterCriteria
  ) => {
    // Odds do mercado
    const odds = Object.values(market.bestOdds || {});

    // Cálculos básicos
    const minMarketOdd = Math.min(...odds.map((o) => o.odd));
    const maxMarketOdd = Math.max(...odds.map((o) => o.odd));

    // Verificação de mercados relevantes
    const isRelevantMarket =
      !relevantMarkets ||
      relevantMarkets.length === 0 ||
      relevantMarkets.includes(market.market);

    // Verificação de casas de apostas permitidas
    const isAllowedBookmaker =
      !allowedBookmakers ||
      odds.every((o) => allowedBookmakers.includes(o.bookmaker));

    // Validação de critérios
    return (
      isRelevantMarket &&
      isAllowedBookmaker &&
      odds.length >= (minBookmakers || 0) &&
      minMarketOdd >= (minOdd || 0) &&
      maxMarketOdd <= (maxOdd || Infinity) &&
      (!arbitrageThreshold ||
        (market.arbitrageResult?.arbitrageValue ?? 0) <= arbitrageThreshold)
    );
  };

  useEffect(() => {
    if (leagueId && fixtureId) {
      fetchAndProcessOdds(criteria);
    }
  }, [leagueId, fixtureId, fetchAndProcessOdds]);

  return {
    opportunities: filteredOpportunities,
    loading,
    error,
    allMarkets,
    setCriteria, // Permite atualizar critérios dinamicamente
  };
};
