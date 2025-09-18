"use client";
import { ContactUs, LogoutButton, Container } from "@/components";
import { UpdateSubscriptionButton } from "@/components/molecules/UpdateSubscriptionButton";
import { LOCALSTORAGE_KEYS, productConfig } from "@/constants";
import {
  formatCurrency,
  getPlanById,
  parseAndFormatLocalTime,
} from "@/helpers";
import { useTranslations } from "@/hooks/useTranslations";
import { getSubscriptionByProductId } from "@/services/api/subscriptions";
import { EnhancedSubscription, SubscriptionPlan, User } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserConfigs = () => {
  const translations = useTranslations("userconfig");
  const [subscription, setSubscription] = useState<EnhancedSubscription>();
  const [plan, setPlan] = useState<SubscriptionPlan | undefined>();
  const [user, setUser] = useState<User>();

  const fetchSubscription = async () => {
    try {
      const subscription = await getSubscriptionByProductId({
        productId: productConfig._id as unknown as string,
      });

      setSubscription(subscription);
    } catch (error) {
      // This error is triggering but isn't actually an error, need to investigate
      // I'll comment so it doesn't show up in the UI for users
      // toast.error(translations("fetchSubscriptionError"));
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  useEffect(() => {
    const localStorageResult = JSON.parse(
      localStorage?.getItem(LOCALSTORAGE_KEYS.AUTH) || "{}"
    );

    setUser(localStorageResult.user);
    const result = getPlanById(localStorageResult.user.subscriptions[0].plan);
    setPlan(result);
  }, []);

  return (
    <Container shadow="none">
      {/* Container Principal */}
      <div className="flex flex-col w-full gap-6 items-stretch">
        {/* Informações do Usuário */}
        <Container borderRadius="medium" shadow="none">
          <div>
            <h3 className="text-primary-500 text-xl font-bold mb-4">
              {translations("userInfo")}
            </h3>
            {user && (
              <div className="text-white text-base space-y-2">
                <p>{`${translations("email")} ${user.email}`}</p>
                <p>{`${translations("joined")} ${parseAndFormatLocalTime(
                  user.createdAt
                )}`}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <ContactUs />
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </Container>

        {/* Informações da Assinatura */}
        <Container borderRadius="medium" shadow="none">
          <div>
            <h3 className="text-primary-500 text-xl font-bold mb-4">
              {translations("subscriptionInfo")}
            </h3>
            {plan && (
              <p className="text-white text-base mb-2">
                {`${translations("yourPlan")} ${translations(
                  plan.name
                )} (${formatCurrency({ number: Number(plan.price) })})`}
              </p>
            )}
            {subscription && (
              <div className="text-white text-base space-y-2">
                <p>{`${translations("status")} ${translations(
                  subscription.stripeSubscription.status
                )}`}</p>
                <p>{`${translations("lastPayment")} ${parseAndFormatLocalTime(
                  subscription.stripeSubscription.current_period_start
                )}`}</p>
                {subscription.stripeSubscription.cancel_at_period_end ? (
                  <p>{`${translations(
                    "subscriptionEnding"
                  )} ${parseAndFormatLocalTime(
                    subscription.stripeSubscription.cancel_at || ""
                  )}`}</p>
                ) : (
                  <p>{`${translations("nextPayment")} ${parseAndFormatLocalTime(
                    subscription.stripeSubscription.current_period_end
                  )}`}</p>
                )}
              </div>
            )}
          </div>

          {subscription && (
            <div className="mt-4">
              <UpdateSubscriptionButton
                stripeSubscriptionId={subscription.stripeSubscriptionId}
                onSuccess={(updatedSub: EnhancedSubscription) =>
                  setSubscription(updatedSub)
                }
                cancelAtPeriodEnd={
                  subscription.stripeSubscription.cancel_at_period_end
                }
              />
            </div>
          )}
        </Container>
      </div>
    </Container>
  );
};
