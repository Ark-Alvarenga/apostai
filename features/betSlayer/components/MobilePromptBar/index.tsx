import { Analysis } from "@/types";
import { useState } from "react";
import { PromptBar } from "../PromptBar";
import { FaSheetPlastic, FaToolbox } from "react-icons/fa6";
import { Button } from "@/components";
import { useTranslations } from "@/hooks/useTranslations";
import { IUsage } from "@/models";

interface MobilePromptBarProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setActualAnalysis: React.Dispatch<React.SetStateAction<Analysis | undefined>>;
  addUsageToHistory: (usage: IUsage) => void;
  setIsGeneratingAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobilePromptBar = ({
  isLoading,
  setIsLoading,
  setActualAnalysis,
  addUsageToHistory,
  setIsGeneratingAnalysis,
}: MobilePromptBarProps) => {
  const translations = useTranslations("promptBar");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperClass = `w-screen h-screen top-0 left-0 z-20 ${
    isOpen ? "fixed" : "hidden"
  }`;
  return (
    <>
      <div className="lg:hidden w-full fixed text-xl p-4 bottom-0 left-0 bg-background-heavy-500 border-t border-background-light-500 cursor-pointer z-10">
        <Button
          round="round"
          variant="outlined"
          weight="bold"
          icon={<FaSheetPlastic className="mr-2" />}
          text={translations("ctaMobile")}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className={wrapperClass}>
        <PromptBar
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setActualAnalysis={setActualAnalysis}
          closeBar={() => setIsOpen(false)}
          addUsageToHistory={addUsageToHistory}
          setIsGeneratingAnalysis={setIsGeneratingAnalysis}
        />
      </div>
    </>
  );
};
