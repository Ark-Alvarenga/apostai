import { MarketOpportunity } from "@/types/InternalFixture";

export const getMarketData = (
  markets: MarketOpportunity[],
  desiredMarket: string
): MarketOpportunity | null => {
  return markets.find((market) => market.market === desiredMarket) || null;
};
