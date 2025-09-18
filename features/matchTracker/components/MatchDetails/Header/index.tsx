import React from "react";
import Last5Results from "./Last5Results";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { Container } from "@/components";
import { TeamLogoImage } from "@/components/atoms/TeamLogo";

interface MatchDetailsHeaderProps {
  homeTeam: {
    name: string;
    logo: string;
    form: string;
  };
  awayTeam: {
    name: string;
    logo: string;
    form: string;
  };
  date: string | Date; // Aceita string ou objeto Date
  location: string;
}

const MatchDetailsHeader: React.FC<MatchDetailsHeaderProps> = ({
  homeTeam,
  awayTeam,
  date,
  location,
}) => {
  return (
    <Container bgColor="medium">
      <div className="w-full flex items-center justify-between">
        {/* Home Team */}
        <div className="flex flex-col items-center">
          <TeamLogoImage
            logo={homeTeam.logo}
            alt={homeTeam.name}
            sizeLg="xl"
            size="lg"
          />
          <span className="text-sm font-medium text-gray-300">
            {homeTeam.name}
          </span>
          <Last5Results form={homeTeam.form} />
        </div>

        <span className="text-lg font-semibold text-gray-200">VS</span>

        {/* Away Team */}
        <div className="flex flex-col items-center">
          <TeamLogoImage
            logo={awayTeam.logo}
            alt={awayTeam.name}
            sizeLg="xl"
            size="lg"
          />
          <span className="text-sm font-medium text-gray-300">
            {awayTeam.name}
          </span>
          <Last5Results form={awayTeam.form} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 justify-between border-t border-background-light-100 pt-4 mt-2 text-gray-300 font-bold text-xs lg:text-sm">
        <div className="flex items-center gap-2">
          <FaLocationDot />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarDays />
          {`
          ${new Date(date).toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          | 
          ${new Date(date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </div>
      </div>
    </Container>
  );
};

export default MatchDetailsHeader;
