import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { RequireAuth } from "react-auth-kit";

import { SignIn, Signup, ForgotPassword } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path={"/"}
        element={
          <RequireAuth loginPath={"/signin"}>
            <div>
              <Home />
            </div>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
