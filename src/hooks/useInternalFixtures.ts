import { InternalFixture } from "@/types/InternalFixture";
import useSWR from "swr";

interface useInternalFixturesProps {
  period: "future" | "past";
}
export const useInternalFixtures = ({ period }: useInternalFixturesProps) => {
  const { data, error, mutate, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/fixtures?period=${period}`,
    async (url: string): Promise<InternalFixture[]> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response}`);
      }
      return response.json();
    },
    { revalidateOnFocus: false }
  );

  return {
    fixtures: Array.isArray(data) ? data : null, // Garante que os dados sejam um array
    isLoading: !error && !data,
    isError: error,
    refetch: mutate,
    isValidating,
  };
};
