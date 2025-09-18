import React from "react";
import { Pill, ToggleSwitch } from "@/components";
import { getLeagueNameByApiName } from "@nextGames/constants/leagueInfos";
import { sortLeaguesByOrder } from "../../constants/leagueInfos";

interface FilterContainerProps {
  leagueNames: string[];
  selectedLeagues: string[];
  onLeagueChange: (league: string) => void;
  filterToday: boolean;
  onFilterTodayChange: () => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  leagueNames,
  selectedLeagues,
  onLeagueChange,
  filterToday,
  onFilterTodayChange,
}) => {
  return (
    <>
      {/* Filtro de "Apenas jogos hoje" */}
      <div className="w-full flex items-center border-b border-background-light-300">
        <div className="min-w-[60px] flex justify-center items-center border-r border-background-light-300 px-2 py-2.5 mr-4">
          <h3 className="text-md font-semibold text-gray-200">Data</h3>
        </div>
        <Pill
          label="Hoje"
          type="checkbox"
          checked={filterToday}
          onChange={onFilterTodayChange}
          className="sr-only peer"
        />
      </div>

      {/* Filtros de Ligas */}
      <div className="w-full flex items-center">
        <div className="min-w-[60px] flex justify-center items-center border-r border-background-light-300 px-2 py-2.5 mr-4">
          <h3 className="text-md font-semibold text-gray-200">Ligas</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pr-4">
          {sortLeaguesByOrder(leagueNames).map((league) => (
            <Pill
              label={getLeagueNameByApiName(league) || league}
              type="checkbox"
              checked={selectedLeagues.includes(league)}
              onChange={() => onLeagueChange(league)}
              className="sr-only peer"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterContainer;
