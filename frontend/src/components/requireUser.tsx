import { Navigate, Outlet, useLocation } from "react-router-dom";

import Loading from "./loading/loading";
import { userApi } from "@/redux/api";

const RequireUser = () => {
  const location = useLocation();
  let userprofile = false;
  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return <Loading />;
  }

  if (localStorage.getItem("token")) {
    const { access } = JSON.parse(localStorage.getItem("token") as string);
    if (access) {
      userprofile = true;
    }
  }

  console.log(userprofile, "userprofile");
  return userprofile || user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireUser;
