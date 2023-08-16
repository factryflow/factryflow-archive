import { useState } from "react";
import axios from "axios";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // If the response includes a message in the data, use it
      if (e.response && e.response.data && e.response.data.detail) {
        setError(e.response.data.detail);
      } else {
        setError("Registration failed");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
