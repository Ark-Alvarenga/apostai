import { ChartConfiguration } from "chart.js";

export type CardsData = {
  yellow: Record<string, { total: number | null; percentage: string | null }>;
  red: Record<string, { total: number | null; percentage: string | null }>;
};

export const generateCardsChartConfig = (
  cardsData: CardsData
): ChartConfiguration<"bar"> => {
  const labels = Object.keys(cardsData.yellow);

  const yellowData = labels.map((key) =>
    cardsData.yellow[key]?.total !== undefined &&
    cardsData.yellow[key]?.total !== null
      ? cardsData.yellow[key].total
      : 0
  );

  const redData = labels.map((key) =>
    cardsData.red[key]?.total !== undefined &&
    cardsData.red[key]?.total !== null
      ? cardsData.red[key].total
      : 0
  );

  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Cartões Amarelos",
          data: yellowData,
          backgroundColor: "#FACC15", // Amarelo vibrante
          borderColor: "#88680C", // Amarelo escuro para borda
          borderWidth: 1,
        },
        {
          label: "Cartões Vermelhos",
          data: redData,
          backgroundColor: "#EF4444", // Vermelho vibrante
          borderColor: "#A51C2F", // Vermelho escuro para borda
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14, // Tamanho da fonte da legenda
            },
            color: "#FFFFFF", // Cor branca para contraste
          },
        },
        title: {
          display: true,
          text: "Distribuição de Cartões por Intervalo de Tempo",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#FFFFFF", // Título em branco
        },
      },
      scales: {
        x: {
          grid: {
            color: "#444444", // Linhas da grade em cinza escuro
          },
          ticks: {
            color: "#CCCCCC", // Texto em cinza claro
            font: {
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#444444", // Linhas da grade em cinza escuro
          },
          ticks: {
            color: "#CCCCCC", // Texto em cinza claro
            font: {
              size: 12,
            },
          },
        },
      },
      layout: {
        padding: 10,
      },
    },
  };
};
