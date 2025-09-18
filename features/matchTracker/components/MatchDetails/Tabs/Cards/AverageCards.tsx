import React, { useEffect, useState } from "react";
import { CardsData } from "../../../../helpers/charts/generateCardsChartConfig";

// Função utilitária para processar os dados
const calculateCardsAverages = (cardsData: CardsData) => {
  let yellowCards = 0;
  let redCards = 0;
  let totalGames = 0;

  // Processar cartões amarelos
  for (const timeRange in cardsData.yellow) {
    const yellowCard = cardsData.yellow[timeRange].total;
    if (yellowCard !== null) {
      yellowCards += yellowCard;
      totalGames += 1; // Consideramos o total de jogos válidos com cartões amarelos
    }
  }

  // Processar cartões vermelhos
  for (const timeRange in cardsData.red) {
    const redCard = cardsData.red[timeRange].total;
    if (redCard !== null) {
      redCards += redCard;
    }
  }

  return {
    yellowCards,
    redCards,
    totalGames,
    yellowAverage:
      totalGames > 0 ? (yellowCards / totalGames).toFixed(2) : "0.00",
    redAverage: totalGames > 0 ? (redCards / totalGames).toFixed(2) : "0.00",
    totalAverage:
      totalGames > 0
        ? ((yellowCards + redCards) / totalGames).toFixed(2)
        : "0.00",
    totalCards: yellowCards + redCards,
  };
};

// Ícones dos cartões (SVG)
const YellowCardIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="yellow"
    className="w-6 h-6"
  >
    <rect
      x="5"
      y="3"
      width="14"
      height="18"
      rx="2"
      ry="2"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>
);

const RedCardIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="red"
    className="w-6 h-6"
  >
    <rect
      x="5"
      y="3"
      width="14"
      height="18"
      rx="2"
      ry="2"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>
);

interface AverageCardsProps {
  cardsData?: CardsData; // Dados podem não existir inicialmente
}

const AverageCards: React.FC<AverageCardsProps> = ({ cardsData }) => {
  const [averages, setAverages] = useState({
    yellowAverage: "0.00",
    redAverage: "0.00",
    totalAverage: "0.00",
    yellowCards: 0,
    redCards: 0,
    totalCards: 0,
  });

  // Recalcula as médias sempre que `cardsData` mudar
  useEffect(() => {
    if (cardsData) {
      const calculatedAverages = calculateCardsAverages(cardsData);
      setAverages(calculatedAverages);
    }
  }, [cardsData]);

  // Se não houver dados, não renderiza nada
  if (!cardsData) {
    return null;
  }

  const {
    yellowAverage,
    redAverage,
    totalAverage,
    yellowCards,
    redCards,
    totalCards,
  } = averages;

  return (
    <div className="bg-background-heavy-800 text-white p-4 rounded-lg shadow-md flex items-center justify-between gap-6">
      {/* Nome do indicador */}
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-bold">Estatísticas de Cartões</h3>
        <p className="text-gray-400 text-sm">Média de cartões por jogo</p>
      </div>

      {/* Média de cartões amarelos */}
      <div className="flex flex-col items-center">
        <YellowCardIcon />
        <p className="text-gray-300 text-sm mt-2">
          <span className="font-bold">{yellowAverage}</span>
        </p>
        <p className="text-gray-400 text-xs">Total: {yellowCards}</p>
      </div>

      {/* Média de cartões vermelhos */}
      <div className="flex flex-col items-center">
        <RedCardIcon />
        <p className="text-gray-300 text-sm mt-2">
          <span className="font-bold">{redAverage}</span>
        </p>
        <p className="text-gray-400 text-xs">Total: {redCards}</p>
      </div>

      {/* Média total */}
      <div className="flex flex-col items-center">
        <div className="text-gray-300 text-2xl font-bold">Σ</div>
        <p className="text-gray-300 text-sm mt-2">
          <span className="font-bold">{totalAverage}</span>
        </p>
        <p className="text-gray-400 text-xs">Total: {totalCards}</p>
      </div>
    </div>
  );
};

export default AverageCards;
