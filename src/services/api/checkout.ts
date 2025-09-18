export interface CreateStripeSessionResponse {
  id: string;
  url: string;
}

interface CreateStripeSessionProps {
  priceId: string;
}

export const createStripeSession = async ({
  priceId,
}: CreateStripeSessionProps): Promise<CreateStripeSessionResponse> => {
  const response = await fetch("/api/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ priceId }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};
