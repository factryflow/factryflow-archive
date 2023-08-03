import { AuthProvider } from "react-auth-kit";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

// import Main from "./pages/Main";
import { Login, Signup, ForgotPassword } from "./pages";
// import Main from "./pages/Main"; // Import your main page component

function App() {
  return (
    <AuthProvider authType={"cookie"} authName={"_auth"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
