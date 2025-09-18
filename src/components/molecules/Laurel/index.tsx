import Image from "next/image";
import { RatingStars } from "../RatingStars";
import { useTranslations } from "@/hooks/useTranslations";

export const Laurel = () => {
  const translations = useTranslations("laurel");

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm">{translations("title")}</p>
      <div className="w-auto flex justify-between items-center gap-1 mx-auto">
        <RatingStars rate={5} active />
      </div>
      <Image
        style={{
          filter: "invert(1) saturate(0) brightness(2)",
          mixBlendMode: "lighten",
          verticalAlign: "middle",
        }}
        className="absolute"
        src="/images/laurel.svg"
        alt=""
        width="185"
        height="58"
      />
    </div>
  );
};
