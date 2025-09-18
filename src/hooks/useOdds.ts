import { OddsResponse } from "@/types";
import useSWR from "swr";

interface UseOddsParams {
  leagueId: number | any;
  fixtureId?: number;
  season?: number;
  date?: string;
  timezone?: string;
  page?: number;
  bookmaker?: number;
  bet?: number;
}

export const useOdds = (params: UseOddsParams) => {
  const queryParams = new URLSearchParams();

  if (params.leagueId) queryParams.append("league", params.leagueId.toString());
  if (params.fixtureId)
    queryParams.append("fixture", params.fixtureId.toString());
  if (params.season) queryParams.append("season", params.season.toString());
  if (params.date) queryParams.append("date", params.date);
  if (params.timezone) queryParams.append("timezone", params.timezone);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.bookmaker)
    queryParams.append("bookmaker", params.bookmaker.toString());
  if (params.bet) queryParams.append("bet", params.bet.toString());

  const {
    data: oddsData,
    error,
    mutate,
    isValidating,
  } = useSWR(
    queryParams.toString()
      ? `/api/sportsAPI/odds?${queryParams.toString()}`
      : null,
    (url: string): Promise<OddsResponse[]> =>
      fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  return {
    odds: oddsData,
    isLoading: !error && !oddsData,
    isError: error,
    refetch: mutate,
    isValidating,
  };
};
