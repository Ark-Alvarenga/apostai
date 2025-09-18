"use client";
import { getUser, initAmplitude, setUserEmail } from "@/helpers";
import { setUserId } from "@amplitude/analytics-browser";
import { useEffect } from "react";

export const AmplitudeStarter: React.FC = () => {
  const handleStart = async () => {
    initAmplitude();
    const user = getUser();

    if (user) {
      setUserId(String(user._id));
      setUserEmail(user.email);
    }
  };

  useEffect(() => {
    handleStart();
  }, []);

  return <></>;
};
