import { useState } from "react";
import { signUp } from "../api";
import { RequestError } from "../types/index";

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const triggerSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signUp(email, password);
    } catch (e) {
      const typisedError = e as RequestError;
      setError(typisedError.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  return { triggerSignUp, loading, error };
};
