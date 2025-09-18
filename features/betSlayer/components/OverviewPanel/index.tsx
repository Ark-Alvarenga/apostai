import { useTranslations } from "@/hooks/useTranslations";
import { Analysis } from "@/types";
import React from "react";
interface OverviewItemProps {
  title: string;
  value: string;
}

const OverviewItem = ({ title, value }: OverviewItemProps) => {
  return (
    <div className="w-auto flex flex-col justify-center items-center p-4 rounded-xl border border-background-light-500">
      <label className="text-sm text-white font-semibold">{title}</label>
      <p className="text-2xl text-primary-600 text-center font-bold">{value}</p>
    </div>
  );
};

export const OverviewPanel: React.FC<{ analysis: Analysis }> = ({
  analysis,
}) => {
  const translations = useTranslations("strategyContainer");

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div>
        <h1 className="lg:text-xl text-white font-bold">
          {translations("overviewTitle")}
        </h1>
        <p className="text-sm lg:text-md text-theme-gray-50">
          {analysis.strategyIntroduction}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-around gap-4">
        <OverviewItem
          title={translations("overviewPotentialIncome")}
          value={`💰 $${analysis.totalPotentialIncome}`}
        />
        <OverviewItem
          title={translations("overviewProbableIncome")}
          value={`📊 $${analysis.mostProbableOutcomeIncome}`}
        />
        {analysis.overallRisk && (
          <OverviewItem
            title={translations("overviewOverallRisk")}
            value={`⚠️ ${analysis.overallRisk * 100}%`}
          />
        )}
        <OverviewItem
          title={translations("overviewTotalMatches")}
          value={`⚽ ${analysis.games.length}`}
        />
        {/* 
          @todo look into adding this other infos on the result if possible.

          Top Winning Bet 🏆
          Highlights the bet with the highest projected return based on the AI’s analysis. This gives users confidence in their most profitable option.
          <OverviewItem
            title="Top Winning Bet"
            value={`🏆 $${analysis.topWinningBet}`}
          />

          Success Rate of Strategy 📈
          Displays the historical success rate of the chosen strategy, providing transparency and reinforcing the value of BetSlayer’s predictions.
          <OverviewItem
            title="Success Rate of Strategy"
            value={`📈 ${analysis.successRate}%`}
          />

          AI Confidence Level 🔍
          Indicates how confident the AI is in its predictions for the current analysis, helping users gauge risk.
          <OverviewItem
            title="AI Confidence Level"
            value={`🔍 ${analysis.aiConfidenceLevel}%`}
          />
          Projected ROI 📊
          Shows the estimated Return on Investment based on the current strategy, letting users see the potential profitability.
          <OverviewItem
            title="Projected ROI"
            value={`📊 ${analysis.projectedROI}%`}
          />
          
          Highest Odds Advantage 🎲
          Highlights the best odds found across platforms, showing users where they can maximize their gains.
          <OverviewItem
            title="Highest Odds Advantage"
            value={`🎲 ${analysis.highestOddsPlatform} @ ${analysis.highestOdds}`}
          />

          Optimal Bet Timing ⏰
          Recommends the best time to place a bet based on real-time odds and game trends, helping users secure the best value.
          <OverviewItem
            title="Optimal Bet Timing"
            value={`⏰ ${analysis.optimalBetTime}`}
          />

          Recent Form & Streaks 🔥
          Provides insights into which teams or players are on hot streaks or slumps, allowing users to capitalize on momentum.
          <OverviewItem
            title="Recent Form & Streaks"
            value={`🔥 ${analysis.teamFormStreaks}`}
          /> 
        */}
      </div>
      <div>
        <p className="lg:text-xl font-bold text-white">
          {translations("overviewSummary")}
        </p>
        <p className="text-sm lg:text-md flex text-white">
          {analysis.strategySummary}
        </p>
      </div>
    </div>
  );
};
