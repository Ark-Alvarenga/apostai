import { TeamStatisticsResponse } from "football-wrapper";
import { GoalTotalCard } from "./GoalTotalCard";
import { GoalsByMinuteChart } from "./GoalsByMinuteChart";
import { OverUnderCard } from "./OverUnderCard";
import Insights from "../../../Insigths";

type TeamGoalsProps = {
  goalsData?: TeamStatisticsResponse["goals"];
  insights?: string[];
};

export const TeamGoals: React.FC<TeamGoalsProps> = ({
  goalsData,
  insights,
}) => {
  if (!goalsData) {
    return (
      <div className="bg-background-heavy-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-center">Sem dados disponíveis</h3>
        <p className="text-background-medium-300 text-sm text-center">
          Nenhuma estatística de gols foi encontrada para este time.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      <GoalTotalCard
        type="for"
        total={goalsData.for.total}
        average={goalsData.for.average}
      />

      <GoalTotalCard
        type="against"
        total={goalsData.against.total}
        average={goalsData.against.average}
      />
      <div className="col-span-1 lg:col-span-2">
        {insights && <Insights insights={insights} />}
      </div>

      <div className="col-span-1 lg:col-span-2">
        <GoalsByMinuteChart minuteData={goalsData} />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <OverUnderCard underOverData={goalsData.for.under_over} />
      </div>
    </div>
  );
};
