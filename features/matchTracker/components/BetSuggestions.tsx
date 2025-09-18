import React from "react";

export type BetSuggestionsType = {
  safe_bet: string;
  moderate_bet: string;
  risky_bet: string;
};

type BetSuggestionsProps = {
  betSuggestions?: BetSuggestionsType;
};

const BetSuggestions: React.FC<BetSuggestionsProps> = ({ betSuggestions }) => {
  return (
    betSuggestions && (
      <div className="mt-4 text-gray-300">
        <h2 className="text-2xl font-bold mb-4">🎯 Sugestões de Apostas</h2>
        <div className="space-y-4">
          <div className="p-4 bg-background-medium-700 text-gray-200 rounded-lg shadow-sm border-l-4 border-green-400">
            <h3 className="font-semibold text-lg text-green-300">
              Aposta Segura
            </h3>
            <p>{betSuggestions.safe_bet}</p>
          </div>

          <div className="p-4 bg-background-medium-700 text-gray-200 rounded-lg shadow-sm border-l-4 border-yellow-400">
            <h3 className="font-semibold text-lg text-secondary-300">
              Aposta Moderada
            </h3>
            <p>{betSuggestions.moderate_bet}</p>
          </div>

          <div className="p-4 bg-background-medium-700 text-gray-200 rounded-lg shadow-sm border-l-4 border-red-400">
            <h3 className="font-semibold text-lg text-red-300">
              Aposta Arriscada
            </h3>
            <p>{betSuggestions.risky_bet}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default BetSuggestions;
