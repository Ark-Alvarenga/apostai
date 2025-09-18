"use client";
import React, { useEffect } from "react";
import { navigate } from "@/app/actions";
import Image from "next/image";
import { toast } from "react-toastify";
import { LOCALSTORAGE_KEYS } from "@/constants/auth";
import { trackCanceledPaymentError, trackPaymentRetry } from "@/helpers";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/atoms";
import { ContactUs } from "../ContactUs";

export const CancelPaymentModule = () => {
  const translations = useTranslations("canceledPayment");

  const handleRetry = async () => {
    const sessionId =
      localStorage.getItem(LOCALSTORAGE_KEYS.STRIPE_SESSION_ID) || "";

    trackPaymentRetry({ sessionId });

    try {
      const res = await fetch("/api/checkout/checkSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      const parsedRes = await res.json();

      localStorage.removeItem(LOCALSTORAGE_KEYS.PAYMENT_LOADER);
      navigate(parsedRes.sessionDetails.url);
    } catch (error) {
      toast.error(translations("errorProcessing"));
      trackCanceledPaymentError({
        sessionId,
        error,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (!localStorage) return;

    if (!localStorage.getItem(LOCALSTORAGE_KEYS.STRIPE_SESSION_ID)) {
      toast.error(translations("errorSessionIdNotFound"));
      trackCanceledPaymentError({
        sessionId: "n/a",
        error: translations("errorSessionIdNotFound"),
      });
      navigate("/");
      return;
    }

    if (localStorage.getItem(LOCALSTORAGE_KEYS.PAYMENT_LOADER)) return;

    localStorage.setItem(LOCALSTORAGE_KEYS.PAYMENT_LOADER, "true");
  }, []);

  return (
    <div className="max-w-[1200px] w-full h-full flex justify-center items-center mx-auto">
      <div className="w-full lg:w-7/12 flex justify-center items-start flex-col gap-6 p-8">
        <h1 className="text-2xl lg:text-5xl font-bold text-center text-primary-800">
          {translations("title")}
        </h1>
        <p className="text-sm lg:text-xl text-left text-gray-600">
          {translations("text")}
        </p>
        <Button text={translations("primaryCta")} onClick={handleRetry} />
        <ContactUs />
      </div>
      <div className="w-5/12 justify-center items-center lg:flex hidden">
        <Image
          src={"/images/paymentError.png"}
          width={300}
          height={400}
          alt="spinner"
        />
      </div>
      <div className="w-5/12 justify-center items-center lg:hidden flex absolute opacity-10 rotate-[20deg] ml-40 mt-20 -z-10">
        <Image
          src={"/images/paymentError.png"}
          width={300}
          height={400}
          alt="spinner"
        />
      </div>
    </div>
  );
};
