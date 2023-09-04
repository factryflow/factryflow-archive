import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Jobs from "./pages/Jobs";
import Tasks from "./pages/Tasks";
import Form from "./pages/Jobs/Form";
import MyForm from "./pages/Jobs/Form";
function App() {
  // const dispatch = useAppDispatch();
  // const user = JSON.parse(localStorage.getItem("token") || "{}");

  // useEffect(() => {
  //   dispatch(setUser(user));
  // }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="jobs/form" element={<Form />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/form" element={<MyForm />} />
          <Route path="/jobs/form/:id" element={<MyForm />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
