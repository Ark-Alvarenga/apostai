"use client";
import { decodeHtmlEntity } from "@/helpers/formatters/text";
import { useSoccerLeagues } from "@/hooks";
import { useTranslations } from "@/hooks/useTranslations";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Select from "react-select";
interface LeagueSelectProps {
  selectedCountryId: string;
  selectedLeagueId: string;
  setSelectedLeagueId: (key: string) => void;
}
const specialLeagues: any = {
  world: [13, 2, 3, 1039, 34, 536, 5],
  ES: [140, 141, 556, 142, 435],
  BR: [71, 72],
  "GB-ENG": [39, 45, 48, 40, 41, 42, 44],
  IT: [135, 137, 136, 547, 139],
  DE: [78, 81, 79, 80, 82, 1034],
  FR: [61, 66, 62, 64, 63],
};

export const LeagueSelect: React.FC<LeagueSelectProps> = ({
  selectedCountryId,
  selectedLeagueId,
  setSelectedLeagueId,
}) => {
  const translations = useTranslations("gameSelector");
  const { leagues, isLoading, isError } = useSoccerLeagues(selectedCountryId);

  if (isError) return <div>{translations("selectLeagueError")}</div>;
  if (!isLoading && !leagues)
    return <div>{translations("selectLeagueNotAvailable")}</div>;

  const customFilter = (option: any, inputValue: string): boolean => {
    const labelFromOption = decodeHtmlEntity(option.label.props.children[1]);
    return labelFromOption.toLowerCase().includes(inputValue.toLowerCase());
  };

  const sortedLeagues = leagues?.sort((a, b) => {
    const aCode = a.league.id;
    const bCode = b.league.id;

    const aIndex = specialLeagues[selectedCountryId]?.indexOf(aCode);
    const bIndex = specialLeagues[selectedCountryId]?.indexOf(bCode);

    if (aIndex !== -1 && bIndex !== -1) {
      // Both countries are special; sort according to their index in specialLeagues
      return aIndex - bIndex;
    } else if (aIndex !== -1) {
      // Only 'a' is special
      return -1;
    } else if (bIndex !== -1) {
      // Only 'b' is special
      return 1;
    } else {
      // Neither is special; maintain original order or sort alphabetically
      return 0;
    }
  });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = "/images/flags/worldFlag.webp";
  };

  const options = sortedLeagues?.map(({ league }) => {
    return {
      value: league.id,
      label: (
        <div className="text-background-heavy-500" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={league.logo}
            alt={String(league.id)}
            style={{ width: "20px", height: "15px", marginRight: "10px" }}
            loading="lazy"
            onError={handleImageError}
          />
          {decodeHtmlEntity(league.name)}
        </div>
      ),
    };
  });

  return (
    <div>
      <h4 className="text-lg text-white font-bold">
        {translations("selectLeague")}
      </h4>

      {isLoading ? (
        <Skeleton height={38} width="100%" count={1} />
      ) : (
        <Select
          onChange={(option) =>
            setSelectedLeagueId(String(option?.value) ?? "")
          }
          value={
            options?.find(
              (option) => option.value === Number(selectedLeagueId)
            ) || null
          }
          options={options}
          className="w-full mt-1 text-black"
          classNamePrefix="react-select"
          filterOption={customFilter}
          placeholder={translations("selectLeaguePlaceholder")}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />
      )}
    </div>
  );
};
