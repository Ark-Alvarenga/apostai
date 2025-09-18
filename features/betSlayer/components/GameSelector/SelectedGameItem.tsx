"use client";
import { useTranslations } from "@/hooks/useTranslations";
import { SelectedGameObj, Subscription } from "@/types";
import React, { useState } from "react";
import { BetSelector } from "../BetSelector";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useGetSubscriptions } from "@/hooks";

interface SelectedGameItemProps {
  handleRemoveGame: (gameId: number) => void;
  handleSelectBet: (newGame: SelectedGameObj) => void;
  selectedGame: SelectedGameObj;
}

export const SelectedGameItem = ({
  handleRemoveGame,
  handleSelectBet,
  selectedGame,
}: SelectedGameItemProps) => {
  const translations = useTranslations("gameSelector");
  const [isBetOptionsOpen, setIsBetOptionsOpen] = useState(false);
  const { subscription, isLoading } = useGetSubscriptions();

  if (isLoading) return <></>;

  const {
    features: { maxBetsPerGame = 2 },
  } = subscription as Subscription;

  return (
    <div className="flex flex-col">
      <p
        onClick={() => handleRemoveGame(selectedGame.fixture.id)}
        className="text-gray-500 text-sm font-bold m-0 ml-auto hover:cursor-pointer transition-text duration-300 hover:text-red-800"
      >
        {translations("remove")}
      </p>
      <div className="w-full h-[50px] flex justify-center items-center gap-1 border">
        <img className=" h-[30px]" src={selectedGame.teams.home.logo} />
        <p className="text-white">{selectedGame.teams.home.name}</p>
        <p className="text-white">VS</p>
        <p className="text-white">{selectedGame.teams.away.name}</p>
        <img className=" h-[30px]" src={selectedGame.teams.away.logo} />
      </div>
      <BetSelector
        isBetOptionsOpen={isBetOptionsOpen}
        handleSelectBet={handleSelectBet}
        selectedGame={selectedGame}
      />
      <div
        onClick={() => setIsBetOptionsOpen((prevState) => !prevState)}
        className="w-full py-2 flex justify-between items-center bg-background-heavy-700 rounded-b-lg cursor-pointer hover:bg-background-heavy-600 transition-colors"
      >
        <p className="text-sm text-gray-300 font-semibold px-4">
          {`${translations("selectBets")} (max: ${maxBetsPerGame})`}
        </p>
        <div className="text-gray-300 pr-4">
          {isBetOptionsOpen ? (
            <FaChevronUp size={16} />
          ) : (
            <FaChevronDown size={16} />
          )}
        </div>
      </div>
    </div>
  );
};
