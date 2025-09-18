import { useTranslations } from "@/hooks/useTranslations";
import { ReactNode } from "react";

interface ProblemItemProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export const ProblemItem = ({ icon, title, text }: ProblemItemProps) => {
  const translations = useTranslations("problemSection");

  return (
    <div className="w-ful lg:w-1/3 h-full flex flex-col justify-start items-start gap-2 lg:gap-4 px-6 border-l border-gray-600">
      <div className="flex justify-start items-center gap-4 text-lg lg:text-2xl font-bold">
        <div className="text-primary-600">{icon}</div>
        <h4 className="text-primary-600">{translations(title)}</h4>
      </div>
      <p className="lg:text-xl text-white">{translations(text)}</p>
    </div>
  );
};
