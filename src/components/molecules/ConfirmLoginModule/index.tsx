"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { navigate, setTokenCookie } from "@/app/actions";
import { LOCALSTORAGE_KEYS, ROUTES, URL_PARAMS_KEYS } from "@/constants";
import {
  trackConfirmUser,
  trackConfirmUserError,
  userHasAccessToProduct,
} from "@/helpers";
import Spinner from "@/images/spinner.svg";
import { confirmUserViaToken } from "@/services";
import { useTranslations } from "@/hooks/useTranslations";

export const ConfirmLoginModule = () => {
  const translations = useTranslations("loginModule");
  const token = useSearchParams()?.get(URL_PARAMS_KEYS.LOGIN_EMAIL_TOKEN);

  const confirmUser = async () => {
    try {
      const res = await confirmUserViaToken({ confirmToken: token });

      localStorage.setItem(
        LOCALSTORAGE_KEYS.AUTH || "ODING_FORGE_AUTH_CONTEXT",
        JSON.stringify(res)
      );
      setTokenCookie(res.token);
      const hasAccessToProduct = userHasAccessToProduct();
      trackConfirmUser({
        user: res.user,
        hasAccessToProduct,
      });

      if (hasAccessToProduct) {
        navigate(ROUTES.FEATURE);
      } else {
        navigate(ROUTES.SELECT_PLAN);
      }
    } catch (error) {
      trackConfirmUserError({ error });
      toast.error(translations("weHadAnError"));
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      trackConfirmUserError({ error: "Token wasn't found" });
      toast.error(translations("tokenNotFound"));
      navigate(ROUTES.HOME);
      return;
    }

    confirmUser();
  }, [token]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-background-heavy-800">
      <Image src={Spinner} width={200} height={200} alt="spinner" />
    </div>
  );
};
export default ConfirmLoginModule;
