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
// "id": 4,
// "external_id": "565",
// "name": "test task2",
// "task_status": 1,
// "setup_time": 1,
// "run_time_per_unit": 2,
// "teardown_time": 1,
// "quantity": 10,
// "jobs": 1,
// "predecessors": [
//     3
// ],
// "item": "test item",
// "is_active": true,
// "is_deleted": false
const validationSchema = yup.object().shape({
  external_id: yup.string().required("External Id is required"),
  name: yup.string().required("Name is required").nullable(),
  task_status: yup.string().required("Task Status is required").nullable(),
  setup_time: yup.string().required("Setup Time is required").nullable(),
  run_time_per_unit: yup.string().required("Run Time Per Unit is required"),
  teardown_time: yup.string().required("teardown Time is required"),
  quantity: yup.string().required("Quantity is required"),
  predecessors: yup.array(),
  item: yup.string().required("Item is required"),
});

const TaskForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const taskSelector = useAppSelector((state: any) => state.task.taskies);
  //   console.log(jobiesSelector, "jobselector");

  const [
    createTasks,
    { data: taskData, isLoading: taskIsLoading, error: taskError },
  ] = useCreateTasksMutation();

  const [
    updateTasks,
    {
      data: updateTaskData,
      isLoading: updateTaskIsLoading,
      error: updateTaskError,
    },
  ] = useUpdateTasksMutation();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isEditData, setIsEditData] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  // console.log(selectedIds, "selectedId");
  const handleSelectChange = (event: any) => {
    setSelectedIds(event.target.value);
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    console.log(`>>>>>`);

    // Inside the onSubmit function
    const requestData = {
      external_id: data.external_id,
      name: data.name,
      task_status: data.task_status,
      setup_time: data.setup_time,
      run_time_per_unit: data.run_time_per_unit,
      teardown_time: data.teardown_time,
      quantity: data.quantity,
      predecessors: selectedIds,
      item: data.item,
    };
    console.log(requestData, "requestData");
    if (isEdit) {
      updateTasks({ id: params.id, data: requestData });
    } else {
      createTasks(requestData);
    }
  };

  useEffect(() => {
    if (!taskIsLoading && taskData) {
      taskData.code >= 400
        ? toast.error(taskData.message)
        : toast.success(taskData.message) && navigate("/tasks");
    }
  }, [taskIsLoading, taskError, taskData]);

  useEffect(() => {
    if (!updateTaskIsLoading && updateTaskData) {
      updateTaskData.code >= 400
        ? toast.error(updateTaskData.message)
        : toast.success(updateTaskData.message) && navigate("/tasks");
    }
  }, [updateTaskData, updateTaskError, updateTaskIsLoading]);

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
          setSelectedIds(value);
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
            style={{ width: "100%", padding: "20px 5px", margin: "30px auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                {isEdit ? "Edit Task" : "Create Task"}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Controller
                      name="external_id"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="External Id"
                          variant="outlined"
                          type="number"
                          error={!!errors.external_id}
                          margin="normal"
                          helperText={errors.external_id?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Name"
                          variant="outlined"
                          type="text"
                          margin="normal"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="task_status"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Task Status"
                          variant="outlined"
                          type="number"
                          margin="normal"
                          error={!!errors.task_status}
                          helperText={errors.task_status?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="setup_time"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Setup Time"
                          type="number"
                          variant="outlined"
                          margin="normal"
                          error={!!errors.setup_time}
                          helperText={errors.setup_time?.message}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="run_time_per_unit"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Run Time Per Unit"
                          variant="outlined"
                          margin="normal"
                          type="number"
                          error={!!errors.run_time_per_unit}
                          helperText={errors.run_time_per_unit?.message}
                          {...field}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="teardown_time"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Teardown Time"
                          type="number"
                          variant="outlined"
                          margin="normal"
                          error={!!errors.teardown_time}
                          helperText={errors.teardown_time?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="quantity"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          type="number"
                          margin="normal"
                          error={!!errors.quantity}
                          helperText={errors.quantity?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Predecessors</InputLabel>
                      <Controller
                        name="predecessors"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            multiple
                            value={selectedIds}
                            onChange={handleSelectChange}
                            label="Predecessors"
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
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="item"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Item"
                          variant="outlined"
                          type="text"
                          margin="normal"
                          error={!!errors.item}
                          helperText={errors.item?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      hjhj
                    </Button> */}

                    <LoadingButton
                      size="small"
                      type="submit"
                      loading={taskIsLoading || updateTaskIsLoading}
                      color="primary"
                      variant="contained"
                      sx={{ marginBottom: 5 }}
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

export default TaskForm;
