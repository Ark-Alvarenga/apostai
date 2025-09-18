import React from "react";
import { Button } from "@/components/atoms";
import { EMAIL_INPUT_ID } from "@/constants";
import { useTranslations } from "@/hooks/useTranslations";

interface StickyLoginBarProps {
  handleSigninClick: () => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  stickyEmailInputRef: React.RefObject<HTMLInputElement>;
  email: string;
}

export const StickyLoginBar: React.FC<StickyLoginBarProps> = ({
  handleSigninClick,
  handleEmailChange,
  isLoading,
  stickyEmailInputRef,
  email,
}) => {
  const translations = useTranslations("loginForm");

  /**
   * Pressing "Enter" in the input will submit the form
   * and trigger handleSigninClick
   */
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSigninClick();
  };

  return (
    <form
      className="w-full fixed bottom-0 left-0 bg-black p-4 flex flex-row align-center justify-center gap-2 z-30"
      onSubmit={handleFormSubmit}
    >
      <label htmlFor={EMAIL_INPUT_ID}>{translations("inputLabel")}</label>
      <input
        ref={stickyEmailInputRef}
        type="email"
        name="email" // important for autofill
        autoComplete="email" // helps the browser recognize it for stored credentials
        placeholder={translations("inputPlaceholder")}
        value={email}
        onChange={handleEmailChange}
        className="w-full h-[48px] border-4 border-primary-500 outline-none rounded-lg flex-1 p-2 text-black"
        id={EMAIL_INPUT_ID}
      />

      <div className="min-w-[126px] w-1/4">
        <Button
          type="submit"
          text={translations("ctaSticky")}
          onClick={handleSigninClick}
          isLoading={isLoading}
          className="rounded-lg"
          size="large"
        />
      </div>
    </form>
  );
};
