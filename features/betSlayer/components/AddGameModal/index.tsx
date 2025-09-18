"use client";
import React, { useState } from "react";
import { Button, Modal } from "@/components";
import { useFixtures, useOdds } from "@/hooks";
import { toast } from "react-toastify";
import { SelectedGameObj } from "@/types";
import { LeagueSelect } from "../LeagueSelect";
import { CountrySelect } from "../CountrySelect";
import { GameSelection } from "../GameSelection";
import { useTranslations } from "@/hooks/useTranslations";

interface AddGameModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onApply: (game: SelectedGameObj) => void;
  selectedGames: SelectedGameObj[];
}

export const AddGameModal: React.FC<AddGameModalProps> = ({
  isOpen,
  closeModal,
  onApply,
  selectedGames,
}) => {
  const translations = useTranslations("gameSelector");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedLeagueId, setSelectedLeagueId] = useState("");
  const [selectedGame, setSelectedGame] = useState<SelectedGameObj>();

  const {
    odds,
    isLoading: isOddsLoading,
    isError: isOddsError,
  } = useOdds({ leagueId: selectedLeagueId });

  const {
    fixtures,
    isLoading: isFixturesLoading,
    isError: isFixturesError,
  } = useFixtures(selectedLeagueId);

  const handleSelectCountry = (countryId: string) => {
    setSelectedCountryId(countryId);
    setSelectedLeagueId("");
  };

  const handleSelectLeague = (leagueId: string) => {
    setSelectedLeagueId(leagueId);
    setSelectedGame(undefined);
  };

  const handleSelectGame = (game: SelectedGameObj) => {
    const alreadySelected = selectedGame?.fixture.id === game.fixture.id;

    if (alreadySelected) {
      setSelectedGame(undefined);
    } else {
      setSelectedGame(game);
    }
  };

  const resetState = () => {
    setSelectedCountryId("");
    setSelectedLeagueId("");
    setSelectedGame(undefined);
  };

  const handleApply = () => {
    if (!selectedGame) return toast.error(translations("selectAGame"));
    if (
      selectedGames.some((game) => game.fixture.id === selectedGame.fixture.id)
    )
      return toast.error(translations("gameIsAlreadySelected"));
    resetState();
    onApply(selectedGame);
  };

  const handleCancel = () => {
    resetState();
    closeModal();
  };

  return (
    <Modal size="lg" isOpen={isOpen} noScroll>
      <div className="w-full h-[90vh] flex flex-col gap-4 py-5 lg:py-10 px-4 lg:px-8 rounded-lg bg-background-heavy-500">
        <h3 className="text-xl font-bold mx-auto text-white">
          {translations("chooseGame")}
        </h3>
        <CountrySelect setSelectedCountryId={handleSelectCountry} />
        {selectedCountryId && (
          <LeagueSelect
            selectedCountryId={selectedCountryId}
            selectedLeagueId={selectedLeagueId}
            setSelectedLeagueId={handleSelectLeague}
          />
        )}
        {selectedLeagueId && (
          <GameSelection
            selectedGame={selectedGame?.fixture.id || 0}
            onSelectGame={handleSelectGame}
            odds={odds}
            fixtures={fixtures}
            isLoading={isOddsLoading || isFixturesLoading}
            isError={isOddsError || isFixturesError}
          />
        )}
        <div className="flex w-full gap-8 mt-auto">
          <Button
            variant="transparent"
            text={translations("cancel")}
            onClick={handleCancel}
          />
          <Button text={translations("apply")} onClick={handleApply} />
        </div>
      </div>
    </Modal>
  );
};
