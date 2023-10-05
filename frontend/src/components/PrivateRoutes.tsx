import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // const token = JSON.parse(localStorage.getItem("token") || "{}");
  // return token ? <Outlet /> : <Navigate to="/" />;

  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const _token = localStorage.getItem("token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    // [TODO] fetch auth profile
  }, [token]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
