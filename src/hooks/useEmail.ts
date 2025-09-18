import { useState } from "react";
import { validateEmail } from "@/helpers";

export const useEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!validateEmail(email)) {
      setError("Email informado é inválido. Por favor verifique.");
      return false;
    }
    setError("");
    return true;
  };

  return {
    email,
    setEmail,
    error,
    validate,
  };
};
