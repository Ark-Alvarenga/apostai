"use client";
import React, { useState } from "react";
import Image from "next/image";
import Spinner from "@/images/spinner.svg";
import { FaBan, FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  cancelSubscription,
  stopSubscriptionCancellation,
} from "@/services/api/subscriptions";
import { EnhancedSubscription } from "@/types";
import { trackFeatureEvent } from "@/helpers";
import { BETSLAYER_EVENT_TYPES } from "@/constants/amplitude";
import { useTranslations } from "@/hooks/useTranslations";
import { Modal } from "../Modal";
import { Button } from "@/components/atoms";

interface UpdateSubscriptionButtonProps {
  stripeSubscriptionId: string;
  onSuccess: (updatedSub: EnhancedSubscription) => void;
  cancelAtPeriodEnd: boolean;
}

export const UpdateSubscriptionButton: React.FC<
  UpdateSubscriptionButtonProps
> = ({ stripeSubscriptionId, onSuccess, cancelAtPeriodEnd }) => {
  const translations = useTranslations("userconfig");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const updatedSubscription = cancelAtPeriodEnd
        ? await stopSubscriptionCancellation({ stripeSubscriptionId })
        : await cancelSubscription({ stripeSubscriptionId });

      trackFeatureEvent(
        cancelAtPeriodEnd
          ? BETSLAYER_EVENT_TYPES.SUBSCRIPTION.REACTIVATED
          : BETSLAYER_EVENT_TYPES.SUBSCRIPTION.CANCELLED,
        { updatedSubscription, cancelAtPeriodEnd }
      );
      onSuccess(updatedSubscription);
    } catch (error) {
      trackFeatureEvent(BETSLAYER_EVENT_TYPES.SUBSCRIPTION.ERROR, {
        error,
        cancelAtPeriodEnd,
      });
      console.error(error);
      toast.error(
        cancelAtPeriodEnd
          ? translations("issueReactivating")
          : translations("issueCancelling")
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      toast.success(
        cancelAtPeriodEnd
          ? translations("successReactivating")
          : translations("successCancelling")
      );
    }
  };

  const handleOpenClick = () => {
    cancelAtPeriodEnd ? handleClick() : setIsOpen(true);
  };

  if (!stripeSubscriptionId) return <></>;

  return (
    <>
      <button
        onClick={handleOpenClick}
        className="font-bold cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? (
          <Image src={Spinner} width={24} height={24} alt="spinner" />
        ) : (
          <div className="flex justify-center items-center">
            {cancelAtPeriodEnd ? (
              <div className="flex justify-center items-center gap-2 text-green-600">
                <FaStar className="mr-2" />{" "}
                {translations("reactivateSubscription")}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 text-red-600">
                <FaBan className="mr-2" /> {translations("cancelSubscription")}
              </div>
            )}
          </div>
        )}
      </button>
      <Modal isOpen={isOpen}>
        <div className="w-full h-auto flex flex-col gap-4 py-5 lg:py-10 px-4 lg:px-8 rounded-lg bg-background-heavy-500">
          <h3 className="text-xl font-bold mx-auto text-white">
            {translations("areYouSure")}
          </h3>

          <p className="text-white font-semibold text-lg">
            {translations("cancelText")}
          </p>

          <div className="flex w-full gap-8 mt-auto">
            <Button
              variant="transparent"
              text={translations("cancel")}
              onClick={handleClick}
            />
            <Button
              text={translations("voltar")}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
