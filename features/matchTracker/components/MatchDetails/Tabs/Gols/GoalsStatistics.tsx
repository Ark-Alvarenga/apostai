import React from "react";

interface GoalsStatisticsProps {
  data: {
    home: string;
    away: string;
  };
}

const GoalsStatistics: React.FC<GoalsStatisticsProps> = ({ data }) => {
  return (
    <div className="bg-background-heavy-800 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold border-b border-background-light-600 pb-2 mb-4">
        Estatísticas de Gols
      </h3>
      <div className="flex justify-between items-center gap-4">
        {/* Gols da Casa */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold text-secondary-400">🏠</div>
          <p className="text-sm text-background-medium-300 mt-1">Casa</p>
          <p className="text-xl font-bold mt-2">{data.home}</p>
        </div>

        {/* Divisor */}
        <div className="w-px bg-background-heavy-600 h-16"></div>

        {/* Gols do Visitante */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold text-red-400">🚶</div>
          <p className="text-sm text-background-medium-300 mt-1">Visitante</p>
          <p className="text-xl font-bold mt-2">{data.away}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalsStatistics;
