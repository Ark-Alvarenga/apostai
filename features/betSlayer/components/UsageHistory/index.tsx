import { IUsage } from "@/models";
import { UsageCard } from "./UsageCard";
import { EmptyAnalysis } from "../EmptyAnalysis";

export const UsageHistory = ({ usages }: { usages: IUsage[] }) => {
  if (!usages?.length) {
    return <EmptyAnalysis />;
  }

  return (
    <div className="w-full min-h-full lg:max-h-full lg:h-full flex pt-4 pb-[70px] lg:pb-4 bg-theme-gray-500">
      <div className="w-full">
        {usages?.map((usage, index) => (
          <UsageCard key={index} usage={usage} />
        ))}
      </div>
    </div>
  );
};
