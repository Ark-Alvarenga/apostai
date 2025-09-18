"use client";
import React, { useState } from "react";

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  collapsibleOnMobile?: boolean; // Prop para ativar/desativar a funcionalidade no mobile
  bgColor?: "light" | "medium" | "medium800" | "heavy" | "transparent";
  shadow?: "none" | "small" | "medium" | "large"; // Nova prop para sombras
  borderRadius?: "none" | "small" | "medium" | "large"; // Nova prop para bordas
  padding?: "none" | "small" | "medium" | "large"; // Nova prop para espaçamento interno
  headerPadding?: "none" | "small" | "medium" | "large"; // Nova prop para espaçamento interno do Header
  height?: "full" | "auto"; // Prop para controlar a altura do container
  fixedHeader?: boolean; // Prop para manter o header fixo
  addPadding?: boolean; // Prop para manter o header fixo
  extraClasses?: string; // Prop para adicionar classes extras
}

const bgColorClasses = {
  light: "bg-background-light-500",
  medium: "bg-background-medium-500",
  medium800: "bg-background-medium-800",
  heavy: "bg-background-heavy-500",
  transparent: "bg-transparent",
};

const shadowClasses = {
  none: "shadow-none",
  small: "shadow-sm",
  medium: "shadow-md",
  large: "shadow-lg",
};

const borderRadiusClasses = {
  none: "rounded-none",
  small: "rounded-sm",
  medium: "rounded-md",
  large: "rounded-lg",
};

const paddingClasses = {
  none: "p-0",
  small: "p-2",
  medium: "p-4",
  large: "p-6",
};

const heightClasses = {
  full: "h-full",
  auto: "h-auto",
};

export const Container: React.FC<ContainerProps> = ({
  title,
  children,
  collapsibleOnMobile = false,
  bgColor = "transparent",
  shadow = "medium",
  borderRadius = "none",
  padding = "medium",
  headerPadding = "medium",
  height = "full",
  fixedHeader = false,
  addPadding,
  extraClasses,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col w-full ${heightClasses[height]} ${
        bgColorClasses[bgColor]
      } ${shadowClasses[shadow]} ${borderRadiusClasses[borderRadius]} ${
        addPadding ? "pb-16" : ""
      } overflow-hidden  lg:pb-0 ${extraClasses}`}
    >
      {/* Header da Barra Lateral */}
      {title && (
        <div
          className={`flex justify-between items-center ${
            paddingClasses[headerPadding]
          } bg-background-light-500 border-b border-gray-700 ${
            fixedHeader ? "md:sticky top-0 z-10" : ""
          }`}
        >
          <h2 className="text-lg text-white font-semibold">{title}</h2>
          {collapsibleOnMobile && (
            <button
              onClick={toggleExpand}
              className="md:hidden flex items-center justify-center w-6 h-6 bg-background-medium-700 rounded-full"
              aria-label="Toggle Container"
            >
              <svg
                className={`w-5 h-5 text-white transform transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Conteúdo da Barra Lateral */}
      <div
        className={`flex-1 overflow-y-auto transition-max-height duration-300 ease-in-out ${
          collapsibleOnMobile
            ? isExpanded
              ? "max-h-screen"
              : "max-h-0 overflow-hidden"
            : "max-h-[calc(100vh-200px)] h-[calc(100vh-200px)] overflow-x-hidden"
        } md:max-h-none`}
      >
        <div className={`${paddingClasses[padding]}`}>{children}</div>
      </div>
    </div>
  );
};
