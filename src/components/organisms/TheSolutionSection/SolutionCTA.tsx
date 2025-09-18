"use client";
import { EMAIL_INPUT_ID } from "@/constants";
import { focusElementById } from "@/helpers";
import { useTranslations } from "@/hooks/useTranslations";

export const SolutionCTA = () => {
  const translations = useTranslations("solutionSection");
  const handleClick = () => {
    focusElementById({
      elementId: EMAIL_INPUT_ID,
      smoothScroll: true,
      offset: -100,
      duration: 700,
    });
  };

  return (
    <p className="text-md lg:text-2xl font-bold text-center lg:text-left text-white">
      {translations("ctaText")}
      <span onClick={handleClick} className="text-secondary-500 cursor-pointer">
        {translations("ctaLink")}
      </span>
    </p>
  );
};
