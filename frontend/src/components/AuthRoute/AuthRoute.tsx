import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  children: ReactNode;
  isProtected: boolean;
};

export const AuthRoute = ({ children, isProtected }: Props) => {
  const { isAuthorized } = useAuth();

  if (isProtected) {
    return !isAuthorized ? children : <Navigate to="/" />;
  } else {
    return !isAuthorized ? <Navigate to="/home" /> : children;
  }
};
