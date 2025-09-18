import { features } from "@/constants";
import { FeatureItem } from "./FeatureItem";

export const FeaturesSection = () => {
  return (
    <div className="max-w-[1200px] min-h-auto flex flex-col justify-center items-center gap-20 px-6 py-8 mx-auto my-8 lg:my-24">
      {features.map(({ title, textItems, imgName, anchor }, index) => {
        return (
          <FeatureItem
            key={`${title}-${index}`}
            title={title}
            textItems={textItems}
            imgName={imgName}
            index={index}
            anchor={anchor}
          />
        );
      })}
    </div>
  );
};
