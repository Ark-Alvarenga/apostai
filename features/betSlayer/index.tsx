"use client";

import { Tabs } from "@/components";
import { Analysis } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { FaChartBar } from "react-icons/fa6";
import { FaCog, FaHistory } from "react-icons/fa";
import {
  PromptBar,
  StrategyContainer,
  UsageHistory,
  UserConfigs,
  PageLoader,
} from "@betSlayer/components";
import { IUsage } from "@/models";
import { fetchUsagesByUser } from "@/services";
import { MobilePromptBar } from "./components/MobilePromptBar";

const BetSlayer = () => {
  const [actualAnalysis, setActualAnalysis] = useState<Analysis>();
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [usages, setUsages] = useState<IUsage[]>([]);

  const fetchUsage = async () => {
    setIsLoading(true);
    setIsGeneratingAnalysis(false);

    try {
      const response = await fetchUsagesByUser();
      setUsages(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  const generateTabs = useMemo(
    () => [
      {
        name: "analysis",
        icon: <FaChartBar />,
        content: (
          <StrategyContainer
            analysis={actualAnalysis || usages[usages.length - 1]?.responseData}
          />
        ),
      },
      {
        name: "history",
        icon: <FaHistory />,
        content: <UsageHistory usages={usages} />,
      },
      {
        name: "config",
        icon: <FaCog />,
        content: <UserConfigs />,
      },
    ],
    [actualAnalysis, usages]
  );

  const addUsageToHistory = (usage: IUsage) => {
    setUsages((prev) => [...prev, usage]);
  };

  return (
    <>
      <PageLoader isLoading={isLoading} showText={isGeneratingAnalysis} />
      <div className="w-full h-full flex ">
        <div className="hidden lg:block">
          <PromptBar
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setActualAnalysis={setActualAnalysis}
            addUsageToHistory={addUsageToHistory}
            setIsGeneratingAnalysis={setIsGeneratingAnalysis}
          />
        </div>

        <div className="max-h-full h-full w-full lg:max-w-[calc(100%-375px)] border-t border-theme-gray-300 lg:overflow-y-scroll pb-14">
          <Tabs highlightActiveTab tabs={generateTabs} />
        </div>
      </div>

      <MobilePromptBar
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setActualAnalysis={setActualAnalysis}
        addUsageToHistory={addUsageToHistory}
        setIsGeneratingAnalysis={setIsGeneratingAnalysis}
      />
    </>
  );
};

export default BetSlayer;
