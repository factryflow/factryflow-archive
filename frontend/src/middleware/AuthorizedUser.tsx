import Loading from "@/components/loading/loading";
import { userApi } from "@/redux/api";
import React from "react";
type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: isAuthenticated,
  });

  if (isLoading) {
    return <Loading />;
  }
  return children;
};

export default AuthMiddleware;
