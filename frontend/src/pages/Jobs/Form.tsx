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
import { useCreateJobsMutation } from "@/redux/api/jobApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateJobsMutation } from "@/redux/api/jobApi";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { CreateJob } from "@/types/api.types";
import { useAppSelector } from "../../app/hooks";
import { Tabs, Card } from "@mantine/core";
import Loading from "@/components/loading/loading";
import TaskDetails from "@/components/data-tables/tasks/TaskDetails";
import DependencyDetails from "@/components/data-tables/dependency/dependencyDetails";
import taskData from "@/data/tasks.json";
import dependencyData from "@/data/dependancy.json";

import { FormInputText } from "@/components/form-components/FormInputText";
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  priority: yup.string().required("priority is required").nullable(),
  due_date: yup.date().required("Date is required").nullable(),
  planned_start_datetime: yup.string().required("Date is required").nullable(),

  // planned_end_datetime: yup.date().required("Date is required").nullable(),
  customer: yup.string().required("customer is required").nullable(),
  description: yup.string().required("description is required"),
  note: yup.string().required("note is required"),
  status: yup.string().required("status is required").nullable(),
});

// {
//   "name": "string",
//   "description": "string",
//   "customer": "string",
//   "due_date": "2023-10-09",
//   "priority": 0,
//   "planned_start_datetime": "2023-10-09T09:10:46.206Z",
//   "planned_end_datetime": "2023-10-09T09:10:46.206Z",
//   "external_id": "string",
//   "note": "string",
//   "job_status_id": 0,
//   "job_type_id": 0
// }

const MyForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;
  const jobiesSelector = useAppSelector((state) => state.job.jobies);
  console.log(jobiesSelector, "jobselector");
  const [statuschange, setStatus] = useState(0);
  const [createJobs, { data, isLoading, error }] = useCreateJobsMutation();
  const [activeTab, setActiveTab] = useState<string | null>("tasks");

  const [
    updateJobs,
    {
      data: updateJobData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
    },
  ] = useUpdateJobsMutation();

  const Defaultvalues = {
    name: "",
    priority: "",
    due_date: new Date(),
    customer: "",
    description: "",
    note: "",
    status: "",
    planned_start_datetime: "",
  };

  const form = useForm({
    defaultValues: Defaultvalues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<any> = (data) => {
    // Inside the onSubmit function
    if (!data) return;
    const formattedDate = format(data.due_date, "MM/dd/yyyy");
    const requestData = {
      name: data.name,
      priority: data.priority,
      due_date: formattedDate,
      customer: data.customer,
      description: data.description,
      note: data.note,
    };

    if (isEdit) {
      updateJobs({ id: params.id!, data: requestData });
    } else {
      createJobs(requestData);
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      data.code >= 400
        ? toast.error(data.message)
        : toast.success(data.message) && navigate("/jobs");
    }
  }, [isLoading, error, data]);

  useEffect(() => {
    if (!updateIsLoading && updateJobData) {
      updateJobData.code >= 400
        ? toast.error(updateJobData.message)
        : toast.success(updateJobData.message) && navigate("/jobs");
    }
  }, [updateJobData, updateError, updateIsLoading]);

  useEffect(() => {
    if (isEdit) {
      if (jobiesSelector) {
        const getJob = jobiesSelector.filter(
          (item: any) => item.id === Number(params.id)
        );
        // console.log(getJob, "GetJob", params.id);
        Object.entries(getJob[0] ?? []).forEach(([name, value]: any) =>
          form.setValue(name, value)
        );
      }
    }
  }, [isEdit, params.id]);

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const handleStatus = (e: any) => {
    setStatus(e.target.value);
  };

  const handleTabChange = (newTabValue: any) => {
    setActiveTab(newTabValue);
    // Force a window resize event
    window.dispatchEvent(new Event("resize"));
  };

  type BadgeType = {
    [key in string]: string;
  };

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
                {/* <Grid item xs={6}>
                  <FormInputDate
                    name={"planned_start_datetime"}
                    control={control}
                  />
                </Grid> */}

                <Grid item xs={6}>
                  <Typography variant="subtitle1">Status</Typography>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          fullWidth
                          size="small"
                          value={statuschange}
                          onChange={handleStatus}
                          sx={{
                            background: "#F9F9F9 !important",
                          }}
                          inputProps={{
                            style: {
                              borderRadius: "5px",
                            },
                          }}
                        >
                          <MenuItem defaultChecked value={0}>
                            Not Planned
                          </MenuItem>
                          <MenuItem value={1}>True</MenuItem>
                          <MenuItem value={2}>False</MenuItem>
                        </Select>
                      </>
                    )}
                  />
                </Grid>

                {/* <Grid item xs={6} sx={{ mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Customer
                  </Typography>

                  <Controller
                    name="customer"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        type="number"
                        size="small"
                        error={!!errors.customer}
                        helperText={errors.customer?.message}
                        {...field}
                        fullWidth
                        InputProps={{
                          style: {
                            borderRadius: "5px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid> */}

                {/* <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {" "}
                    Note
                  </Typography>

                  <Controller
                    name="note"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        size="small"
                        error={!!errors.note}
                        helperText={errors.note?.message}
                        fullWidth
                        {...field}
                        InputProps={{
                          style: {
                            borderRadius: "5px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid> */}

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
                      loading={isLoading || updateIsLoading}
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
