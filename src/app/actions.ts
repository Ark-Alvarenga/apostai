"use server";

import { COOKIE_KEYS } from "@/constants";
import { ONE_MONTH_IN_SECONDS } from "@/constants/time";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function navigate(url: string) {
  redirect(`${url}`);
}

export async function setTokenCookie(cookieValue: string) {
  cookies().set(COOKIE_KEYS.JWT_TOKEN, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: ONE_MONTH_IN_SECONDS,
    path: "/",
  });
}

export async function getTokenCookie() {
  return cookies().get(COOKIE_KEYS.JWT_TOKEN);
}

export async function removeTokenCookie() {
  cookies().delete(COOKIE_KEYS.JWT_TOKEN);
}
