import { useTranslations } from "@/hooks/useTranslations";
import { ActionSectionCTA } from "./CTA";

export const ActionSection = () => {
  const translations = useTranslations("actionSection");

  return (
    <div className="max-w-[1200px] min-h-auto flex gap-6 px-6 pt-8 pb-32 mx-auto">
      <div className="w-full h-auto flex flex-col-reverse lg:flex-row justify-center items-center bg-white rounded-xl">
        <div className="w-full lg:w-3/4 flex flex-col justify-start items-start gap-8 px-4 lg:px-10 py-8 text-black">
          <div>
            <h3 className="text-3xl font-bold text-left text-primary-800">
              {translations("title")}
            </h3>
            <p className="text-xl">{translations("subtitle")}</p>
          </div>
          <div>
            <p className="text-xl font-bold">{translations("readyTitle")}</p>
            <p className="text-xl">{translations("readyItem1")}</p>
            <p className="text-xl">{translations("readyItem2")}</p>
            <p className="text-xl">{translations("readyItem3")}</p>
          </div>
          <div>
            <p className="text-xl font-bold">{translations("betTitle")}</p>
            <p className="text-xl">{translations("betItem")}</p>
          </div>
          <ActionSectionCTA />
        </div>

        <div
          className="bg-cover bg-center bg-no-repeat w-full lg:w-1/4 h-[80vw] lg:h-full rounded-t-xl lg:rounded-r-xl"
          style={{ backgroundImage: `url("images/actionImage.webp")` }}
        />
      </div>
    </div>
  );
};
