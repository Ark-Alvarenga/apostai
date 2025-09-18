"use client";
import React, { useState } from "react";
import { navigate, removeTokenCookie } from "@/app/actions";
import { LOCALSTORAGE_KEYS } from "@/constants";
import Image from "next/image";
import Spinner from "@/images/spinner.svg";
import { FaSignOutAlt } from "react-icons/fa";
import { useTranslations } from "@/hooks/useTranslations";

interface LogoutButtonProps {
  onSuccess?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onSuccess }) => {
  const translations = useTranslations("userconfig");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      removeTokenCookie();
      localStorage.removeItem(LOCALSTORAGE_KEYS.AUTH);

      onSuccess?.();

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="font-bold text-red-600 cursor-pointer"
      disabled={isLoading}
    >
      {isLoading ? (
        <Image src={Spinner} width={24} height={24} alt="spinner" />
      ) : (
        <div className="flex justify-center items-center">
          <FaSignOutAlt className="mr-2" /> {translations("logout")}
        </div>
      )}
    </button>
  );
};
