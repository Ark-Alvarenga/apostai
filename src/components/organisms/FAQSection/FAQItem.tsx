"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
  const translations = useTranslations("faq");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((previous) => !previous);
  };

  const caretStyle = `text-3xl text-primary-800 transition-all duration-450 ${
    isOpen ? "rotate-180" : "rotate-0"
  }`;

  return (
    <div className="w-full flex flex-col justify-start items-start border-t border-background-light-600 transition-all duration-450 hover:border-primary-600">
      <div
        onClick={handleClick}
        className="w-full flex justify-between items-center cursor-pointer py-4 lg:py-8 transition-all duration-450 hover:opacity-80"
      >
        <h4 className="text-lg lg:text-2xl font-bold text-primary-600">
          {translations(question)}
        </h4>
        <FaCaretDown className={caretStyle} />
      </div>
      {isOpen && (
        <p className="text-white pb-4 lg:pb-8">{translations(answer)}</p>
      )}
    </div>
  );
};
