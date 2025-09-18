import Image from "next/image";
import React from "react";
import Spinner from "@/images/spinner.svg";

interface InvisibleButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

export const InvisibleButton: React.FC<InvisibleButtonProps> = ({
  text,
  onClick,
  className = "",
  isLoading = false,
}) => {
  const baseClasses =
    "outline-none flex justify-center items-center w-auto focus:outline-none bg-transparent text-blue-600 ";

  // Combine all classes
  const classes = `${baseClasses} ${className}`;

  return (
    <button onClick={onClick} className={classes} disabled={isLoading}>
      {isLoading ? (
        <Image src={Spinner} width={24} height={24} alt="spinner" />
      ) : (
        text
      )}
    </button>
  );
};
