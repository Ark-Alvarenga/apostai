import { User } from "@/types";

export interface SigninResponse {
  message: string;
  isNewUser: boolean;
}

interface SigninProps {
  email: string;
}

export const signin = async ({
  email,
}: SigninProps): Promise<SigninResponse> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};

export const signout = async (): Promise<void> => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }
};

export interface ConfirmUserViaTokenResponse {
  token: string;
  user: User;
}

interface ConfirmUserViaTokenProps {
  confirmToken: string | null | undefined;
}

export const confirmUserViaToken = async ({
  confirmToken,
}: ConfirmUserViaTokenProps): Promise<ConfirmUserViaTokenResponse> => {
  const response = await fetch("/api/auth/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ confirmToken }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};
