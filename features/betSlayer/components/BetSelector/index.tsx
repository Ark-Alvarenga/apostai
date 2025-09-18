"use client";
import { decodeHtmlEntity } from "@/helpers";
import { useGetSubscriptions } from "@/hooks";
import { useTranslations } from "@/hooks/useTranslations";
import { SelectedGameObj, Subscription } from "@/types";
import {
  filterBookmakers,
  getUniqueBetsWithHighestOdds,
} from "@betSlayer/helpers";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

interface SelectedGameItemProps {
  isBetOptionsOpen: boolean;
  handleSelectBet: (newGame: SelectedGameObj) => void;
  selectedGame: SelectedGameObj;
}

type SelectOption = MultiValue<{
  value: number;
  label: React.JSX.Element;
}>;

export const BetSelector = ({
  isBetOptionsOpen,
  handleSelectBet,
  selectedGame,
}: SelectedGameItemProps) => {
  const translations = useTranslations("betSelector");
  const { subscription, isLoading } = useGetSubscriptions();

  const filteredBookmakers = filterBookmakers(selectedGame.bookmakers);
  const possibleBets = getUniqueBetsWithHighestOdds(filteredBookmakers);

  const options = possibleBets?.map((betPossibility) => ({
    value: betPossibility.id,
    label: (
      <div className="text-background-heavy-500" style={{ display: "flex", alignItems: "center" }}>
       {translations(betPossibility.name.replaceAll(" ", "").trim()) ||
          betPossibility.name}
      </div>
    ),
  }));

  const selectBet = (option: SelectOption) => {
    const selectedBets = [...option];
    handleSelectBet({ ...selectedGame, selectedBets });
  };

  const customFilter = (option: any, inputValue: string): boolean => {
    const labelFromOption = decodeHtmlEntity(option.label.props.children);
    return labelFromOption.toLowerCase().includes(inputValue.toLowerCase());
  };

  if (isLoading) return <></>;

  const {
    features: { maxBetsPerGame = 2 },
  } = subscription as Subscription;

  return (
    <div
      className="w-full flex justify-center align-center bg-background-heavy-800 transition-all duration-450"
      style={{
        height: isBetOptionsOpen ? "auto" : "0px",
        overflow: isBetOptionsOpen ? "visible" : "hidden",
        padding: isBetOptionsOpen ? "6px" : "0px",
      }}
    >
      <Select
        isMulti
        onChange={selectBet}
        isOptionDisabled={() =>
          !!selectedGame.selectedBets &&
          selectedGame.selectedBets.length >= maxBetsPerGame
        }
        options={options}
        className="w-full mt-1"
        classNamePrefix="react-select"
        filterOption={customFilter}
      />
    </div>
  );
};
