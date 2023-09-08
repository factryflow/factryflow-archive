import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Typography,
  Card,
  Grid,
  CardContent,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppSelector } from "../../app/hooks";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import {
  useCreateTasksMutation,
  useUpdateTasksMutation,
} from "../../service/taskApi";
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
  jobs: yup.string().required("Job is required"),
  // tasks: yup.string().required("Task is rquire"),
});

const DependencyForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const jobselector = useAppSelector((state: any) => state.job.jobies);
  const taskSelector = useAppSelector((state: any) => state.task.taskies);
  console.log(jobselector, "jobselector");

  const [
    createTasks,
    { data: taskData, isLoading: taskIsLoading, error: taskError },
  ] = useCreateTasksMutation();

  // const [
  //   updateTasks,
  //   {
  //     data: updateTaskData,
  //     isLoading: updateTaskIsLoading,
  //     error: updateTaskError,
  //   },
  // ] = useUpdateTasksMutation();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isEditData, setIsEditData] = useState({});
  const [selectedJobIds, setSelectedJobIds] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState("");

  // console.log(selectedJobIds, "selectedId");
  const handleSelectChange = (event: any) => {
    setSelectedJobIds(event.target.value);
  };
  const handleSelectTask = (event: any) => {
    setSelectedTaskIds(event.target.value);
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    console.log(data, "Data");
  };

  useEffect(() => {
    if (!taskIsLoading && taskData) {
      taskData.code >= 400
        ? toast.error(taskData.message)
        : toast.success(taskData.message) && navigate("/tasks");
    }
  }, [taskIsLoading, taskError, taskData]);

  useEffect(() => {
    if (isEdit) {
      if (taskSelector) {
        const getTask = taskSelector.filter(
          (item: any) => item.id === Number(params.id)
        );
        setIsEditData(getTask[0]);
      }
    }
  }, [isEdit, params.id]);

  useEffect(() => {
    const excluded_fields = ["predecessors"];

    if (isEditData) {
      Object.entries(isEditData ?? []).forEach(([name, value]: any) => {
        console.log(name, "value", value);
        // console.log(name,">>>>",value,"<<<<<<");
        if (excluded_fields.includes(name)) {
          setSelectedJobIds(value);
          return;
        }
        form.setValue(name, value);
      });
    }
  }, [isEditData]);

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
                          <Select
                            {...field}
                            value={selectedJobIds}
                            onChange={handleSelectChange}
                            label="jobs"
                          >
                            {jobselector.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Tasks</InputLabel>
                      <Controller
                        name="tasks"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            value={selectedTaskIds}
                            onChange={handleSelectTask}
                            label="Tasks"
                          >
                            {taskSelector.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>  */}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      hjhj
                    </Button>

                    {/* <LoadingButton
                      size="small"
                      type="submit"
                      // loading={taskIsLoading || updateTaskIsLoading}
                      color="primary"
                      variant="contained"
                      sx={{ marginBottom: 5 }}
                      fullWidth
                    >
                      {isEdit ? "Save Changes" : "Submit"}
                    </LoadingButton> */}
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
