import { ChartConfiguration } from "chart.js";

export type GoalsData = {
  for: {
    minute: Record<string, { total: number | null; percentage: string | null }>;
  };
  against: {
    minute: Record<string, { total: number | null; percentage: string | null }>;
  };
};

export const generateGoalsChartConfig = (
  goalsData: GoalsData
): ChartConfiguration<"bar"> => {
  const labels = Object.keys(goalsData.for.minute);

  const forData = labels.map((key) =>
    goalsData.for.minute[key]?.total !== undefined &&
    goalsData.for.minute[key]?.total !== null
      ? goalsData.for.minute[key].total
      : 0
  );

  const againstData = labels.map((key) =>
    goalsData.against.minute[key]?.total !== undefined &&
    goalsData.against.minute[key]?.total !== null
      ? goalsData.against.minute[key].total
      : 0
  );

  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Gols Marcados",
          data: forData,
          backgroundColor: "#00FF6A", // Verde para gols marcados
          borderColor: "#008D3B", // Verde escuro para borda
          borderWidth: 1,
        },
        {
          label: "Gols Sofridos",
          data: againstData,
          backgroundColor: "#EF4444", // Vermelho para gols sofridos
          borderColor: "#D32F2F", // Vermelho escuro para borda
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
          text: "Distribuição de Gols por Intervalo de Tempo",
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
