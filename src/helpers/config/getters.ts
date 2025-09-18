import { productConfig } from "@/constants";
import { SubscriptionPlan } from "@/types";
import { ObjectId } from "mongoose";

export function getPlanByStripePriceId(
  priceStripeId: string
): SubscriptionPlan | undefined {
  const plan = productConfig.plans.find(
    (plan) => plan.price_stripe_id === priceStripeId
  );

  return plan;
}

export function getPlanById(planId: string): SubscriptionPlan | undefined {
  const plan = productConfig.plans.find(
    (plan) => plan._id === (planId as unknown as ObjectId)
  );

  return plan;
}
