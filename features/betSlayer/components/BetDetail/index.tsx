import { Badge } from "@/components";
import { BadgeColor } from "@/components/atoms/Badge";
import { useTranslations } from "@/hooks/useTranslations";
import { BetAnalysis } from "@/types";
import { getBadges } from "@betSlayer/helpers";
import React from "react";

export type BetDetailProps = {
  bet: BetAnalysis;
};

export const BetDetail: React.FC<BetDetailProps> = ({ bet }) => {
  const translations = useTranslations("strategyContainer");
  const tOptions = useTranslations("betSelector");

  const badges = getBadges(bet);
  return (
    <div className="p-4 bg-background-heavy-700 border border-background-light-500 rounded-xl">
      <div className="w-full flex flex-col-reverse lg:flex-row justify-start lg:justify-between items-start lg:items-center">
        <h3 className="text-white text-lg font-bold">
          {tOptions(bet.type.replaceAll(" ", "").trim()) || bet.type}
        </h3>
        <div className="flex gap-2">
          {badges.map((badge) => (
            <Badge
              size="small"
              color={badge.color as BadgeColor}
              text={badge.text}
            />
          ))}
        </div>
      </div>
      <h4 className="text-white text-md font-bold">
        {translations("detailBetOn")}
        <span className="text-primary-600">{bet.betOn}</span>
      </h4>
      <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-2 lg:mt-0">
        <div>
          <label className="text-white text-sm font-bold">
            {translations("detailOdds")}
          </label>
          <span className="text-white">{bet.odds}</span>
        </div>
        <div>
          <label className="text-white text-sm font-bold">
            {translations("detailAmmount")}
          </label>
          <span className="text-white">${bet.betAmount}</span>
        </div>
        <div className="col-span-2">
          <label className="text-white text-sm font-bold">
            {translations("detailRationale")}
          </label>
          <p className="text-white">{bet.rationale}</p>
        </div>
        <div>
          <label className="text-white text-sm font-bold">
            {translations("detailProbability")}
          </label>
          <span className="text-white">
            {((1 / bet.odds) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};
