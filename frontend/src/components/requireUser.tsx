import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "./loading/loading";
import { userApi } from "@/redux/api";

const RequireUser = () => {
  const location = useLocation();

  const tokenInLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token && JSON.parse(token).access;
  };

  const {
    data: user,
    isLoading,
    isFetching,
  } = tokenInLocalStorage()
    ? userApi.endpoints.getMe.useQuery(null)
    : { data: null, isLoading: false, isFetching: false };

  // Show loading indicator while fetching data
  if (isLoading || isFetching) {
    return <Loading />;
  }

  // Check if user data exists from API call
  if (user) {
    return <Outlet />;
  }

  // Redirect if user is not authenticated
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireUser;
