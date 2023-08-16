import { useState } from "react";
import { useSignIn as useReactAuthKitSignIn } from "react-auth-kit";
import axios from "axios";

export const useSignIn = () => {
  const signIn = useReactAuthKitSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signin = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    // append other parameters if required

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/jwt/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        return signIn({
          token: response.data.access_token,
          expiresIn: 60,
          tokenType: "Bearer",
          authState: { username: username },
        });
      }
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      // If the response includes a message in the data, use it
      if (e.response && e.response.data && e.response.data.detail) {
        setError(e.response.data.detail);
      } else {
        setError("Sign in failed");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register: signin, loading, error };
};
