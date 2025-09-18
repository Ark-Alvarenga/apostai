import { sortSoccerData, filterActiveSoccerEntities } from "@/helpers";
import { Soccer } from "@/types";
import useSWR from "swr";

export const useSoccerLeagues = (selectedCountryId: string) => {
  const { data, error, mutate, isValidating } = useSWR(
    selectedCountryId
      ? `/api/sportsAPI/leagues?code=${selectedCountryId}`
      : null,
    (url: string): Promise<Soccer[]> => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  const sortedSoccer = data ? sortSoccerData(data) : undefined;
  const filteredSoccer = sortedSoccer
    ? filterActiveSoccerEntities(sortedSoccer)
    : undefined;

  return {
    leagues: filteredSoccer,
    isLoading: !error && !data,
    isError: error,
    refetch: mutate,
    isValidating,
  };
};
