import { FaQuestion } from "react-icons/fa6";
import { Tooltip } from ".";

interface TooltipIconProps {
  title: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl"; // Tamanho do ícone
  color?: "light" | "medium" | "heavy" | "transparent"; // Cor do ícone
}

const sizeClasses = {
  xxs: "w-3 h-3",
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  xl: "w-8 h-8",
};

const colorClasses = {
  light: "text-background-light-500",
  medium: "text-primary-500",
  heavy: "text-background-heavy-500",
  transparent: "text-transparent",
};

export const TooltipIcon: React.FC<TooltipIconProps> = ({
  title,
  size = "xxs",
  color = "medium",
}) => {
  return (
    <Tooltip title={title}>
      <div className="mx-1 p-1 rounded-full border border-gray-500">
        <FaQuestion className={`${sizeClasses[size]} ${colorClasses[color]}`} />
      </div>
    </Tooltip>
  );
};
