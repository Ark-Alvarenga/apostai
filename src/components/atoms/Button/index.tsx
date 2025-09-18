import Image from "next/image";
import React from "react";
import SpinnerWhite from "@/images/spinner_white.svg";

type ButtonVariant = "solid" | "outlined" | "transparent";
type ButtonSize = "small" | "medium" | "large";
type ButtonRound = "none" | "round" | "circle";
type FontWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "normal"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
  round?: ButtonRound;
  type?: "button" | "reset" | "submit" | undefined;
  weight?: FontWeight;
  disabled?: boolean;
  icon?: React.JSX.Element;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "solid",
  size = "medium",
  className = "",
  isLoading = false,
  round = "none",
  type = "button",
  weight = "normal",
  disabled,
  icon,
}) => {
  const disabledClasses =
    "disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed disabled:bg-transparent";
  const animationClasses = "transition-all duration-400";
  const baseClasses = `outline-none flex justify-center items-center w-full focus:outline-none ${animationClasses} ${disabledClasses}`;

  // Define variant-specific classes
  const variantClasses = {
    solid:
      "bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-700 transition-all duration-400",
    outlined:
      "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-600 hover:text-white  transition-all duration-400",
    transparent:
      "bg-transparent text-primary-600 hover:bg-primary-100 disabled:bg-primary-100 transition-all duration-400",
  };

  const roundClasses = {
    circle: "rounded-full",
    round: "rounded-lg",
    none: "",
  };

  // Define size-specific classes
  const sizeClasses = {
    small: "text-sm py-1.5 px-2",
    medium: "text-base py-2 px-3",
    large: "text-lg py-2.5 px-4",
  };

  // Define size-specific classes
  const fontWeightClasses = {
    thin: "font-thin",
    extraLight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semiBold: "font-semibold",
    bold: "font-bold",
    extraBold: "font-extrabold",
    black: "font-black",
  };

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${roundClasses[round]} ${sizeClasses[size]} ${fontWeightClasses[weight]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? (
        <Image src={SpinnerWhite} width={24} height={24} alt="spinner" />
      ) : (
        <div className="flex justify-center items-center">
          {icon} {text}
        </div>
      )}
    </button>
  );
};
