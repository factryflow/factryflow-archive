import { Routes, Route } from "react-router-dom";
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
import ExceptionType from "./pages/Exception/ExceptionType";
import Template from "./pages/Templates";
import TemplateForm from "./pages/Templates/Form";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/form" element={<JobForm />} />
          <Route path="/jobs/form/:id" element={<JobForm />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/form" element={<TaskForm />} />
          <Route path="/tasks/form/:id" element={<TaskForm />} />

          <Route path="/dependencys" element={<Dependencys />} />
          <Route path="/dependencys/form" element={<DependencyForm />} />
          <Route path="/dependencys/form/:id" element={<DependencyForm />} />
          <Route
            path="/dependencys/dependencytype"
            element={<DependencyType />}
          />
          <Route
            path="/dependencys/dependencytype/form"
            element={<DependencyTypeForm />}
          />
          <Route
            path="/dependencys/dependencytype/form/:id"
            element={<DependencyTypeForm />}
          />

          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/form" element={<ResourceForm />} />
          <Route path="/resources/form/:id" element={<ResourceForm />} />

          <Route path="/resources/resourcegroup" element={<ResourcesGroup />} />
          <Route
            path="/resources/resourcegroup/form"
            element={<ResourceGroupForm />}
          />
          <Route
            path="/resources/resourcegroup/form/:id"
            element={<ResourceGroupForm />}
          />

          <Route path="/exception" element={<Exception />} />
          <Route path="/exception/exception-type" element={<ExceptionType />} />

          <Route path="/template" element={<Template />} />
          <Route path="/template/form" element={<TemplateForm />} />
          <Route path="/template/form/:id" element={<TemplateForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
