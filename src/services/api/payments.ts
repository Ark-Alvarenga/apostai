import { CreateStripeSessionResponse } from "./checkout";

export interface CreatePaymentResponse {
  id: string;
  url: string;
}

interface CreatePaymentProps {
  stripeSessionObject: CreateStripeSessionResponse;
  stripeSessionId: string;
}

export const createPayment = async ({
  stripeSessionObject,
  stripeSessionId,
}: CreatePaymentProps): Promise<CreatePaymentResponse> => {
  const response = await fetch("/api/payments/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripeSessionObject,
      stripeSessionId,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};
