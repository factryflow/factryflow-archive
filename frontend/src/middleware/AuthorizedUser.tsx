import { useAppSelector } from "@/app/hooks";
import { useGetProfileQuery } from "@/redux/api/authApi";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { setProfile } from "@/redux/features/userSlice";
import UnAuthorized from "@/pages/UnAuthorized";

type AuthorizedUserFCProps = {
  children: React.ReactNode;
};

const AuthorizedUser: React.FC<AuthorizedUserFCProps> = ({ children }) => {
  const authProfile = useAppSelector((state) => state.user.profile);

  const { data, isLoading, error, isError } = useGetProfileQuery(undefined);

  useEffect(() => {
    if (!isLoading && error) {
      toast.error("Unauthorized Token");
    }
    if (!isLoading && data) setProfile(data);
  }, [isLoading, data, error]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (authProfile) {
    return <div>{children}</div>;
  }

  return <UnAuthorized />;
};

export default AuthorizedUser;
