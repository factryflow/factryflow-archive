import { useContext, useState } from "react";
import { AuthContext } from "../context";
import { signIn } from "../api";
import { RequestError } from "../types/index";

export const useSignIn = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const triggerSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { token } = await signIn(email, password);
      setUser({ token });
    } catch (e) {
      const typisedError = e as RequestError;
      setError(typisedError.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  return { triggerSignIn, loading, error };
};
