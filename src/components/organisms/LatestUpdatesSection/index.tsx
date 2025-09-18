import { useTranslations } from "@/hooks/useTranslations";
import { UpdateItem } from "./UpdateItem";
import { dataPointsAdded } from "@/constants";

export const LatestUpdatesSection = () => {
  const translations = useTranslations("latestUpdates");

  return (
    <div className="max-w-[1200px] min-h-screen flex flex-col justify-center items-center gap-6 px-6 py-8 mx-auto">
      <p className="text-xs lg:text-sm font-bold text-primary-600">
        {translations("pretitle")}
      </p>
      <h2 className="max-w-[550px] text-2xl lg:text-5xl font-bold text-center text-primary-600">
        {translations("title")}
      </h2>
      <p className="text-sm lg:text-xl text-center text-white">
        {translations("subtitle")}
      </p>
      <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-8 mt-6 lg:mt-12">
        {dataPointsAdded
          .slice(0, 4)
          .map(({ title, text, caption, imgName }, index) => (
            <UpdateItem
              key={`${title}-${index}`}
              title={title}
              text={text}
              caption={caption}
              imgName={imgName}
            />
          ))}
      </div>
    </div>
  );
};
