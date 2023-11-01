import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Jobs from "./pages/Jobs";
import Tasks from "./pages/Tasks";
import JobForm from "./pages/Jobs/Form";
import TaskForm from "./pages/Tasks/Form";
import Dependencys from "./pages/dependencies";
import DependencyForm from "./pages/dependencies/Form";
import DependencyType from "./pages/dependencies/dependencytype";
import DependencyTypeForm from "./pages/dependencies/dependencytype/Form";
import Resources from "./pages/resources";
import ChangePass from "./pages/auth/ChangePass";
import ResourcesGroup from "./pages/resources/resorcesgroup";
import ResourceForm from "./pages/resources/Form";
import ResourceGroupForm from "./pages/resources/resorcesgroup/Form";
import Exception from "./pages/Exception";
import ExceptionForm from "./pages/Exception/Form";
import ExceptionType from "./pages/Exception/ExceptionType";
import Template from "./pages/Templates";
import TemplateForm from "./pages/Templates/Form";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./theme";
import RequireUser from "./components/requireUser";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<RequireUser />}>
            <Route path="/jobs" element={<Outlet />}>
              <Route index element={<Jobs />} />
              <Route path="form" element={<JobForm />} />
              <Route path="form/:id" element={<JobForm />} />
            </Route>
          </Route>

          <Route path="/tasks" element={<Outlet />}>
            <Route index element={<Tasks />} />
            <Route path="form" element={<TaskForm />} />
            <Route path="form/:id" element={<TaskForm />} />
          </Route>

          <Route path="/dependency" element={<Outlet />}>
            <Route index element={<Dependencys />} />
            <Route path="form" element={<DependencyForm />} />
            <Route path="form/:id" element={<DependencyForm />} />
            <Route path="dependencytype" element={<Outlet />}>
              <Route index element={<DependencyType />} />
              <Route path="form" element={<DependencyTypeForm />} />
              <Route path="form/:id" element={<DependencyTypeForm />} />
            </Route>
          </Route>

          <Route path="/resources" element={<Outlet />}>
            <Route index element={<Resources />} />
            <Route path="form" element={<ResourceForm />} />
            <Route path="form/:id" element={<ResourceForm />} />

            <Route path="resourcegroup" element={<Outlet />}>
              <Route index element={<ResourcesGroup />} />
              <Route path="form" element={<ResourceGroupForm />} />
              <Route path="form/:id" element={<ResourceGroupForm />} />
            </Route>
          </Route>

          <Route path="/exception" element={<Outlet />}>
            <Route path="/exception" index element={<Exception />} />
            <Route path="form" element={<ExceptionForm />} />
            <Route path="form/:id" element={<ExceptionForm />} />
            <Route path="exception-type" element={<ExceptionType />} />
          </Route>

          <Route path="/template" element={<Outlet />}>
            <Route index element={<Template />} />
            <Route path="form" element={<TemplateForm />} />
            <Route path="form/:id" element={<TemplateForm />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
