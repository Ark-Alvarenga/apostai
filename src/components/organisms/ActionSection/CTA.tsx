"use client";
import { Button } from "@/components/atoms";
import { EMAIL_INPUT_ID } from "@/constants";
import { focusElementById } from "@/helpers";
import { useTranslations } from "@/hooks/useTranslations";

export const ActionSectionCTA = () => {
  const handleClick = () => {
    focusElementById({
      elementId: EMAIL_INPUT_ID,
      smoothScroll: true,
      offset: -100,
      duration: 700,
    });
  };
  const translations = useTranslations("actionSection");

  return (
    <Button round="round" onClick={handleClick} text={translations("cta")} />
  );
};
