import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./context";
import { AuthRoute } from "./components/AuthRoute/AuthRoute";
import { SignInPage } from "./components/SignInPage/SignInPage";
import { SignUpPage } from "./components/SignUpPage/SignUpPage";
import { Home } from "./components/Home/Home";

export type User = {
  token: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Navigate to="signin" />} />
        <Route
          path="/signin"
          element={
            <AuthRoute isProtected={false}>
              <SignInPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute isProtected={false}>
              <SignUpPage />
            </AuthRoute>
          }
        />
        <Route
          path="/home"
          element={
            <AuthRoute isProtected>
              <Home />
            </AuthRoute>
          }
        />

        {/*<Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path={"/"}
        element={
          <RequireAuth loginPath={"/signin"}>
            <div>
              <Home />
            </div>
          </RequireAuth>
        }
      /> */}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
