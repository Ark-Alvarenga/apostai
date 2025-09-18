"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/atoms";
import { Modal } from "../Modal";
import { toast } from "react-toastify";
import { sendUserContactEmail } from "@/helpers";
import { User } from "@/types";
import { LOCALSTORAGE_KEYS } from "@/constants";

interface ContactUsProps {}

export const ContactUs: React.FC<ContactUsProps> = () => {
  const translations = useTranslations("canceledPayment");

  const [user, setUser] = useState<User>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");

  useEffect(() => {
    const localStorageResult = JSON.parse(
      localStorage?.getItem(LOCALSTORAGE_KEYS.AUTH) || "{}"
    );

    setUser(localStorageResult.user);
  }, []);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await sendUserContactEmail({
        userName,
        userEmail,
        userMessage,
        otherInfo: user
          ? `User id: ${user._id} | User email: ${user.email}`
          : "User isn't logged",
      });

      toast.success(translations("submitSuccess"));
    } catch (error) {
      toast.error(translations("submitError"));
    }

    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        text={translations("secondaryCta")}
        onClick={handleClick}
      />
      <Modal isOpen={isOpen}>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-4 py-5 lg:py-10 px-4 lg:px-8 rounded-lg overflow-clip bg-background-heavy-500"
        >
          <h3 className="text-2xl font-bold mx-auto text-white">
            {translations("modalTitle")}
          </h3>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="contactUsName"
              className="text-lg font-bold text-white flex items-center gap-2"
            >
              {translations("name")}
            </label>
            <input
              id="contactUsName"
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
              required
              placeholder={translations("namePlaceholder")}
              className="h-[40px] text-white py-3 px-2 rounded-xl bg-background-heavy-700 scrollbar-hide border-background-light-600 border-2 border-transparent focus:border-primary-600 transition-all duration-450"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="contactUsEmail"
              className="text-lg font-bold text-white flex items-center gap-2"
            >
              {translations("email")}
            </label>
            <input
              id="contactUsEmail"
              onChange={(event) => setUserEmail(event.target.value)}
              value={userEmail}
              type="email"
              required
              placeholder={translations("emailPlaceholder")}
              className="h-[40px] text-white py-3 px-2 rounded-xl bg-background-heavy-700 scrollbar-hide border-background-light-600 border-2 border-transparent focus:border-primary-600 transition-all duration-450"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="contactUsMessage"
              className="text-lg font-bold text-white flex items-center gap-2"
            >
              {translations("message")}
            </label>
            <textarea
              id="contactUsMessage"
              onChange={(event) => setUserMessage(event.target.value)}
              value={userMessage}
              placeholder={translations("messagePlaceholder")}
              rows={2}
              required
              minLength={15}
              className="text-white py-3 px-2 rounded-xl bg-background-heavy-700 scrollbar-hide border-background-light-600 border-2 border-transparent focus:border-primary-600 transition-all duration-450"
            />
            <p className="ml-auto text-sm text-gray-500">{`${userMessage.length}/250`}</p>
          </div>
          <div className="flex w-full gap-8 mt-auto">
            <Button
              variant="transparent"
              text={translations("cancel")}
              onClick={handleCancel}
              disabled={isLoading}
            />
            <Button
              type="submit"
              text={translations("send")}
              onClick={() => {}}
              disabled={isLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
