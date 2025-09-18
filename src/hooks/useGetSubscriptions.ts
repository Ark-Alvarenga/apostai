import { navigate } from "@/app/actions";
import { getUserSubscription } from "@/helpers";
import { Subscription } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "./useTranslations";

export const useGetSubscriptions = () => {
  const translations = useTranslations("promptBar");
  const [subscription, setSubscription] = useState<Subscription | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage) {
      const fetchSubscription = getUserSubscription();

      if (!fetchSubscription) {
        toast.error(translations("errorWithSub"));
        navigate("/");
      }

      setSubscription(fetchSubscription);
      setIsLoading(false);
    }
  }, []);

  return { subscription, isLoading };
};
