import { Country } from "@/types";
import useSWR from "swr";

export const useCountries = () => {
  const { data, error, mutate, isValidating } = useSWR(
    "/api/sportsAPI/countries",
    (url: string): Promise<Country[]> => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  return {
    countries: data,
    isLoading: !error && !data,
    isError: error,
    refetch: mutate,
    isValidating,
  };
};
