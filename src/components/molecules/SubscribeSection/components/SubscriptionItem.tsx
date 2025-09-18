import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Bullet } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";

interface SubscriptionItemProps {
  bullet: Bullet;
}

export const SubscriptionItem = ({ bullet }: SubscriptionItemProps) => {
  const translations = useTranslations("subscribeSection");
  return (
    <div className="flex justify-start items-start w-full">
      {bullet.icon && (
        <div className="mt-1 mr-2 w-[14px] h-[14px]">
          <FaCheckCircle color="white" />
        </div>
      )}
      <p
        className={`text-white text-sm ${bullet.highlight ? "font-bold" : ""}`}
      >
        {translations(bullet.label)}
      </p>
    </div>
  );
};
