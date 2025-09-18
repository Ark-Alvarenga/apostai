import { useTranslations } from "@/hooks/useTranslations";
import { ReactNode } from "react";

interface SolutionItemProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export const SolutionItem = ({ icon, title, text }: SolutionItemProps) => {
  const translations = useTranslations("solutionSection");

  return (
    <div className="w-full lg:w-1/3 h-full flex flex-col justify-start items-start px-6 py-4 rounded-lg border border-gray-600">
      <div className="lg:text-2xl font-bold text-primary-600 ml-auto -mb-5 lg:-mb-2">
        {icon}
      </div>
      <h4 className="text-2xl lg:text-4xl font-bold text-primary-800">
        {translations(title)}
      </h4>
      <p className="lg:text-xl text-white">{translations(text)}</p>
    </div>
  );
};
