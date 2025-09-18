"use client";
import React, { useEffect } from "react";
import { navigate } from "@/app/actions";
import Spinner from "@/images/spinner.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { LOCALSTORAGE_KEYS } from "@/constants/auth";
import {
  getPlanByStripePriceId,
  trackPaymentDifferentStatus,
  trackPaymentError,
  trackPaymentSuccess,
} from "@/helpers";
import { productConfig } from "@/constants";
import { useTranslations } from "@/hooks/useTranslations";

interface StripeSubscription {
  id: string;
  plan: {
    id: string;
  };
}

interface Session {
  id: string;
  subscription: StripeSubscription;
}

export const ConfirmPaymentModule = () => {
  const translations = useTranslations("confirmPaymentModule");

  const handlePaymentByStatus = async (
    paymentStatus: string,
    session: Session
  ) => {
    const { user, token } = JSON.parse(
      localStorage?.getItem(LOCALSTORAGE_KEYS.AUTH) || "{}"
    );

    switch (paymentStatus) {
      case "paid": {
        trackPaymentSuccess({
          sessionId: session.id,
        });
        const affiliateCode = localStorage.getItem("affiliateCode");
        const plan = getPlanByStripePriceId(session.subscription.plan.id);

        try {
          const paymentResponse = await fetch(
            `/api/payments/getBySessionId?stripeSessionId=${session.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const parsedPaymentResponse = await paymentResponse.json();

          const res = await fetch("/api/subscriptions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stripeSubscriptionId: session.subscription.id,
              payments: [parsedPaymentResponse._id],
              lastPayment: parsedPaymentResponse._id,
              dailyLimit: plan?.dailyLimit,
              monthlyLimit: plan?.monthlyLimit,
              plan: plan?._id,
              product: productConfig._id,
              features: plan?.features,
              usages: [],
              user: user._id,
              status: "active",
              affiliateCode,
            }),
          });

          const parsedRes = await res.json();
          localStorage.setItem(
            LOCALSTORAGE_KEYS.AUTH,
            JSON.stringify({
              token,
              user: {
                ...user,
                subscriptions: [...user.subscriptions, parsedRes],
              },
            })
          );

          setTimeout(() => {
            localStorage.removeItem(LOCALSTORAGE_KEYS.PAYMENT_LOADER);
            navigate("/feature");
          }, 300);
        } catch (error) {
          trackPaymentError({
            sessionId: session.id,
            error,
          });
          console.error(error);
        }
        break;
      }
      default:
        trackPaymentDifferentStatus({
          sessionId: session.id,
          status: paymentStatus,
        });
        return toast.error(translations("errorProcessing"));
    }
  };

  const handleConfirm = async () => {
    const sessionId =
      localStorage.getItem(LOCALSTORAGE_KEYS.STRIPE_SESSION_ID) || "";

    try {
      const res = await fetch("/api/checkout/checkSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      const parsedRes = await res.json();

      localStorage.removeItem(LOCALSTORAGE_KEYS.STRIPE_SESSION_ID);
      handlePaymentByStatus(parsedRes.paymentStatus, parsedRes.session);
    } catch (error) {
      toast.error(translations("errorProcessing"));
      trackPaymentError({
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
      trackPaymentError({
        sessionId: "n/a",
        error: translations("errorSessionIdNotFound"),
      });
      navigate("/");
      return;
    }

    if (localStorage.getItem(LOCALSTORAGE_KEYS.PAYMENT_LOADER)) return;

    localStorage.setItem(LOCALSTORAGE_KEYS.PAYMENT_LOADER, "true");
    handleConfirm();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-background-heavy-800">
      <Image src={Spinner} width={200} height={200} alt="spinner" />
    </div>
  );
};
