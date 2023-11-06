import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "./loading/loading";
import { userApi } from "@/redux/api";

const requireUser = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");
  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated || user ? (
    <Outlet />
  ) : isAuthenticated && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default requireUser;
