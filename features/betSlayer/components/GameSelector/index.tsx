"use client";
import { SelectedGameObj } from "@/types";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { SelectedGameItem } from "./SelectedGameItem";
import { AddGameModal } from "../AddGameModal";
import { TooltipIcon } from "@/components/molecules/Tooltip/TooltipIcon";
import { useTranslations } from "@/hooks/useTranslations";
import { useGetSubscriptions } from "@/hooks";

interface GameSelectorProps {
  selectedGames: SelectedGameObj[];
  setSelectedGames: React.Dispatch<React.SetStateAction<SelectedGameObj[]>>;
}

export const GameSelector = ({
  selectedGames,
  setSelectedGames,
}: GameSelectorProps) => {
  const translations = useTranslations("gameSelector");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { subscription } = useGetSubscriptions();

  if (!subscription)
    return <p>Error with subscription, please sign in again.</p>;

  const {
    features: { maxGamesInAnalisys },
  } = subscription;

  const handleSelectGame = (game: SelectedGameObj) => {
    setSelectedGames((prevState) => [...prevState, game]);
    setIsModalOpen(false);
  };

  const handleRemoveGame = (gameId: number) => {
    setSelectedGames((prevState) =>
      prevState.filter((game) => game.fixture.id !== gameId)
    );
  };

  const handleSelectBet = (newGame: SelectedGameObj) => {
    const updatedGames = selectedGames.map((game) => {
      const isTarget = game.fixture.id === newGame.fixture.id;
      return isTarget ? newGame : game;
    });

    setSelectedGames(updatedGames);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <h5 className="text-xl font-bold text-white flex items-center gap-2">
        {translations("games")}
        <TooltipIcon title={translations("gamesTooltip")} />
      </h5>
      <div className="flex flex-col gap-6 mt-3">
        {selectedGames.length
          ? selectedGames.map((game) => (
              <SelectedGameItem
                key={game.fixture.id}
                selectedGame={game}
                handleRemoveGame={handleRemoveGame}
                handleSelectBet={handleSelectBet}
              />
            ))
          : null}
        {selectedGames.length < maxGamesInAnalisys ? (
          <div
            className="w-full h-[50px] flex justify-center items-center border border-dashed hover:cursor-pointer hover:border-solid"
            onClick={() => setIsModalOpen(true)}
          >
            <p className="flex items-center gap-2 text-white font-bold">
              <FaPlus /> {translations("addGame")}
            </p>
          </div>
        ) : null}
      </div>
      <AddGameModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onApply={handleSelectGame}
        selectedGames={selectedGames}
      />
    </div>
  );
};
