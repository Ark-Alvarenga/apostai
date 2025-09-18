import { FaMagic } from "react-icons/fa";
import { FaBullseye, FaClock } from "react-icons/fa6";
import { ProblemItem } from "./ProblemItem";
import { useTranslations } from "@/hooks/useTranslations";

const items = [
  {
    icon: <FaBullseye />,
    title: "lackPrecision",
    text: "lackPrecisionText",
  },
  {
    icon: <FaClock />,
    title: "rtAnalysis",
    text: "rtAnalysisText",
  },
  {
    icon: <FaMagic />,
    title: "expertGuidance",
    text: "expertGuidanceText",
  },
];

export const TheProblemSection = () => {
  const translations = useTranslations("problemSection");

  return (
    <div className="max-w-[1200px] flex flex-col justify-start items-center gap-2 lg:gap-6 px-6 py-8 lg:py-28 lg:mb-20 mx-auto">
      <p className="text-xs lg:text-sm font-bold text-primary-600">
        {translations("pretitle")}
      </p>
      <h2 className="max-w-[550px] text-2xl lg:text-5xl font-bold text-center text-primary-600">
        {translations("title")}
      </h2>
      <p className="text-sm lg:text-xl text-center text-white">
        {translations("subtitle")}
      </p>
      <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 lg:gap-0 mt-6 lg:mt-24">
        {items.map(({ icon, title, text }, index) => (
          <ProblemItem
            key={`${title}-${index}`}
            icon={icon}
            title={title}
            text={text}
          />
        ))}
      </div>
    </div>
  );
};
