import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";
import "../../index.css";
import { useForm, SubmitHandler } from "react-hook-form";

import { Typography, Grid, Box, Button } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import {
  useCreateJobsMutation,
  useGetJobStatusQuery,
  useGetJobTypeQuery,
  useGetJobByIdMutation,
} from "@/redux/api/jobApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateJobsMutation } from "@/redux/api/jobApi";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Skeleton from "@mui/material/Skeleton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Tabs, Card } from "@mantine/core";

import TaskDetails from "@/components/data-tables/tasks/TaskDetails";
import DependencyDetails from "@/components/data-tables/dependency/dependencyDetails";
import taskData from "@/data/tasks.json";

import {
  FormInputText,
  FormInputDropdown,
  FormInputMultipleDropdown,
} from "@/components/form-components/FormInputText";
import { setJob, setJobStatus, setJobType } from "@/redux/features/jobSlice";
import {
  useCreateDependencyMutation,
  useDeleteDependencyMutation,
  useGetAllDependencyQuery,
  useUpdateDependencyMutation,
} from "@/redux/api/dependencyApi";
import { setDependencies } from "@/redux/features/dependencySlice";
import { setTaskies } from "@/redux/features/taskSlice";
import {
  useCreateTasksMutation,
  useUpdateTasksMutation,
  useGetAllTasksQuery,
  useDeleteTasksMutation,
} from "@/redux/api/taskApi";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  priority: yup.string().required("priority is required").nullable(),
  due_date: yup.string().required("Date is required").nullable(),
  // planned_start_datetime: yup.string().required("Date is required").nullable(),
  // planned_end_datetime: yup.string().required("Date is required").nullable(),
  customer: yup.string().required("customer is required").nullable(),
  // description: yup.string().required("description is required"),
  // note: yup.string().required("note is required"),
  job_status_id: yup.string().required("status is required").nullable(),
  external_id: yup.string().required("External id is required").nullable(),
  job_type_id: yup.string().required("Job Type id is required").nullable(),
});

const MyForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isEdit = !!params.id;
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;
  const [activeTab, setActiveTab] = useState<string | null>("tasks");
  const jobstatusSelector = useAppSelector((state: any) => state.job.jobstatus);
  const jobtypeSelector = useAppSelector((state: any) => state.job.jobtype);
  const [dependencyData, setDependencyData] = useState<any | undefined>();
  const [tasksdata, setTasksData] = useState<any | undefined>();
  const paramsId = params && params.id;

  const Defaultvalues = {
    name: "",
    priority: "",
    due_date: "",
    customer: "",
    description: "",
    note: "",
    planned_start_datetime: "",
    planned_end_datetime: "",
    job_status_id: "",
    external_id: "",
    job_type_id: "",
    dependency_ids: [],
    task_ids: [],
  };

  const form = useForm({
    defaultValues: Defaultvalues,
    resolver: yupResolver(validationSchema),
  });

  type BadgeType = {
    [key in string]: string;
  };

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = form;

  const [
    createJobs,
    {
      data: AddJob,
      isLoading: AddJobIsLoading,
      error: AddJoberror,
      isSuccess: addjobissuccess,
    },
  ] = useCreateJobsMutation();

  const [
    updateJobs,
    {
      data: updateJobData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
    },
  ] = useUpdateJobsMutation();

  const [getJobIdData, { data: JobByIdData, isLoading: jobiddataIsLoading }] =
    useGetJobByIdMutation(undefined);

  // const { data: getTaskData, isLoading: taskIsLoading } =
  //   useGetAllTasksQuery(undefined);

  // call api jobstatus
  const { data: jobstatus, isLoading: jsIsLoading } = useGetJobStatusQuery(
    undefined,
    {}
  );

  // call api jobtype
  const { data: jobtype, isLoading: jtIsLoading } = useGetJobTypeQuery(
    undefined,
    {}
  );

  const [createTasks] = useCreateTasksMutation();
  const [updateTasks] = useUpdateTasksMutation();
  const [deleteTasks] = useDeleteTasksMutation();

  const [createDependency] = useCreateDependencyMutation();
  const [updateDependency] = useUpdateDependencyMutation();
  const [deleteDependency] = useDeleteDependencyMutation();

  const handleCreateTask = async (requestObj: { requestObj: any }) => {
    if (requestObj) {
      const response = await createTasks(requestObj);
      if (response) {
        getjobid();
      }
    }
  };

  const handleEditTask = async ({
    taskid,
    requestObj,
  }: {
    taskid: any;
    requestObj: any;
  }) => {
    if (requestObj) {
      const response = await updateTasks({ id: taskid, data: requestObj });
      if (response) {
        getjobid();
      }
    }
  };

  const handleDeleteTask = async (row: any) => {
    if (row) {
      const response = await deleteTasks(row.original.id);
      if (response) {
        getjobid();
      }
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
        job_ids: [Number(paramsId)],
        task_ids: [],
      };
      console.log(requestObj, "requestObject");
      const response = await createDependency(requestObj);
      if (response) {
        getjobid();
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
        job_ids: [Number(paramsId)],
        task_ids: [],
      };
      const response = await updateDependency({ id, data: requestObj });
      if (response) {
        getjobid();
      }
    }
  };

  const handleDeleteDependency = async (row: any) => {
    if (row) {
      const response = await deleteDependency(row.original.id);
      if (response) {
        getjobid();
      }
    }
  };

  const getjobid = () => {
    getJobIdData(Number(paramsId!));
  };

  // const { data: getDependencyData, isLoading: dependencyIsLoading } =
  //   useGetAllDependencyQuery(undefined);

  const onSubmit: SubmitHandler<any> = (data) => {
    if (isEdit) {
      updateJobs({ id: params.id!, data: data });
    } else {
      createJobs(data);
    }
  };

  const handleTabChange = (newTabValue: any) => {
    setActiveTab(newTabValue);
    // Force a window resize event
    window.dispatchEvent(new Event("resize"));
  };

  useEffect(() => {
    if (!AddJobIsLoading && AddJob && addjobissuccess) {
      navigate("/jobs");
    }
  }, [AddJobIsLoading, AddJob, addjobissuccess]);

  useEffect(() => {
    if (!updateIsLoading && updateJobData) {
      toast.success("Update job Successfully") && navigate("/jobs");
    }
  }, [updateJobData, updateIsLoading]);

  // useEffect(() => {
  //   if (!dependencyIsLoading && getDependencyData) {
  //     dispatch(setDependencies(getDependencyData));
  //   }
  // }, [dependencyIsLoading, getDependencyData]);

  useEffect(() => {
    if (paramsId) {
      getjobid();
    }
  }, [paramsId]);

  useEffect(() => {
    const planned_start_datetime = ["planned_start_datetime"];
    const planned_end_datetime = ["planned_end_datetime"];
    const job_status = ["job_status"];
    const job_type = ["job_type"];
    if (isEdit && paramsId) {
      if (!jobiddataIsLoading && JobByIdData) {
        setDependencyData(JobByIdData.dependencies);
        setTasksData(JobByIdData.tasks);
        dispatch(setJob(JobByIdData));
        Object.entries(JobByIdData ?? []).forEach(([name, value]: any) => {
          // if (planned_start_datetime.includes(name)) {
          //   form.setValue("planned_start_datetime", value?.slice(0, 16));
          //   return;
          // }
          // if (planned_end_datetime.includes(name)) {
          //   form.setValue("planned_end_datetime", value?.slice(0, 16));
          //   return;
          // }
          if (job_status.includes(name)) {
            form.setValue("job_status_id", value?.id);
          }
          if (job_type.includes(name)) {
            form.setValue("job_type_id", value?.id);
          }
          form.setValue(name, value);
        });
      }
    }
  }, [isEdit, params.id, jobiddataIsLoading, JobByIdData]);

  useEffect(() => {
    if (!jsIsLoading && jobstatus) {
      dispatch(setJobStatus(jobstatus));
    }
  }, [jsIsLoading, jobstatus]);

  useEffect(() => {
    if (!jtIsLoading && jobtype) {
      dispatch(setJobType(jobtype));
    }
  }, [jtIsLoading, jobtype]);

  // useEffect(() => {
  //   if (!taskIsLoading && getTaskData) {
  //     dispatch(setTaskies(getTaskData));
  //   }
  // }, [taskIsLoading, getTaskData]);

  return (
    <>
      <Layout>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            p: 1,
            m: 1,
          }}
        >
          <Card
            style={boxStyle}
            sx={{ padding: 2, height: "auto", borderRadius: "12px" }}
          >
            <Typography gutterBottom variant="h5" sx={{ mb: 3 }}>
              {jobiddataIsLoading && jobiddataIsLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"500"}
                  height={"20"}
                />
              ) : isEdit ? (
                "Job Details"
              ) : (
                "Job Details"
              )}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputText
                      name={"name"}
                      control={control}
                      label={"Job Name"}
                      placeholder={"Enter Job Name"}
                      type={"text"}
                    />
                  )}
                </Grid>

                {/* <Grid item xs={6}>
                  <FormInputText
                    name={"description"}
                    control={control}
                    label={"Description"}
                    placeholder={"Write Description"}
                    type={"text"}
                  />
                </Grid> */}
                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputText
                      name={"due_date"}
                      control={control}
                      label={"Due Date"}
                      placeholder={""}
                      type={"date"}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputText
                      name={"priority"}
                      control={control}
                      label={"priority"}
                      placeholder={""}
                      type={"number"}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputText
                      name={"external_id"}
                      control={control}
                      label={"External Id"}
                      placeholder={""}
                      type={"text"}
                    />
                  )}
                </Grid>

                {/* <Grid item xs={6}>
                  <FormInputText
                    name={"planned_start_datetime"}
                    control={control}
                    label={"Planned Start"}
                    placeholder={""}
                    type={"datetime-local"}
                  />
                </Grid> */}

                {/* <Grid item xs={6}>
                  <FormInputText
                    name={"planned_end_datetime"}
                    control={control}
                    label={"Planned End"}
                    placeholder={""}
                    type={"datetime-local"}
                  />
                </Grid> */}

                {/* <Grid item xs={6}>
                  <FormInputText
                    name={"note"}
                    control={control}
                    label={"Note"}
                    placeholder={"Write Note"}
                    type={"text"}
                  />
                </Grid> */}

                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputText
                      name={"customer"}
                      control={control}
                      label={"Customer"}
                      type={"text"}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputDropdown
                      name={"job_status_id"}
                      control={control}
                      label={"Status"}
                      options={jobstatusSelector ? jobstatusSelector : []}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
                    <FormInputDropdown
                      name={"job_type_id"}
                      control={control}
                      label={"Job Type"}
                      options={jobtypeSelector ? jobtypeSelector : []}
                    />
                  )}
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  {jobiddataIsLoading && jobiddataIsLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100"}
                    />
                  ) : (
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
                        onClick={() => navigate("/jobs")}
                      >
                        {isEdit ? "Back" : "Cancel"}
                      </Button>
                      <LoadingButton
                        size="large"
                        type="submit"
                        loading={AddJobIsLoading || updateIsLoading}
                        color="primary"
                        variant="contained"
                      >
                        {isEdit ? "Edit" : "Create"}
                      </LoadingButton>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
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
              <Tabs value={activeTab} onTabChange={handleTabChange}>
                <TabsList>
                  <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
                  <Tabs.Tab value="Dependencies">Dependencies</Tabs.Tab>
                </TabsList>

                <TabsPannel value="tasks" style={{ width: "100%" }}>
                  {activeTab === "tasks" && (
                    <div style={{ height: "auto", width: "100%" }}>
                      <TaskDetails
                        paramsId={paramsId}
                        data={tasksdata ?? []}
                        handleCreateTask={handleCreateTask}
                        handleEditTask={handleEditTask}
                        handleDeleteTask={handleDeleteTask}
                      />
                    </div>
                  )}
                </TabsPannel>
                <TabsPannel value="Dependencies">
                  {activeTab === "Dependencies" && (
                    <div style={{ height: "auto", width: "100%" }}>
                      <DependencyDetails
                        paramsId={paramsId}
                        data={dependencyData ?? []}
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

export default MyForm;
