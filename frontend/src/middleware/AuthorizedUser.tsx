// import { useAppSelector } from "@/app/hooks";
// import { useGetProfileQuery } from "@/redux/api/authApi";
// import React, { useEffect } from "react";
// import { toast } from "react-toastify";
// import { setProfile } from "@/redux/features/userSlice";
// import UnAuthorized from "@/pages/UnAuthorized";

// type AuthorizedUserFCProps = {
//   children: React.ReactNode;
// };

// const AuthorizedUser: React.FC<AuthorizedUserFCProps> = ({ children }) => {
//   const authProfile = useAppSelector((state) => state.user.profile);

//   const { data, isLoading, error, isError } = useGetProfileQuery(undefined);

//   useEffect(() => {
//     if (!isLoading && error) {
//       toast.error("Unauthorized Token");
//     }
//     if (!isLoading && data) setProfile(data);
//   }, [isLoading, data, error]);

//   if (isLoading) {
//     return <span>Loading...</span>;
//   }

//   if (authProfile) {
//     return <div>{children}</div>;
//   }

//   return <UnAuthorized />;
// };

// export default AuthorizedUser;

import Loading from "@/components/loading/loading";
import { userApi } from "@/redux/api";
import React from "react";
// import { useCookies } from "react-cookie";
// import Loading from "@/components/loading/loading";
import { Navigate } from "react-router-dom";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  let userprofile = false;

  if (localStorage.getItem("token")) {
    const { access } = JSON.parse(localStorage.getItem("token") as string);

    if (access) {
      userprofile = true;
    }
  }
  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !userprofile,
  });

  if (isLoading) {
    return <Loading />;
  }

  return children;
};

export default AuthMiddleware;
