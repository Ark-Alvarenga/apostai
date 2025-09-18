import { EnhancedSubscription } from "@/types";

export interface GetSubscriptionByProductIdResponse {
  id: string;
  url: string;
}

interface GetSubscriptionByProductIdProps {
  productId: string;
}

interface CancelSubscriptionProps {
  stripeSubscriptionId: string;
}

export const getSubscriptionByProductId = async ({
  productId,
}: GetSubscriptionByProductIdProps): Promise<EnhancedSubscription> => {
  const response = await fetch(
    `/api/subscriptions/find/productId?productId=${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};

export const cancelSubscription = async ({
  stripeSubscriptionId,
}: CancelSubscriptionProps): Promise<EnhancedSubscription> => {
  const response = await fetch(`/api/subscriptions/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripeSubscriptionId,
      updateParams: { cancel_at_period_end: true },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};

export const stopSubscriptionCancellation = async ({
  stripeSubscriptionId,
}: CancelSubscriptionProps): Promise<EnhancedSubscription> => {
  const response = await fetch(`/api/subscriptions/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripeSubscriptionId,
      updateParams: { cancel_at_period_end: false },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};
