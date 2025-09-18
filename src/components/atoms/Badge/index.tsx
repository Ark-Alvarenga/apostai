import { useTranslations } from "@/hooks/useTranslations";
import React, { FunctionComponent, ReactNode } from "react";

type BadgeSize = "small" | "medium" | "large";
type BadgeVariant = "solid" | "outlined";
type BadgeRound = "none" | "round" | "circle";

export type BadgeColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "purple"
  | "teal"
  | "dark-gray"
  | "light-green"
  | "cyan"
  | "pink"
  | "bg-red"
  | "gold";

interface BadgeProps {
  text: string;
  size?: BadgeSize;
  variant?: BadgeVariant;
  round?: BadgeRound;
  color?: BadgeColor;
  icon?: ReactNode;
  onClick?: () => void;
}

export const Badge: FunctionComponent<BadgeProps> = ({
  text,
  size = "medium",
  variant = "solid",
  round = "round",
  color = "blue",
  icon,
  onClick,
}) => {
  const translations = useTranslations("tags");

  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-2.5 py-0.5",
    large: "text-base px-3 py-1",
  };

  const roundClasses = {
    none: "",
    round: "rounded-lg",
    circle: "rounded-full",
  };

  // Updated color classes with new colors
  const colorClasses = {
    red: "text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300",
    "bg-red": "text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300",
    blue: "text-theme-gray-600 bg-secondary-500 dark:bg-secondary-500 dark:text-theme-gray-600",
    green: "text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300",
    yellow:
      "text-secondary-800 bg-yellow-100 dark:bg-yellow-900 dark:text-secondary-300",
    orange:
      "text-primary-800 bg-primary-100 dark:bg-primary-900 dark:text-primary-300",
    purple:
      "text-purple-800 bg-purple-100 dark:bg-purple-900 dark:text-purple-300",
    teal: "text-theme-gray-600 bg-primary-600 dark:bg-primary-600 dark:text-theme-gray-600",
    "dark-gray":
      "text-gray-800 bg-background-medium-100 dark:bg-background-medium-800 dark:text-gray-300",
    "light-green":
      "text-green-600 bg-green-50 dark:bg-green-800 dark:text-green-400",
    cyan: "text-cyan-800 bg-cyan-100 dark:bg-cyan-900 dark:text-cyan-300",
    pink: "text-pink-800 bg-pink-100 dark:bg-pink-900 dark:text-pink-300",
    gold: "text-secondary-700 bg-yellow-200 dark:bg-yellow-800 dark:text-secondary-300",
  };

  const variantClasses = {
    solid: `${colorClasses[color]}`,
    outlined: `border border-${color}-600 text-${color}-600 bg-transparent dark:text-${color}-300 dark:border-${color}-300`,
  };

  const baseClasses = "inline-flex items-center font-medium leading-none";
  const classes = `${baseClasses} ${sizeClasses[size]} ${roundClasses[round]} ${variantClasses[variant]}`;

  return (
    <span onClick={onClick} className={classes}>
      {icon && <span className="mr-2">{icon}</span>}
      {translations(text).toUpperCase()}
    </span>
  );
};
