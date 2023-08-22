import { useContext } from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  const { user } = useContext(AuthContext);

  return { user, isAuthorized: user };
};
