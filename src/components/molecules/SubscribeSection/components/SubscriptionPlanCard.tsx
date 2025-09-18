import React from "react";
import { SubscriptionPlan } from "@/types";
import {
  formatCurrency,
  trackPlanSessionCreated,
  trackSelectPlan,
  trackSelectPlanError,
} from "@/helpers";
import { Badge, Button, SubscriptionItem } from "@/components";
import { navigate } from "@/app/actions";
import { LOCALSTORAGE_KEYS } from "@/constants";
import { createPayment, createStripeSession } from "@/services";
import { useTranslations } from "@/hooks/useTranslations";

interface SubscriptionPlanCardProps {
  subscriptionPlan: SubscriptionPlan;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  overrideCTAClick?: () => void;
}

export const SubscriptionPlanCard = ({
  subscriptionPlan,
  isLoading,
  setIsLoading,
  overrideCTAClick,
}: SubscriptionPlanCardProps) => {
  const translations = useTranslations("subscribeSection");

  const handleBuy = async () => {
    if (isLoading) return;

    trackSelectPlan({
      subscriptionPlan,
    });

    setIsLoading(true);

    try {
      const stripeSessionObject = await createStripeSession({
        priceId: subscriptionPlan.price_stripe_id,
      });

      trackPlanSessionCreated({
        stripeSessionObject,
      });

      await createPayment({
        stripeSessionObject,
        stripeSessionId: stripeSessionObject.id,
      });

      localStorage.setItem(
        LOCALSTORAGE_KEYS.STRIPE_SESSION_ID,
        stripeSessionObject.id
      );
      navigate(stripeSessionObject.url);
    } catch (error) {
      console.error(error);

      trackSelectPlanError({
        subscriptionPlan,
        error,
      });
    }
  };

  const cointainerStyle = `w-full lg:w-1/3 h-[100%] pt-4 pb-10 lg:px-8 px-4 flex flex-col gap-4 ${
    subscriptionPlan.popular
      ? "bg-background-heavy-700"
      : "bg-background-heavy-500"
  } border border-background-light-600 rounded-lg transition-all duration-450 hover:border-primary-600 hover:bg-background-heavy-500`;

  return (
    <div className={cointainerStyle}>
      <div className="h-6 my-4">
        {subscriptionPlan.popular && <Badge text="popular" />}
      </div>
      <h4 className="text-white text-xl font-bold">
        {translations(subscriptionPlan.name)}
      </h4>
      <div className="flex justify-start items-center gap-1">
        <p className="text-white text-6xl font-bold">
          {formatCurrency({
            number: Number(subscriptionPlan.price),
            options: { maximumFractionDigits: 0 },
          })}
        </p>
        <div className="flex flex-col justify-end items-end">
          {/* <p className="text-gray-400 text-sm">6+ months free</p>
          <p className="text-gray-400 text-sm">billed yearly $499</p> */}
          <p className="text-white text-sm font-bold">
            {translations("perMonth")}
          </p>
        </div>
      </div>
      <Button
        text={translations("cta")}
        onClick={overrideCTAClick ? overrideCTAClick : handleBuy}
        round="circle"
        isLoading={isLoading}
      />
      {subscriptionPlan.bullets.map((bullet) => (
        <SubscriptionItem key={bullet.label} bullet={bullet} />
      ))}
    </div>
  );
};
