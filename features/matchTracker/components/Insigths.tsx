import { Container } from "@/components";
import React from "react";
import { FaLightbulb, FaRobot } from "react-icons/fa";

interface InsightsProps {
  insights: string[];
}

const Insights: React.FC<InsightsProps> = ({ insights }) => {
  return (
    <Container bgColor="transparent" padding="none">
      <div className="flex items-center space-x-3 mb-4">
        <FaRobot className="text-secondary-500 text-2xl" size={30} />
        <h2 className="text-xl font-bold border-b-2 border-yellow-400 text-gray-300 pb-1">
          Insights Gerados por IA
        </h2>
      </div>
      <p className="text-gray-500 mb-4 text-xs italic">
        Estas análises foram geradas automaticamente com base nos dados
        fornecidos, trazendo previsões inteligentes e pontos-chave para ajudá-lo
        na tomada de decisão.
      </p>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 text-sm bg-background-heavy-900 p-3 rounded-md shadow-md hover:bg-background-heavy-600 transition-all"
          >
            <FaLightbulb
              className="text-secondary-500 flex-shrink-0"
              size={20}
            />
            <p className="text-gray-300">{insight}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Insights;
