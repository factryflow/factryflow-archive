import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import {
  TextField,
  Typography,
  Card,
  Grid,
  CardContent,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppSelector } from "../../app/hooks";

import Box from "@mui/material/Box";

import {
  useCreateDependencyMutation,
  useUpdateDependencyMutation,
} from "../../service/dependencyApi";
//   "id": 1,
//   "name": "dependency test",
//   "dependency_type": 1,
//   "dependency_status": 1,
//   "expected_closed": "2023-09-12T09:00:00Z",
//   "closed_date": "2023-09-01T08:00:00Z",
//   "notes": "test notes",
//   "jobs": 1,
//   "tasks": 1,
//   "is_active": true,
//   "is_deleted": false
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  dependency_type: yup.string().required("dependency_type is required"),
  dependency_status: yup
    .string()
    .required("Dependency Status is required")
    .nullable(),
  expected_closed: yup
    .date()
    .required("Expected Closed is required")
    .nullable(),
  closed_date: yup.date().required("Closed Date is required").nullable(),
  notes: yup.string().required("Note is required"),
  jobs: yup.string().required("jobs is required"),
  tasks: yup.string().required("Task is rquired"),
});

const DependencyForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const jobselector = useAppSelector((state: any) => state.job.jobies);
  const taskSelector = useAppSelector((state: any) => state.task.taskies);
  const dependencySelector = useAppSelector(
    (state: any) => state.dependency.dependencies
  );
  console.log(jobselector, "jobselector");
  const [
    createDependency,
    {
      data: dependencyData,
      isLoading: dependencyIsLoading,
      error: dependencyError,
    },
  ] = useCreateDependencyMutation();
  // const [
  //   createTasks,
  //   { data: taskData, isLoading: taskIsLoading, error: taskError },
  // ] = useCreateTasksMutation();

  // const [
  //   updateTasks,
  //   {
  //     data: updateTaskData,
  //     isLoading: updateTaskIsLoading,
  //     error: updateTaskError,
  //   },
  // ] = useUpdateTasksMutation();

  const [
    updateDependency,
    { data: updateDataDependency, isLoading: UddIsLoading, error: UddError },
  ] = useUpdateDependencyMutation();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [selectedJobIds, setSelectedJobIds] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState("");
  console.log(selectedTaskIds, "selectedtaskId");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const handleSelectChange = (event: any) => {
    setValue("jobs", event.target.value);
    setSelectedJobIds(event.target.value);
  };

  const handleSelectTask = (event: any) => {
    setValue("tasks", event.target.value);
    setSelectedTaskIds(JSON.stringify(event.target.value));
  };

  const onSubmit = (data: any) => {
    const expected_closed_date = format(
      data.expected_closed,
      "yyyy-MM-dd HH:mm:ss"
    );
    const closed_date_date = format(
      data.expected_closed,
      "yyyy-MM-dd HH:mm:ss"
    );

    const requestData = {
      name: data.name,
      dependency_type: data.dependency_type,
      dependency_status: data.dependency_status,
      expected_closed: expected_closed_date,
      closed_date: closed_date_date,
      notes: data.notes,
      jobs: data.jobs,
      tasks: data.tasks,
    };

    console.log(data, "Data");
    if (isEdit) {
      updateDependency({ id: params.id, data: requestData });
    } else {
      createDependency(requestData);
    }
  };

  useEffect(() => {
    if (!dependencyIsLoading && dependencyData) {
      dependencyData.code >= 400
        ? toast.error(dependencyData.message)
        : toast.success(dependencyData.message) && navigate("/dependencys");
    }
  }, [dependencyIsLoading, dependencyError, dependencyData]);

  useEffect(() => {
    if (!UddIsLoading && updateDataDependency) {
      updateDataDependency.code >= 400
        ? toast.error(updateDataDependency.message)
        : toast.success(updateDataDependency.message) &&
          navigate("/dependencys");
    }
  }, [UddIsLoading, UddError, updateDataDependency]);

  useEffect(() => {
    const excluded_fields_jobs = ["jobs"];
    const excluded_fields_tasks = ["tasks"];
    const excluded_fields_expected_closed = ["expected_closed"];
    const excluded_fields_closed_date = ["closed_date"];
    if (isEdit) {
      if (dependencySelector) {
        const getDependency = dependencySelector.filter(
          (item: any) => item.id === Number(params.id)
        );
        console.log(getDependency[0], "getDependency");
        Object.entries(getDependency[0] ?? []).forEach(([name, value]: any) => {
          console.log(name, "value", value);
          // console.log(name,">>>>",value,"<<<<<<");
          if (excluded_fields_jobs.includes(name)) {
            form.setValue("jobs", value);
            setSelectedJobIds(value);
            return;
          }
          if (excluded_fields_tasks.includes(name)) {
            form.setValue("tasks", value);
            setSelectedTaskIds(value);
            return;
          }
          if (excluded_fields_expected_closed.includes(name)) {
            form.setValue("expected_closed", value.slice(0, 10));
            return;
          }
          if (excluded_fields_closed_date.includes(name)) {
            form.setValue("closed_date", value.slice(0, 10));
            return;
          }
          form.setValue(name, value);
        });
      }
    }
  }, [isEdit, params.id]);

  return (
    <>
      {" "}
      <Layout>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "20px auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                {isEdit ? "Edit Dependency" : "Create Dependency"}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Name"
                          variant="outlined"
                          margin="normal"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="dependency_type"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Dependency Type "
                          variant="outlined"
                          type="number"
                          margin="normal"
                          error={!!errors.dependency_type}
                          helperText={errors.dependency_type?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="dependency_status"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Dependency Status"
                          variant="outlined"
                          type="number"
                          margin="normal"
                          error={!!errors.dependency_status}
                          helperText={errors.dependency_status?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="expected_closed"
                      defaultValue={new Date()}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="expected_closed "
                          type="date"
                          variant="outlined"
                          margin="normal"
                          error={!!errors.expected_closed}
                          helperText={errors.expected_closed?.message}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="closed_date"
                      control={control}
                      defaultValue={new Date()}
                      render={({ field }) => (
                        <TextField
                          label="closed_date"
                          variant="outlined"
                          margin="normal"
                          type="date"
                          error={!!errors.closed_date}
                          helperText={errors.closed_date?.message}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="notes"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <TextField
                          label="Notes"
                          variant="outlined"
                          margin="normal"
                          type="text"
                          error={!!errors.notes}
                          helperText={errors.notes?.message}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Jobs</InputLabel>
                      <Controller
                        name="jobs"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Select
                              {...field}
                              value={selectedJobIds}
                              onChange={handleSelectChange}
                              error={!!errors.jobs}
                              label="jobs"
                            >
                              {jobselector.map((item: any) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.jobs?.message}
                            </FormHelperText>
                          </>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Tasks</InputLabel>
                      <Controller
                        name="tasks"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Select
                              {...field}
                              value={selectedTaskIds}
                              error={!!errors.tasks}
                              onChange={handleSelectTask}
                              label="Tasks"
                            >
                              {taskSelector.map((item: any) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.tasks?.message}
                            </FormHelperText>
                          </>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button> */}

                    <LoadingButton
                      size="small"
                      type="submit"
                      loading={dependencyIsLoading || UddIsLoading}
                      color="primary"
                      variant="contained"
                      sx={{ marginBottom: 5 }}
                      fullWidth
                    >
                      {isEdit ? "Save Changes" : "Submit"}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Layout>
    </>
  );
};

export default DependencyForm;
