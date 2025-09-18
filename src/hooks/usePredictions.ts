import { PredictionsResponse } from "@/types";
import useSWR from "swr";

export const usePredictions = (fixtureId: number) => {
  const { data, error } = useSWR(
    fixtureId ? `/api/sportsAPI/predictions?fixture=${fixtureId}` : null,
    (url: string): Promise<PredictionsResponse[]> =>
      fetch(url).then((res) => res.json()),
    { revalidateOnMount: false, revalidateOnFocus: false }
  );

  return {
    predictionsData: data ? data[0] : undefined,
    isLoading: !data && !error,
    isError: error,
  };
};
