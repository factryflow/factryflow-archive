import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Typography,
  Card,
  Grid,
  CardContent,
  Button,
  Autocomplete,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  useCreateTasksMutation,
  useGetTaskStatusQuery,
  useGetTaskTypeQuery,
  useGetTaskByIdMutation,
  useUpdateTasksMutation,
} from "@/redux/api/taskApi";
import { setJobies } from "@/redux/features/jobSlice";
import { useGetAllJobsQuery } from "@/redux/api/jobApi";
import {
  FormInputDropdown,
  FormInputMultipleDropdown,
  FormInputText,
} from "@/components/form-components/FormInputText";
import { Tabs } from "@mantine/core";
import DependencyDetails from "@/components/data-tables/dependency/dependencyDetails";
import { Autocomplete2 } from "@/components/form-components/FormInputText";
import {
  useCreateDependencyMutation,
  useDeleteDependencyMutation,
  useUpdateDependencyMutation,
} from "@/redux/api/dependencyApi";
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
  task_status_id: yup.string().required("Task Status is required").nullable(),
  task_type_id: yup.string().required("Task Type is required").nullable(),
  setup_time: yup.string().required("Setup Time is required").nullable(),
  run_time_per_unit: yup.string().required("Run Time Per Unit is required"),
  teardown_time: yup.string().required("teardown Time is required"),
  quantity: yup.string().required("Quantity is required"),
  predecessor_ids: yup.array(),
  item_id: yup.string().required("Item is required"),
  job_id: yup.string(),
});

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;
  const [activeTab] = useState<string | null>("dependency");

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const { data: getjobData, isLoading: jobisLoading } =
    useGetAllJobsQuery<any>();

  //task-status
  const { data: taskStatus } = useGetTaskStatusQuery();

  //task-type
  const { data: tasktype } = useGetTaskTypeQuery<any>();
  const [createTasks, { isLoading: taskisloding, isSuccess: taskissuccess }] =
    useCreateTasksMutation();
  const [getTaskById, { data: taskgetiddata, isLoading: taskidisloading }] =
    useGetTaskByIdMutation();
  const [updateTasks] = useUpdateTasksMutation();
  const [jobdata, setJobData] = useState<any>([]);
  const [dependencyData, setDependencyData] = useState<any | undefined>();

  const [createDependency] = useCreateDependencyMutation();
  const [updateDependency] = useUpdateDependencyMutation();
  const [deleteDependency] = useDeleteDependencyMutation();
  const paramsId = params && params.id;
  const form = useForm({
    defaultValues: {
      external_id: "",
      name: "",
      task_status_id: "",
      task_type_id: "",
      setup_time: "",
      run_time_per_unit: "",
      teardown_time: "",
      quantity: "",
      predecessor_ids: [],
      item_id: "",
      job_id: "",
    },
    resolver: yupResolver(validationSchema),
  });

  // console.log(selectedIds, "selectedId");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = form;

  const onSubmit = (values: any) => {
    // console.log(`>>>>>`, values);

    // Inside the onSubmit function
    const requestData = {
      name: values.name,
      external_id: values.external_id,
      setup_time: values.setup_time,
      run_time_per_unit: values.run_time_per_unit,
      teardown_time: values.teardown_time,
      quantity: values.quantity,
      task_status_id: values.task_status_id,
      task_type_id: values.task_type_id,
      job_id: values.job_id,
      item_id: values.item_id,
      predecessor_ids: values.predecessor_ids,
      successor_ids: [],
      dependency_ids: [],
    };
    console.log(requestData, "requestData");
    if (isEdit) {
      updateTasks({ id: params.id, data: requestData });
    } else {
      createTasks(requestData);
    }
  };

  const handleCreateDependency = async (values: any) => {
    if (values) {
      const requestObj = {
        name: values.name,
        external_id: values.external_id,
        expected_close_datetime: values.expected_close_datetime,
        actual_close_datetime: values.actual_close_datetime,
        notes: values.notes,
        dependency_status_id: values.dependency_status,
        dependency_type_id: values.dependency_type,
        job_ids: [],
        task_ids: [Number(paramsId)],
      };
      console.log(requestObj, "requestObject");
      const response = await createDependency(requestObj);
      if (response) {
        gettaskid();
      }
    }
  };

  const handleEditDependency = async ({ id, values }: any) => {
    if (id && values) {
      const requestObj = {
        name: values.name,
        external_id: values.external_id,
        expected_close_datetime: values.expected_close_datetime,
        actual_close_datetime: values.actual_close_datetime,
        notes: values.notes,
        dependency_status_id: values.dependency_status.id,
        dependency_type_id: values.dependency_type.id,
        job_ids: [],
        task_ids: [Number(paramsId)],
      };
      const response = await updateDependency({ id, data: requestObj });
      if (response) {
        gettaskid();
      }
    }
  };

  const handleDeleteDependency = async (row: any) => {
    if (row) {
      const response = await deleteDependency(row.original.id);
      if (response) {
        gettaskid();
      }
    }
  };

  const gettaskid = () => {
    getTaskById(Number(paramsId));
  };

  useEffect(() => {
    const task_status = ["task_status"];
    const task_type = ["task_type"];
    const job = ["job"];
    if (!taskidisloading && taskgetiddata && isEdit) {
      Object.entries(taskgetiddata ?? []).forEach(([name, value]: any) => {
        if (task_status.includes(name)) {
          form.setValue("task_status_id", value?.id);
        }
        if (task_type.includes(name)) {
          form.setValue("task_type_id", value?.id);
        }
        if (job.includes(name)) {
          form.setValue("job_id", value.id);
        }
        form.setValue(name, value);
      });
      setDependencyData(taskgetiddata?.dependencies);
    }
  }, [!taskidisloading, taskgetiddata]);

  useEffect(() => {
    if (paramsId) {
      gettaskid();
    }
  }, [paramsId]);

  useEffect(() => {
    if (!jobisLoading && getjobData) {
      const transformedJob = getjobData.map((jobdata: any) => ({
        label: jobdata.name,
        value: jobdata.id,
      }));
      setJobData(transformedJob);
    }
  }, [jobisLoading, getjobData]);

  useEffect(() => {
    if (!taskisloding && taskissuccess) {
      toast.success("Task Create Successfully") && navigate("/tasks");
    }
  }, [taskisloding, taskissuccess]);

  return (
    <>
      {" "}
      <Layout>
        <Grid>
          <Card
            style={boxStyle}
            sx={{ padding: 2, height: "auto", borderRadius: "12px" }}
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
                    <FormInputText
                      name={"external_id"}
                      control={control}
                      label={"External Id"}
                      placeholder={"Enter External Id"}
                      type={"text"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"name"}
                      control={control}
                      label={"Name"}
                      placeholder={"Enter task Name"}
                      type={"text"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputDropdown
                      name={"task_status_id"}
                      control={control}
                      label={"Status"}
                      options={taskStatus ?? []}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <InputLabel sx={{ color: "#181C32" }}>Jobs</InputLabel>
                    <Controller
                      name="job_id"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <Autocomplete
                          options={jobdata}
                          size="small"
                          getOptionLabel={(option: any) => option.label}
                          value={
                            jobdata.find(
                              (option: any) => option.value === Number(value)
                            ) || null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // error={!!errors.category}
                              // helperText={errors.category?.message}
                            />
                          )}
                          renderOption={(props, option: any) => (
                            <MenuItem {...props} value={Number(option.value)}>
                              {option.label}
                            </MenuItem>
                          )}
                          fullWidth
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputDropdown
                      name={"task_type_id"}
                      control={control}
                      label={"Type"}
                      options={tasktype ?? []}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputText
                      name={"setup_time"}
                      control={control}
                      label={"Setup Time"}
                      placeholder={""}
                      type={"number"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"run_time_per_unit"}
                      control={control}
                      label={"Run Time"}
                      placeholder={""}
                      type={"number"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"teardown_time"}
                      control={control}
                      label={"Teardown Time"}
                      placeholder={""}
                      type={"number"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"quantity"}
                      control={control}
                      label={"Quantity"}
                      placeholder={""}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputMultipleDropdown
                      name={"predecessor_ids"}
                      control={control}
                      label={"Predecessors"}
                      options={[]}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"item_id"}
                      control={control}
                      label={"Item"}
                      placeholder={""}
                      type={"number"}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        className="btn-cancel"
                        onClick={() => navigate("/tasks")}
                      >
                        {isEdit ? "Back" : "Cancel"}
                      </Button>
                      <LoadingButton
                        size="large"
                        type="submit"
                        loading={taskisloding}
                        color="primary"
                        variant="contained"
                      >
                        {isEdit ? "Edit" : "Create"}
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {isEdit && (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              p: 1,
              m: 1,
            }}
          >
            <Card style={boxStyle} sx={{ padding: 2, height: "auto" }}>
              <Tabs value={activeTab}>
                <TabsList>
                  <Tabs.Tab value="dependency">Dependencies</Tabs.Tab>
                </TabsList>
                <TabsPannel value="dependency">
                  {activeTab === "dependency" && (
                    <div style={{ height: "auto", width: "100%" }}>
                      <DependencyDetails
                        data={dependencyData ?? []}
                        paramsId={paramsId}
                        handleCreateDependency={handleCreateDependency}
                        handleEditDependency={handleEditDependency}
                        handleDeleteDependency={handleDeleteDependency}
                      />
                    </div>
                  )}
                </TabsPannel>
              </Tabs>
            </Card>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default TaskForm;
