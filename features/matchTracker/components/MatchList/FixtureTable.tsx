import { InternalFixture } from "@/types/InternalFixture";
import { FixtureRow } from "./FixtureRow";
import { isMatchSelected } from "./utils";
import { useState } from "react";
import "moment/locale/pt-br";
import { getLeagueById } from "@nextGames/constants/leagueInfos";

interface FixtureTableProps {
  fixtures: InternalFixture[];
  leagueName: string;
  selectedMatch: InternalFixture | null;
  handleSelectMatch: (match: InternalFixture) => void;
}

const FixtureTable: React.FC<FixtureTableProps> = ({
  fixtures,
  leagueName,
  selectedMatch,
  handleSelectMatch,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const leagueId = fixtures[0].preMatchStatistics?.predictions?.league?.id;
  const league = leagueId ? getLeagueById(leagueId) : null;
  return (
    <div className="flex flex-col gap-2 bg-background-medium-500 w-full border-collapse table-fixed">
      <div className="w-full overflow-x-hidden">
        <table className="w-full text-left text-primary-50 border-collapse">
          <thead
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm  text-gray-300 bg-background-light-100 border-background-heavy-500 border-b cursor-pointer"
          >
            <tr>
              {league ? (
                <th className="px-4 py-1 text-left" colSpan={2}>
                  <div className="inline-flex items-center space-x-2">
                    <img
                      src={league.flag}
                      alt={league.name}
                      className="w-5 h-5 rounded-sm"
                    />
                    <span className="font-semibold pt-1">{league.name}</span>
                  </div>
                </th>
              ) : (
                <th className="px-4 py-1 text-left" colSpan={2}>
                  {leagueName}
                </th>
              )}

              {["1", "X", "2"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-1 text-center"
                  style={{ width: "80px" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          {isExpanded && (
            <tbody>
              {fixtures.length > 0 ? (
                fixtures.map((fixture: InternalFixture) => (
                  <FixtureRow
                    key={fixture.fixtureId}
                    fixture={fixture}
                    isSelected={isMatchSelected(selectedMatch, fixture)}
                    handleSelectMatch={handleSelectMatch}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center text-secondary-400"
                  >
                    Nenhum jogo encontrado para esta liga.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default FixtureTable;
