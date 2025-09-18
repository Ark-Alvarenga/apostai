import { COOKIE_KEYS } from "@/constants";

export const parseCookies = (
  cookieHeader: string | undefined
): Record<string, string> => {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) {
    return cookies;
  }

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name && value) {
      cookies[name.trim()] = decodeURIComponent(value.trim());
    }
  });

  return cookies;
};

export const getTokenCookie = (cookieString: string) => {
  const parsed = parseCookies(cookieString);
  return parsed[COOKIE_KEYS.JWT_TOKEN];
};
