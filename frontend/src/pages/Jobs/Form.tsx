import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Typography, Card, Grid, CardContent } from "@mui/material";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useCreateJobsMutation } from "../../service/jobApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateJobsMutation } from "../../service/jobApi";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { CreateJob } from "@/types/api.types";
import { useAppSelector } from "../../app/hooks";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  priority: yup.string().required("priority is required").nullable(),
  due_date: yup.date().required("Date is required").nullable(),
  customer: yup.string().required("customer is required").nullable(),
  description: yup.string().required("description is required"),
  note: yup.string().required("note is required"),
});

const MyForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;
  const jobiesSelector = useAppSelector((state) => state.job.jobies);
  console.log(jobiesSelector, "jobselector");

  const [createJobs, { data, isLoading, error }] = useCreateJobsMutation();
  const [
    updateJobs,
    {
      data: updateJobData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      error: updateError,
    },
  ] = useUpdateJobsMutation();

  const form = useForm({
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

  return (
    <Layout>
      <Grid>
        <Card
          style={{ width: "100%", padding: "20px 5px", margin: "30px auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              {isEdit ? "Edit Job" : "Create Job"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Name"
                        variant="outlined"
                        error={!!errors.name}
                        margin="normal"
                        helperText={errors.name?.message}
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="priority"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Priority"
                        variant="outlined"
                        type="number"
                        margin="normal"
                        error={!!errors.priority}
                        helperText={errors.priority?.message}
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Date"
                        type="date"
                        variant="outlined"
                        margin="normal"
                        error={!!errors.due_date}
                        helperText={errors.due_date?.message}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="customer"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Customer"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        error={!!errors.customer}
                        helperText={errors.customer?.message}
                        {...field}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="note"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Note"
                        variant="outlined"
                        margin="normal"
                        error={!!errors.note}
                        helperText={errors.note?.message}
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
                      {isEdit ? "Save Changes" : "Submit"}
                    </Button> */}

                  <LoadingButton
                    size="small"
                    type="submit"
                    loading={isLoading || updateIsLoading}
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
  );
};

export default MyForm;
