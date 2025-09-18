import { defaultFilterCriteria, useArbitrage } from "@/hooks/useArbitrage";
import React, { useState, useEffect } from "react";
import { Filters } from "./Filters";
import { DynamicOdds } from "./DynamicOdds";
import { Container } from "@/components";

type OddsPreMatchSectionProps = {
  fixtureId: number;
  leagueId: number;
};

export const OddsPreMatchSection: React.FC<OddsPreMatchSectionProps> = ({
  fixtureId,
  leagueId,
}) => {
  const { opportunities, allMarkets, setCriteria } = useArbitrage(
    leagueId,
    fixtureId
  );

  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [filterCriteria, setFilterCriteria] = useState(defaultFilterCriteria);

  useEffect(() => {
    setCriteria({ ...filterCriteria, relevantMarkets: selectedMarkets });
  }, [filterCriteria, selectedMarkets, setCriteria]);

  return (
    <Container bgColor="medium800" borderRadius="medium">
      <Filters
        allMarkets={allMarkets}
        selectedMarkets={selectedMarkets}
        onMarketChange={setSelectedMarkets}
        filterCriteria={filterCriteria}
        onCriteriaChange={(newCriteria) =>
          setFilterCriteria((prev) => ({ ...prev, ...newCriteria }))
        }
      />

      {/* Exibir mercados filtrados */}
      {opportunities.map((opportunity, index) => (
        <DynamicOdds
          key={index}
          market={opportunity.market}
          odds={opportunity.bestOdds!}
        />
      ))}

      {!opportunities ||
        (opportunities.length === 0 && (
          <div className="bg-background-heavy-800 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center">
              Nenhuma oportunidade encontrada
            </h3>
            <p className="text-background-medium-300 text-sm text-center">
              Não foram encontradas odds para os mercados disponíveis nesta
              partida.
            </p>
          </div>
        ))}
    </Container>
  );
};
