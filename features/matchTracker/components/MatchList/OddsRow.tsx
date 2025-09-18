import React from "react";
import { MarketOpportunity } from "@/types/InternalFixture";

interface OddsRowProps {
  preMatchOdds?: MarketOpportunity[];
  isSelected: boolean;
}

export const OddsRow: React.FC<OddsRowProps> = ({
  preMatchOdds,
  isSelected,
}) => {
  return (
    <>
      {["Home", "Draw", "Away"].map((key: string) => (
        <td
          key={key}
          className={`px-2 py-2 text-center sm:text-sm md:text-md ${
            isSelected
              ? "text-background-heavy-500 font-bold"
              : "text-secondary-500"
          }`}
          style={{ width: "80px" }}
        >
          {preMatchOdds?.[0]?.bestOdds?.[key]?.[0]?.odd || "-"}
        </td>
      ))}
    </>
  );
};
