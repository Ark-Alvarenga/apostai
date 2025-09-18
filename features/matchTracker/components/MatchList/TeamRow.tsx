import { TeamLogoImage } from "@/components/atoms/TeamLogo";
import { useTeamLogo } from "@/hooks";

interface TeamRowProps {
  logo: string | undefined;
  name: string | undefined;
  isSelected: boolean;
}

export const TeamRow: React.FC<TeamRowProps> = ({ logo, name, isSelected }) => {
  return (
    <div className="flex  items-center gap-2">
      {logo && <TeamLogoImage logo={logo} alt={name} size="sm" />}
      <span
        className={`truncate ${
          isSelected ? "text-background-heavy-500" : "text-background-gray-300"
        }`}
        style={{ maxWidth: "100%" }} // Garante o truncamento no limite da coluna
      >
        {name}
      </span>
    </div>
  );
};
