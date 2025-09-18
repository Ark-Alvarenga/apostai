import React from "react";
import { FaCrown, FaFutbol, FaLightbulb } from "react-icons/fa";
import Insights from "../../../Insigths";
import BetSuggestions, { BetSuggestionsType } from "../../../BetSuggestions";
import { Container } from "@/components";

interface Predictions {
  winner: {
    id: number;
    name: string;
    comment: string;
  };
  win_or_draw: boolean;
  under_over: string;
  goals: {
    home: string;
    away: string;
  };
  advice: string;
  percent: {
    home: string;
    draw: string;
    away: string;
  };
}

interface PredictionsSectionProps {
  predictions?: Predictions;
  resume: string | undefined;
  insights?: string[];
  betSuggestions?: BetSuggestionsType;
}

const PredictionsSection: React.FC<PredictionsSectionProps> = ({
  predictions,
  resume,
  insights,
  betSuggestions,
}) => {
  if (!predictions) {
    return (
      <div className="bg-background-medium-800 p-6 rounded-lg shadow-lg w-full max-w-lg text-white">
        <h2 className="text-md font-bold mb-4">Previsões da Partida</h2>
        <p className="text-gray-400">Nenhum dado disponível no momento.</p>
      </div>
    );
  }

  return (
    <Container bgColor="medium800">
      {/* Título */}
      <h2 className="text-lg font-bold text-secondary-500 text-center border-b border-gray-700 pb-2">
        Previsões da Partida
      </h2>

      <p className="text-gray-300 text-sm py-4">{resume || ""}</p>

      <div className="col-span-1 lg:col-span-2">
        {insights && <Insights insights={insights} />}
      </div>

      {/* Vencedor Previsto */}
      <div className="bg-background-heavy-900 p-3 rounded-md shadow-md hover:bg-background-heavy-600 transition-all mt-4 text-gray-300">
        <div className="flex items-center gap-3">
          <FaCrown className="text-secondary-400 text-md" />
          <h3 className="text-md font-bold">Vencedor Previsto</h3>
        </div>
        <p className="mt-2">
          <span className="font-semibold">{predictions.winner?.name}</span>
          {predictions.winner.comment}
        </p>
      </div>

      {/* Chance de Vitória ou Empate */}
      <div className="bg-background-heavy-900 p-3 rounded-md shadow-md hover:bg-background-heavy-600 transition-all mt-4 text-gray-300">
        <div className="flex items-center gap-3">
          <FaLightbulb
            className={`text-md ${
              predictions.win_or_draw ? "text-green-400" : "text-red-400"
            }`}
          />
          <h3 className="text-md font-semibold text-gray-300">
            Chance de Vitória ou Empate
          </h3>
        </div>
        <p
          className={`mt-2 font-bold ${
            predictions.win_or_draw ? "text-green-400" : "text-red-400"
          }`}
        >
          {predictions.win_or_draw ? "Sim" : "Não"}
        </p>
      </div>

      {/* Gols Previstos */}
      <div className="bg-background-heavy-900 p-3 rounded-md shadow-md hover:bg-background-heavy-600 transition-all mt-4 text-gray-300">
        <div className="flex items-center gap-3">
          <FaFutbol className="text-blue-400 text-md" />
          <h3 className="text-md font-bold text-gray-300">Previsão de Gols</h3>
        </div>
        <div className="flex justify-between mt-3">
          <p>
            <span className="font-semibold text-gray-300">Casa:</span>{" "}
            <span className="text-secondary-500">
              {" "}
              {predictions.goals.home}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-300">Visitante:</span>{" "}
            <span className="text-secondary-500">
              {" "}
              {predictions.goals.away}
            </span>
          </p>
        </div>
      </div>

      {/* Aconselhamento */}
      <div className="bg-background-heavy-900 p-3 rounded-md shadow-md hover:bg-background-heavy-600 transition-all mt-4 text-gray-300">
        <h3 className="text-md font-bold">Aconselhamento</h3>
        <p className="mt-2 text-gray-300">{predictions.advice}</p>
      </div>

      <div className="col-span-1 lg:col-span-2 mb-10">
        <BetSuggestions betSuggestions={betSuggestions} />
      </div>
    </Container>
  );
};

export default PredictionsSection;
