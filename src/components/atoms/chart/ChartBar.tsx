import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartConfiguration } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export interface ChartBarProps {
  chartConfig: ChartConfiguration<"bar">;
  size?: "sm" | "md" | "lg" | "xl"; // Adiciona a propriedade size
  description?: string; // Adiciona a propriedade opcional description
}

const ChartBar: React.FC<ChartBarProps> = ({
  chartConfig,
  size = "md",
  description,
}) => {
  // Define as alturas baseadas no tamanho
  const heightMap = {
    sm: "200px",
    md: "300px",
    lg: "400px",
    xl: "500px",
  };

  return (
    <div className="bg-background-medium-800 p-1 rounded-lg shadow-md">
      <div
        style={{
          width: "100%", // Largura total disponível
          height: heightMap[size], // Altura baseada no tamanho
        }}
      >
        <Bar options={chartConfig.options} data={chartConfig.data} />
      </div>
      {description && (
        <p className="text-gray-400 text-sm text-center mb-2">{description}</p>
      )}
    </div>
  );
};

export default ChartBar;
