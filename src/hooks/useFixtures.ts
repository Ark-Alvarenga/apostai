import { FixtureResponse } from "@/types";
import useSWR from "swr";

export const useFixtures = (leagueId: string) => {
  const { data, error, mutate, isValidating } = useSWR(
    leagueId ? `/api/sportsAPI/fixtures?league=${leagueId}` : null,
    (url: string): Promise<FixtureResponse[]> =>
      fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  return {
    fixtures: data,
    isLoading: !error && !data,
    isError: error,
    refetch: mutate,
    isValidating,
  };
};
