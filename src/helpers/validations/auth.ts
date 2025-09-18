import { LOCALSTORAGE_KEYS, productConfig } from "@/constants";
import { AuthState, Subscription, User } from "@/types";

/**
 * Validates if user has access to actual product.
 *
 * @returns true if user has access, false otherwise.
 */
export const userHasAccessToProduct = (): boolean => {
  const authData = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH);
  if (!authData) return false;

  const parsedAuthData: AuthState = JSON.parse(authData);
  if (!parsedAuthData.user) return false;

  return parsedAuthData.user.subscriptions.some(
    (sub) => sub.product === productConfig._id
  );
};

/**
 * Find and return the user subscription.
 *
 * @returns the user subscription .
 */
export const getUserSubscription = (): Subscription | undefined => {
  const authData = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH);
  if (!authData) return;

  const parsedAuthData: AuthState = JSON.parse(authData);
  if (!parsedAuthData.user) return;

  const subscription = parsedAuthData.user.subscriptions.find(
    (sub) => sub.product === productConfig._id
  );

  if (!subscription) return;
  return subscription;
};

/**
 * Find and return the user token.
 *
 * @returns the user token .
 */
export const getUserToken = (): string | undefined => {
  const authData = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH);
  if (!authData) return;

  const parsedAuthData: AuthState = JSON.parse(authData);
  if (!parsedAuthData.token) return;
  return parsedAuthData.token;
};

/**
 * Find and return the user.
 *
 * @returns the user.
 */
export const getUser = (): User | undefined => {
  const authData = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH);
  if (!authData) return;

  const parsedAuthData: AuthState = JSON.parse(authData);
  if (!parsedAuthData.user) return;
  return parsedAuthData.user;
};
