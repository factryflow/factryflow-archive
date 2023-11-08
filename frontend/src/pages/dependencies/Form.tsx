import * as yup from "yup";
import { useForm } from "react-hook-form";

import { Typography, Card, Grid, Box, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JobDetails from "@/components/data-tables/jobs/jobsDetails";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  useCreateDependencyMutation,
  useGetAllDependecyStatusQuery,
  useGetDependencyByIdMutation,
  useUpdateDependencyMutation,
} from "@/redux/api/dependencyApi";

import {
  FormInputDropdown,
  FormInputText,
} from "@/components/form-components/FormInputText";
import { useGetAllDependencyTypeQuery } from "@/redux/api/dependencytypeApi";
import { setDependenciestype } from "@/redux/features/dependencytypeSlice";
import { Tabs } from "@mantine/core";
import {
  useCreateJobsMutation,
  useDeleteJobsMutation,
  useUpdateJobsMutation,
} from "@/redux/api/jobApi";
import TaskDetails from "@/components/data-tables/tasks/TaskDetails";
import {
  useCreateTasksMutation,
  useDeleteTasksMutation,
  useUpdateTasksMutation,
} from "@/redux/api/taskApi";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  external_id: yup.string().required("External id is required").nullable(),
  dependency_type_id: yup
    .string()
    .required("Dependency type is required")
    .nullable(),
  dependency_status_id: yup
    .string()
    .required("Dependency Status is required")
    .nullable(),
  expected_close_datetime: yup
    .string()
    .required("Expected Closed is required")
    .nullable(),
  actual_close_datetime: yup
    .string()
    .required("Closed Date is required")
    .nullable(),
  notes: yup.string().required("Note is required").nullable(),
});

const DependencyForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isEdit = !!params.id;
  const paramsId = params && params.id;
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;
  const [activeTab, setActiveTab] = useState<string | null>("jobs");
  const [jobData, setJobData] = useState<any>();
  const [tasksdata, setTasksData] = useState<any | undefined>();
  const location = useLocation();
  const viewmode = location?.state?.viewmode;

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const { data: dependencytypedata } = useGetAllDependencyTypeQuery();
  const { data: dependencystatusdata } =
    useGetAllDependecyStatusQuery(undefined);

  const [
    createDependency,
    { isLoading: cdIsLoading, error: cdError, isSuccess: cdIsSuccess },
  ] = useCreateDependencyMutation();

  const [getDependencyById, { data: getdependencyiddata }] =
    useGetDependencyByIdMutation<any>();

  //call api dependency type
  const {
    data: dtData,
    isLoading: dtisloading,
    error: dterror,
  } = useGetAllDependencyTypeQuery();

  const [
    updateDependency,
    { isLoading: udIsLoading, error: udError, isSuccess: udIsSuccess },
  ] = useUpdateDependencyMutation();

  const Defaultvalues = {
    name: "",
    external_id: "",
    dependency_type_id: "",
    dependency_status_id: "",
    expected_close_datetime: "",
    actual_close_datetime: "",
    notes: "",
  };

  const form = useForm({
    defaultValues: Defaultvalues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    if (isEdit) {
      updateDependency({ id: params.id!, data: data });
    } else {
      createDependency(data);
    }
  };

  const [createJobs] = useCreateJobsMutation();
  const [updateJobs] = useUpdateJobsMutation();
  const [deleteJobs] = useDeleteJobsMutation();

  const [createTasks] = useCreateTasksMutation();
  const [updateTasks] = useUpdateTasksMutation();
  const [deleteTasks] = useDeleteTasksMutation();

  const handleCreateTask = async (values: any) => {
    if (values) {
      const requestObj: any = {
        id: "",
        name: values.name,
        external_id: values.external_id,
        setup_time: values.setup_time,
        run_time_per_unit: values.run_time_per_unit,
        teardown_time: values.teardown_time,
        quantity: values.quantity,
        task_status_id: values.task_status,
        task_type_id: values.task_type,
        job_id: values.job,
        item_id: values.item,
        predecessor_ids: [],
        dependency_ids: [Number(paramsId)],
      };
      const response = await createTasks(requestObj);
      if (response) {
        getdependencyid();
      }
    }
  };

  const handleEditTask = async ({
    id,
    values,
    taskstatus,
    tasktype,
    job,
  }: any) => {
    console.log(id);
    if (id && values) {
      const requestObj: any = {
        name: values.name,
        external_id: values.external_id,
        setup_time: values.setup_time,
        run_time_per_unit: values.run_time_per_unit,
        teardown_time: values.teardown_time,
        quantity: values.quantity,
        task_status_id: taskstatus,
        task_type_id: tasktype,
        job_id: job,
        item_id: values.item,
        predecessor_ids: [],
        dependency_ids: [Number(paramsId)],
      };
      const response = await updateTasks({ id, data: requestObj });
      if (response) {
        getdependencyid();
      }
    }
  };

  const handleDeleteTask = async (row: any) => {
    if (row) {
      const response = await deleteTasks(row.original.id);
      if (response) {
        getdependencyid();
      }
    }
  };

  const handleCreateJob = async (values: any) => {
    if (values) {
      const requestObj = {
        name: values.name,
        customer: values.customer,
        due_date: values.due_date,
        external_id: values.external_id,
        job_status_id: values.job_status,
        job_type_id: values.job_type,
        dependency_ids: [Number(paramsId)],
        task_ids: [],
        priority: values.priority,
      };
      const response = await createJobs(requestObj);
      if (response) {
        getdependencyid();
      }
    }
  };

  const handleEditJob = async ({ id, values, jobstatus, jobtype }: any) => {
    if (id && values) {
      const requestObj = {
        name: values.name,
        customer: values.customer,
        due_date: values.due_date,
        external_id: values.external_id,
        job_status_id: jobstatus,
        job_type_id: jobtype,
        dependency_ids: [Number(paramsId)],
        task_ids: [],
        priority: values.priority,
      };
      const response = await updateJobs({ id, data: requestObj });
      if (response) {
        getdependencyid();
      }
    }
  };

  const handleDeleteJob = async (row: any) => {
    if (row) {
      const response = await deleteJobs(row.original.id);
      if (response) {
        getdependencyid();
      }
    }
  };

  const getdependencyid = () => {
    getDependencyById(Number(paramsId!));
  };

  const handleTabChange = (newTabValue: any) => {
    setActiveTab(newTabValue);
    // Force a window resize event
    window.dispatchEvent(new Event("resize"));
  };

  useEffect(() => {
    if (cdIsSuccess || udIsSuccess) {
      toast.success(`depedency ${isEdit ? "Edit" : "Create"} successfully`) &&
        navigate("/production/dependency");
    }
    if (cdError || udError) {
      toast.error(
        (cdError || (udError as unknown as any))?.data.message as string
      );
    }
  }, [cdIsSuccess, cdError, udIsSuccess, udError]);

  useEffect(() => {
    const excluded_fields_dependency_type = ["dependency_type"];
    const excluded_fields_dependency_status = ["dependency_status"];
    const excludede_field_expected_close_datetime = ["expected_close_datetime"];
    const excludede_actual_close_datetime = ["actual_close_datetime"];
    if (isEdit && getdependencyiddata) {
      if (getdependencyiddata) {
        setJobData(getdependencyiddata.jobs);
        setTasksData(getdependencyiddata.tasks);
        Object.entries(getdependencyiddata ?? []).forEach(
          ([name, value]: any) => {
            if (excludede_field_expected_close_datetime.includes(name)) {
              form.setValue(name, value?.slice(0, 16));
              return;
            }
            if (excludede_actual_close_datetime.includes(name)) {
              form.setValue(name, value?.slice(0, 16));
              return;
            }
            if (excluded_fields_dependency_type.includes(name)) {
              form.setValue("dependency_type_id", value.id);
              return;
            }
            if (excluded_fields_dependency_status.includes(name)) {
              form.setValue("dependency_status_id", value.id);
              return;
            }
            form.setValue(name, value);
          }
        );
      }
    }
  }, [getdependencyiddata]);

  useEffect(() => {
    if (paramsId) {
      getdependencyid();
    }
  }, [paramsId]);

  useEffect(() => {
    if (!dtisloading && dtData) {
      dispatch(setDependenciestype(dtData));
    }
  }, [dtisloading, dtData]);

  return (
    <>
      {" "}
      <Layout>
        <Grid>
          <Card
            style={{
              boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
            }}
            sx={{ padding: 2, height: "auto", borderRadius: "12px" }}
          >
            <Typography gutterBottom variant="h5">
              Dependency Details
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
                    placeholder={"Enter dependency Name"}
                    type={"text"}
                    viewmode={viewmode ? true : false}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"name"}
                    control={control}
                    label={"Name"}
                    placeholder={"Enter  Name"}
                    type={"text"}
                    viewmode={viewmode ? true : false}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"notes"}
                    control={control}
                    label={"Notes"}
                    placeholder={"write notes"}
                    type={"text"}
                    viewmode={viewmode ? true : false}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"expected_close_datetime"}
                    control={control}
                    label={"Expected Date"}
                    placeholder={"expected_close_datetime"}
                    type={"datetime-local"}
                    viewmode={viewmode ? true : false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputText
                    name={"actual_close_datetime"}
                    control={control}
                    label={"Actual Date"}
                    placeholder={""}
                    type={"datetime-local"}
                    viewmode={viewmode ? true : false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputDropdown
                    name={"dependency_status_id"}
                    control={control}
                    label={"Status"}
                    options={dependencystatusdata ?? []}
                    viewmode={viewmode ? true : false}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputDropdown
                    name={"dependency_type_id"}
                    control={control}
                    label={"Type"}
                    options={dependencytypedata ?? []}
                    viewmode={viewmode ? true : false}
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
                      onClick={() => navigate("/production/dependency")}
                    >
                      {isEdit ? "Back" : "Cancel"}
                    </Button>
                    <LoadingButton
                      size="large"
                      type="submit"
                      disabled={viewmode}
                      loading={cdIsLoading || udIsLoading}
                      color="primary"
                      variant="contained"
                    >
                      {isEdit ? "Edit" : "Create"}
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Card>
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
                    <Tabs.Tab value="jobs">jobs</Tabs.Tab>
                    <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
                  </TabsList>

                  <TabsPannel value="jobs" style={{ width: "100%" }}>
                    {activeTab === "jobs" && (
                      <div style={{ height: "auto", width: "100%" }}>
                        <JobDetails
                          data={jobData ?? []}
                          handleCreateJob={handleCreateJob}
                          handleEditJob={handleEditJob}
                          handleDeleteJob={handleDeleteJob}
                          isEdit={isEdit}
                          viewmode={viewmode ? true : false}
                        />
                      </div>
                    )}
                  </TabsPannel>
                  <TabsPannel value="tasks">
                    {activeTab === "tasks" && (
                      <div style={{ height: "auto", width: "100%" }}>
                        <TaskDetails
                          data={tasksdata ?? []}
                          jobisenable={true}
                          handleCreateTask={handleCreateTask}
                          handleEditTask={handleEditTask}
                          handleDeleteTask={handleDeleteTask}
                          isEdit={isEdit}
                          viewmode={viewmode ? true : false}
                        />
                      </div>
                    )}
                  </TabsPannel>
                </Tabs>
              </Card>
            </Box>
          )}
        </Grid>
      </Layout>
    </>
  );
};

export default DependencyForm;
