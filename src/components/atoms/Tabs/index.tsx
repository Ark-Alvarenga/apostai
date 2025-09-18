"use client";
import { useTranslations } from "@/hooks/useTranslations";
import React, { ReactNode, useState } from "react";

export interface Tab {
  name: string;
  icon?: ReactNode;
  imageUrl?: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  bgColor?:
    | "light"
    | "medium"
    | "heavy"
    | "transparent"
    | "primary"
    | "secondary";
  textSize?: "sd" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  fullWidth?: boolean;
  hideText?: boolean; // Nova propriedade opcional
  highlightActiveTab?: boolean; // Nova propriedade opcional
}

const textSizeClasses = {
  sd: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const iconSizeClasses = {
  sd: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
  "2xl": "w-8 h-8",
  "3xl": "w-10 h-10",
  "4xl": "w-12 h-12",
  "5xl": "w-14 h-14",
};

const bgColorClasses = {
  light: "bg-background-light-500",
  medium: "bg-background-medium-500",
  heavy: "bg-background-heavy-500",
  transparent: "bg-transparent",
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  textSize = "xl",
  bgColor = "transparent",
  fullWidth,
  hideText = false,
  highlightActiveTab = false,
}) => {
  const translations = useTranslations("tabs");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`${bgColorClasses[bgColor]} flex flex-col w-full h-full`}>
      <ul className="min-w-full max-w-full min-h-[50px] h-[50px] flex items-center overflow-x-auto scrollbar-hide border-b border-theme-gray-300">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`list-none h-full ${fullWidth ? "w-full" : ""}`}
          >
            <button
              className={`h-full ${
                fullWidth ? "w-full" : ""
              } group flex items-center justify-center pt-1 gap-2 text-gray-500 hover:text-white transition-all duration-450 font-bold px-8 
                ${
                  activeTab === index
                    ? highlightActiveTab
                      ? "border-b-4 border-primary-500 text-primary-500"
                      : "border-b-2 border-white text-white"
                    : "border-b border-transparent"
                }
                ${textSizeClasses[textSize]} whitespace-nowrap`}
              onClick={() => setActiveTab(index)}
            >
              {tab.imageUrl ? (
                <img
                  src={tab.imageUrl}
                  alt={tab.name}
                  className={`${iconSizeClasses[textSize]} object-contain`}
                />
              ) : (
                <span className={`${iconSizeClasses[textSize]}`}>
                  {tab.icon}
                </span>
              )}
              {!hideText && (translations(tab.name) || tab.name)}
            </button>
          </li>
        ))}
      </ul>
      <div className="h-full max-h-[calc(100%-34px)] lg:max-h-[calc(100%-50px)]">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`h-full tab-content ${
              activeTab === index ? "block" : "hidden"
            }`}
            aria-labelledby={`tab-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
