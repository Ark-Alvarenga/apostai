import { getUserToken } from "@/helpers";
import { IUsage } from "@/models";
import { Subscription } from "@/types";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";

export interface ApiUsageResponse {
  message: string;
  data: IUsage[];
}

export const fetchUsagesByUser = async (): Promise<ApiUsageResponse> => {
  const token = getUserToken();

  const response = await fetch("/api/usage/getByUserId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};

export interface CreateUsageResponse {
  message: string;
  data: IUsage;
}

interface CreateUsageParams {
  subscription: Subscription | undefined;
  requestData: Pick<ChatCompletionCreateParamsBase, "messages">;
  betAmmount: number;
}

export const createUsage = async ({
  subscription,
  requestData,
  betAmmount,
}: CreateUsageParams): Promise<CreateUsageResponse> => {
  const response = await fetch("/api/usage/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscription,
      requestData,
      betAmmount,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};
