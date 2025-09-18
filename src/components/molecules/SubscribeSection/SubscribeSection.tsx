"use client";
import React, { useState } from "react";
import { productConfig } from "@/constants/product";
import { EMAIL_INPUT_ID } from "@/constants";
import { focusElementById } from "@/helpers";
import { useTranslations } from "@/hooks/useTranslations";
import { SubscriptionPlanCard } from "./components";

interface SubscribeSectionProps {
  overrideCTAClick?: boolean;
}

export const SubscribeSection = ({
  overrideCTAClick,
}: SubscribeSectionProps) => {
  const translations = useTranslations("subscribeSection");

  const [isLoading, setIsLoading] = useState(false);
  const handleBuyClickOverride = () => {
    focusElementById({
      elementId: EMAIL_INPUT_ID,
      smoothScroll: true,
      offset: -100,
      duration: 700,
    });
  };

  return (
    <div className="w-full max-w-[1200px] min-h-screen mx-auto flex flex-col justify-center items-center px-8 py-12">
      <h2 className="text-2xl lg:text-5xl font-bold text-left text-primary-600 mb-6 lg:mb-12">
        {overrideCTAClick ? translations("title") : translations("titleB")}
      </h2>
      <div className="h-[auto] w-full flex flex-col md:flex-row justify-center items-start gap-8">
        {productConfig.plans.map((subscriptionPlan) => (
          <SubscriptionPlanCard
            key={String(subscriptionPlan._id)}
            subscriptionPlan={subscriptionPlan}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            overrideCTAClick={
              overrideCTAClick ? handleBuyClickOverride : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};
