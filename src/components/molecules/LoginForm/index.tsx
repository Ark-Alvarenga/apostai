"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/atoms";
import {
  trackLoginSubmit,
  trackLoginSubmitError,
  validateEmail,
} from "@/helpers";
import { useVisibility } from "@/hooks";
import { EMAIL_INPUT_ID } from "@/constants";

import { signin } from "@/services/api/auth";
import { StickyLoginBar } from "./StickyLoginBar";
import { EVENT_TYPES } from "@/constants/amplitude";
import { toast } from "react-toastify";
import { useTranslations } from "@/hooks/useTranslations";

export const LoginForm: React.FC = () => {
  const translations = useTranslations("loginForm");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const stickyEmailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isFormHidden = useVisibility(formRef);

  useEffect(() => {
    const target = isFormHidden ? stickyEmailInputRef : emailInputRef;
    if (formError && target.current) {
      target.current.classList.remove("border-4", "border-primary-500");
      target.current.focus();
      const timeoutId = setTimeout(() => {
        target.current?.classList.add("border-4", "border-primary-500");
        setFormError(false);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [formError, isFormHidden]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSigninClick = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setFormError(true);
      trackLoginSubmitError({
        type: EVENT_TYPES.LOGIN_SUBMIT_ERROR.INVALID_EMAIL_INPUT,
        emailInputValue: email,
      });
      return;
    }

    setFormError(false);
    setIsLoading(true);
    try {
      const res = await signin({ email });
      trackLoginSubmit({
        emailInputValue: email,
        isNewUser: res.isNewUser,
      });
      toast.success(res.message);
      setIsEmailSent(true);
    } catch (error) {
      trackLoginSubmitError({
        type: EVENT_TYPES.LOGIN_SUBMIT_ERROR.API_ERROR,
        emailInputValue: email,
        error,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Pressing "Enter" in the input will submit the form
   * and trigger handleSigninClick
   */
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSigninClick();
  };

  // @TODO Need some improvement here, the user can be logged but without a subscription and in this case we want to redirect him to /selectPlan blabla
  // const { user } = JSON.parse(
  //   localStorage?.getItem(LOCALSTORAGE_KEYS.AUTH) ?? "{}"
  // );

  // const isLogged = !!user?.["_id"];

  // if (isLogged) {
  //   navigate("/feature");
  // }

  return (
    <>
      <form
        ref={formRef}
        className="md:w-[350px] w-full bg-white p-4 rounded-lg z-10"
        onSubmit={handleFormSubmit}
      >
        <div className="bg-black p-4 rounded-lg">
          {isEmailSent ? (
            <div className="flex border-2 border-secondary-300 text-secondary-300 p-2 rounded-lg mb-2">
              <span className="mr-2">
                Sucesso, o link para login foi enviado ao seu email, por favor
                verifique
              </span>
            </div>
          ) : null}
          <input
            ref={emailInputRef}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={translations("inputPlaceholder")}
            value={email}
            onChange={handleEmailChange}
            className="text-black w-full h-[48px] border-4 border-primary-500 outline-none rounded-lg p-2"
            autoFocus
            id={EMAIL_INPUT_ID}
          />

          <div className="mt-2">
            <Button
              type="submit"
              text={translations("cta")}
              onClick={handleSigninClick}
              isLoading={isLoading}
              className="rounded-lg"
              size="large"
            />
          </div>
          <p className="text-center text-sm text-white mt-2">
            {translations("caption")}
          </p>
        </div>
      </form>

      {isFormHidden && (
        <StickyLoginBar
          handleEmailChange={handleEmailChange}
          handleSigninClick={handleSigninClick}
          isLoading={isLoading}
          stickyEmailInputRef={stickyEmailInputRef}
          email={email}
        />
      )}
    </>
  );
};
