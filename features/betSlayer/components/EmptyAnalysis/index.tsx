import React from "react";
import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslations";

export const EmptyAnalysis = () => {
  const translations = useTranslations("strategyContainer");

  return (
    <div className="w-full max-h-full h-full flex flex-col justify-center items-center py-4 px-8 bg-transparent">
      <Image src="/images/noAnalysisDark.png" alt="" width="300" height="240" />
      <h4 className="text-2xl text-white -mt-4">
        {translations("emptyAnalysisTitle")}
      </h4>
      <p className="max-w-full w-[375px] text-center text-lg text-gray-500">
        {translations("emptyAnalysisText")}
      </p>
    </div>
  );
};
