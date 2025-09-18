"use client";
import { Badge } from "@/components/atoms";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";

interface UpdateItemProps {
  title: string;
  text: string;
  caption: string;
  imgName: string;
}

export const UpdateItem = ({
  title,
  text,
  caption,
  imgName,
}: UpdateItemProps) => {
  const translations = useTranslations("latestUpdates");

  return (
    <div className="w-full lg:w-1/3 h-full flex flex-col justify-between items-center gap-3 px-6 py-4 bg-background-heavy-700 border border-background-light-600 rounded-lg transition-all duration-450 hover:border-primary-600 hover:bg-background-heavy-500">
      <Image
        width={212}
        height={212}
        src={`/images/${imgName}`}
        alt={`${imgName}`}
      />
      <p className="text-xl text-white font-bold">{translations(title)}</p>
      <div className="text-lg text-white mr-auto">{translations(text)}</div>
      <div className="mr-auto">
        <Badge text={caption} />
      </div>
    </div>
  );
};
