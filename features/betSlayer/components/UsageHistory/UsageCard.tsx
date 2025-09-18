"use client";
import { IUsage } from "@/models";
import React, { useState } from "react";
import { OverviewPanel } from "../OverviewPanel";
import { GameCard } from "../GameCard";
import { parseAndFormatLocalTime } from "@/helpers";
import { Game } from "@/types";
import { FaCaretDown } from "react-icons/fa6";
import { useTranslations } from "@/hooks/useTranslations";

export type GameCardProps = {
  usage: IUsage;
};

export const UsageCard = ({ usage }: GameCardProps) => {
  const translations = useTranslations("history");
  const [isOpen, setIsOpen] = useState(false);

  const caretStyle = `text-2xl transition-all duration-450 ${
    isOpen ? "rotate-180" : "rotate-0"
  }`;

  const contaierStyle = `${
    isOpen
      ? "w-[100%] lg:w-auto lg:rounded-lg lg:mx-8"
      : "rounded-lg mx-4 lg:mx-8"
  } bg-background-heavy-800 shadow-md mb-4 overflow-hidden border border-background-light-500 transition-all duration-450`;

  return (
    <div className={contaierStyle}>
      <button
        className="w-full flex justify-between items-center p-3 lg:p-6 text-white text-left text-sm lg:text-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {`${translations("usageCardAnalysisOf")} ${parseAndFormatLocalTime(
          usage.createdAt
        )}`}
        <FaCaretDown className={caretStyle} />
      </button>
      {isOpen && (
        <div className="p-3 pt-0 lg:p-6">
          <OverviewPanel analysis={usage.responseData} />
          <p className="lg:text-xl font-bold text-white mb-2">
            {translations("matches")}
          </p>
          {(usage.responseData.games as Game[]).map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};
