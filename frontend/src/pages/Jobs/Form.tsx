import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";
import "../../index.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
  TextField,
  Typography,
  Grid,
  CardContent,
  InputLabel,
  Box,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import {
  useCreateJobsMutation,
  useGetJobStatusQuery,
  useGetJobTypeQuery,
} from "@/redux/api/jobApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateJobsMutation } from "@/redux/api/jobApi";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { CreateJob } from "@/types/api.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Tabs, Card } from "@mantine/core";
import Loading from "@/components/loading/loading";
import TaskDetails from "@/components/data-tables/tasks/TaskDetails";
import DependencyDetails from "@/components/data-tables/dependency/dependencyDetails";
import taskData from "@/data/tasks.json";
import dependencyData from "@/data/dependancy.json";
import {
  FormInputText,
  FormInputDropdown,
} from "@/components/form-components/FormInputText";
import { setJobStatus, setJobType } from "@/redux/features/jobSlice";
import { useGetAllDependencyQuery } from "@/redux/api/dependencyApi";
import { setDependencies } from "@/redux/features/dependencySlice";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  priority: yup.string().required("priority is required").nullable(),
  due_date: yup.string().required("Date is required").nullable(),
  planned_start_datetime: yup.string().required("Date is required").nullable(),
  planned_end_datetime: yup.string().required("Date is required").nullable(),
  customer: yup.string().required("customer is required").nullable(),
  description: yup.string().required("description is required"),
  note: yup.string().required("note is required"),
  job_status_id: yup.string().required("status is required").nullable(),
  external_id: yup.string().required("External id is required").nullable(),
  job_type_id: yup.string().required("Job Type id is required").nullable(),
});

const MyForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isEdit = !!params.id;
  const jobiesSelector = useAppSelector((state) => state.job.jobies);

  const [
    createJobs,
    {
      data: AddJob,
      isLoading: AddJobIsLoading,
      error: AddJoberror,
      isSuccess: addjobissuccess,
    },
  ] = useCreateJobsMutation();
  const [activeTab, setActiveTab] = useState<string | null>("tasks");
  const jobstatusSelector = useAppSelector((state: any) => state.job.jobstatus);
  const jobtypeSelector = useAppSelector((state: any) => state.job.jobtype);

  const [
    updateJobs,
    {
      data: updateJobData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
    },
  ] = useUpdateJobsMutation();

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

  const {
    data: getDependencyData,
    isLoading: dependencyIsLoading,
    error,
  } = useGetAllDependencyQuery(undefined);

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
  };

  const form = useForm({
    defaultValues: Defaultvalues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<any> = (data) => {
    if (isEdit) {
      updateJobs({ id: params.id!, data: data });
    } else {
      createJobs(data);
      toast.success("Job created SuccessFully");
    }
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
  }, [updateJobData, updateError, updateIsLoading]);

  useEffect(() => {
    if (!dependencyIsLoading && getDependencyData && isEdit) {
      dispatch(setDependencies(getDependencyData));
    }
  }, [dependencyIsLoading, getDependencyData, isEdit]);

  useEffect(() => {
    const planned_start_datetime = ["planned_start_datetime"];
    const planned_end_datetime = ["planned_end_datetime"];
    if (isEdit) {
      if (jobiesSelector) {
        const getJob = jobiesSelector.filter(
          (item: any) => item.id === Number(params.id)
        );
        // console.log(getJob[0], "GetJob", params.id);
        Object.entries(getJob[0] ?? []).forEach(([name, value]: any) => {
          if (planned_start_datetime.includes(name)) {
            form.setValue("planned_start_datetime", value?.slice(0, 16));
            return;
          }
          if (planned_end_datetime.includes(name)) {
            form.setValue("planned_end_datetime", value?.slice(0, 16));
            return;
          }
          form.setValue(name, value);
        });
      }
    }
  }, [isEdit, params.id]);

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const handleTabChange = (newTabValue: any) => {
    setActiveTab(newTabValue);
    // Force a window resize event
    window.dispatchEvent(new Event("resize"));
  };

  type BadgeType = {
    [key in string]: string;
  };

  useEffect(() => {
    if (!jsIsLoading && jobstatus) {
      dispatch(setJobStatus(jobstatus));
    }
  }, [jsIsLoading, jobstatus]);

  useEffect(() => {
    if (!jtIsLoading && jobtype) {
      dispatch(setJobType(jobtype));
    }
  }, [jsIsLoading, jobtype]);
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;

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
              {isEdit ? "Job Details" : "Job Details"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <FormInputText
                    name={"name"}
                    control={control}
                    label={"Job Name"}
                    placeholder={"Enter Job Name"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"description"}
                    control={control}
                    label={"Description"}
                    placeholder={"Write Description"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputText
                    name={"due_date"}
                    control={control}
                    label={"Due Date"}
                    placeholder={""}
                    type={"date"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"priority"}
                    control={control}
                    label={"priority"}
                    placeholder={""}
                    type={"number"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"external_id"}
                    control={control}
                    label={"External Id"}
                    placeholder={""}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"planned_start_datetime"}
                    control={control}
                    label={"Planned Start"}
                    placeholder={""}
                    type={"datetime-local"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"planned_end_datetime"}
                    control={control}
                    label={"Planned End"}
                    placeholder={""}
                    type={"datetime-local"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"note"}
                    control={control}
                    label={"Note"}
                    placeholder={"Write Note"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name={"customer"}
                    control={control}
                    label={"Customer"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputDropdown
                    name={"job_status_id"}
                    control={control}
                    label={"Status"}
                    options={jobstatusSelector ? jobstatusSelector : []}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputDropdown
                    name={"job_type_id"}
                    control={control}
                    label={"Job Type"}
                    options={jobtypeSelector ? jobtypeSelector : []}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
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
                      className="btn-success"
                    >
                      {isEdit ? "Edit" : "Create"}
                    </LoadingButton>
                  </Box>
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
                      <TaskDetails data={taskData} />
                    </div>
                  )}
                </TabsPannel>
                <TabsPannel value="Dependencies">
                  {activeTab === "Dependencies" && (
                    <div style={{ height: "auto", width: "100%" }}>
                      <DependencyDetails data={dependencyData} />
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
