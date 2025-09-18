import { InternalFixture } from "@/types/InternalFixture";
import { TeamRow } from "./TeamRow";
import moment from "moment";
import { OddsRow } from "./OddsRow";

interface FixtureRowProps {
  fixture: InternalFixture;
  isSelected: boolean;
  handleSelectMatch: (match: InternalFixture) => void;
}

export const FixtureRow: React.FC<FixtureRowProps> = ({
  fixture,
  isSelected,
  handleSelectMatch,
}) => (
  <>
    <tr
      className={`h-14 border-b border-background-medium-400 cursor-pointer ${
        isSelected
          ? "bg-primary-600"
          : "bg-background-heavy-500 hover:bg-background-light-600"
      }`}
      onClick={() => handleSelectMatch(fixture)}
    >
      {/* Horário */}
      <td
        className={`w-1/6 px-2 py-2 text-sm ${
          isSelected ? "text-background-heavy-500" : "text-background-gray-300"
        }`}
      >
        {moment(fixture.start).format("ddd HH:mm")}
      </td>

      {/* Times */}
      <td className="w-5/12 py-2">
        <div className="flex gap-2 flex-col">
          <TeamRow
            logo={fixture.preMatchStatistics?.home.logo}
            name={fixture.preMatchStatistics?.home.name}
            isSelected={isSelected}
          />
          <TeamRow
            logo={fixture.preMatchStatistics?.away.logo}
            name={fixture.preMatchStatistics?.away.name}
            isSelected={isSelected}
          />
        </div>
      </td>

      {/* Odds */}
      <OddsRow preMatchOdds={fixture.preMatchOdds} isSelected={isSelected} />
    </tr>
  </>
);
