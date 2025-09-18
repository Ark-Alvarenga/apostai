import { useTranslations } from "@/hooks/useTranslations";
import { FixtureResponse, OddsResponse, SelectedGameObj } from "@/types";
import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

export interface GameSelectionProps {
  selectedGame: number;
  onSelectGame: (game: SelectedGameObj) => void;
  odds: OddsResponse[] | undefined;
  fixtures: FixtureResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const GameSelection: React.FC<GameSelectionProps> = ({
  selectedGame,
  onSelectGame,
  odds,
  fixtures,
  isLoading,
  isError,
}) => {
  const translations = useTranslations("gameSelector");

  if (isLoading)
    return (
      <div className="h-[calc(100%-32px-118px-118px-28px-48px-40px)] md:h-[calc(100%-32px-94px-94px-28px-24px-40px)] flex flex-col">
        <h4 className="text-md text-white font-bold">
          {translations("selectGame")}
        </h4>

        <div className="w-full h-full py-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          <Skeleton height={79} width="100%" count={1} />
          <Skeleton height={79} width="100%" count={1} />
          <Skeleton height={79} width="100%" count={1} />
        </div>
      </div>
    );
  if (isError) return <div>{translations("selectGameError")}</div>;
  if (!odds?.length || !fixtures?.length) {
    return (
      <div className="text-white text-center">
        {translations("selectGameNotAvailable")}
      </div>
    );
  }

  const usableGames = useMemo(() => {
    const result: SelectedGameObj[] = [];

    odds.map((oddsData) => {
      const { fixture } = oddsData;
      const extraData = fixtures.find((item) => item.fixture.id === fixture.id);

      if (!extraData) return;

      result.push({
        ...oddsData,
        ...extraData,
      });
    });

    return result;
  }, [odds, fixtures]);

  const handleSelectGame = (game: SelectedGameObj) => {
    onSelectGame(game);
  };

  return (
    <div className="h-[calc(100%-32px-70px-70px-28px-48px-25px)] md:h-[calc(100%-32px-94px-94px-28px-24px-25px)] flex flex-col overflow-y-auto">
      <h4 className="text-lg text-white font-bold">
        {translations("selectGame")}
      </h4>

      <div className="w-full h-full pb-2 pr-1 flex flex-col justify-start items-center gap-4 overflow-y-auto">
        {usableGames?.map((game) => {
          const { fixture } = game;
          const extraData = fixtures.find(
            (item) => item.fixture.id === fixture.id
          );
          if (!extraData) return;

          const containerClasses = `w-full flex flex-col sm:flex-row items-center sm:justify-between p-4 border rounded-md cursor-pointer transition-all
        ${
          selectedGame === fixture.id
            ? "border-primary-600"
            : "border-background-light-500"
        } hover:shadow-lg`;

          return (
            <div
              key={fixture.id}
              onClick={() => handleSelectGame(game)}
              className={containerClasses}
            >
              {/* Mobile Layout */}
              <div className="w-full flex flex-col sm:hidden items-center">
                {/* Times na mesma linha */}
                <div className="w-full flex items-center justify-between">
                  {/* Home team */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-[40px] h-[40px] object-contain"
                      src={extraData?.teams?.home.logo}
                      alt={`${extraData?.teams?.home.name} logo`}
                    />
                    <p className="text-white text-sm font-semibold truncate">
                      {extraData?.teams?.home.name}
                    </p>
                  </div>

                  {/* "VS" */}
                  <p className="text-primary-500 text-lg font-bold tracking-wide">
                    VS
                  </p>

                  {/* Away team */}
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-semibold text-right truncate">
                      {extraData?.teams?.away.name}
                    </p>
                    <img
                      className="w-[40px] h-[40px] object-contain"
                      src={extraData?.teams?.away.logo}
                      alt={`${extraData?.teams?.away.name} logo`}
                    />
                  </div>
                </div>

                {/* Informações do jogo abaixo */}
                <div className="w-full mt-2 bg-background-heavy-800 text-white text-center rounded-md p-2">
                  <p className="text-sm font-medium">{fixture.venue.name}</p>
                  <p className="text-theme-gray-50 text-xs">
                    {moment(fixture.date).format("DD/MM/YY HH:mm")}
                  </p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex w-full items-center justify-between">
                {/* Home team */}
                <div className="flex items-center w-1/3 gap-2">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src={extraData?.teams?.home.logo}
                    alt={`${extraData?.teams?.home.name} logo`}
                  />
                  <p className="text-white text-lg font-semibold truncate">
                    {extraData?.teams?.home.name}
                  </p>
                </div>

                {/* "VS" */}
                <div className="w-1/3 flex flex-col items-center justify-center gap-1 text-center">
                  <p className="text-primary-500 text-2xl font-bold tracking-wide">
                    VS
                  </p>
                  <p className="text-white text-sm font-medium">
                    {fixture.venue.name}
                  </p>
                  <p className="text-theme-gray-50 text-xs">
                    {moment(fixture.date).format("DD/MM/YY HH:mm")}
                  </p>
                </div>

                {/* Away team */}
                <div className="flex items-center justify-end w-1/3 gap-2">
                  <p className="text-white text-lg font-semibold text-right truncate">
                    {extraData?.teams?.away.name}
                  </p>
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src={extraData?.teams?.away.logo}
                    alt={`${extraData?.teams?.away.name} logo`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
