"use client";

import React, { useState } from "react";
import { Game } from "@/types";
import { BetDetail } from "../BetDetail";
import { FaCaretDown } from "react-icons/fa6";
import { ExternalAnalysisItem } from "./ExternalAnalysisItem";
import { useTranslations } from "@/hooks/useTranslations";

export type GameCardProps = {
  game: Game;
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const translations = useTranslations("strategyContainer");
  const [isOpen, setIsOpen] = useState(false);

  const caretStyle = `text-2xl transition-all duration-450 ${
    isOpen ? "rotate-180" : "rotate-0"
  }`;

  const contaierStyle = `${
    isOpen ? "w-[100%] lg:w-auto lg:rounded-lg lg:mx-0" : "rounded-lg lg:mx-0"
  } bg-background-heavy-800 shadow-md mb-4 overflow-hidden border border-background-light-500 transition-all duration-450`;

  return (
    <div className={contaierStyle}>
      <button
        className="w-full flex justify-between items-center p-3 lg:p-6 text-left md:text-lg font-semibold text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {game.match}
        <FaCaretDown className={caretStyle} />
      </button>
      {isOpen && (
        <>
          <div className="flex flex-col gap-4 px-6">
            {game.insightAboutGame && (
              <ExternalAnalysisItem
                label={translations("gameCardInsight")}
                analysis={game.insightAboutGame.analysis}
                relatedLinks={game.insightAboutGame.relatedLinks}
              />
            )}
            {game.wheaterAnalysis && (
              <ExternalAnalysisItem
                label={translations("gameCardWheater")}
                analysis={game.wheaterAnalysis.analysis}
                relatedLinks={game.wheaterAnalysis.relatedLinks}
              />
            )}
            {game.relatedNewsAnalysis && (
              <ExternalAnalysisItem
                label={translations("gameCardNews")}
                analysis={game.relatedNewsAnalysis.analysis}
                relatedLinks={game.relatedNewsAnalysis.relatedLinks}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 pb-6 px-3 lg:px-6 mt-2 lg:mt-4">
            <h6 className="lg:text-lg text-white font-bold">
              {translations("gameCardBets")}
            </h6>
            <div className="flex flex-col gap-6">
              {game.bets.map((bet, index) => (
                <BetDetail key={index} bet={bet} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
