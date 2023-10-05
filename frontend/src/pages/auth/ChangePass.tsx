import React, { useEffect } from "react";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import Layout from "../Layout";

const validationSchema = yup.object().shape({
  current_password: yup.string().required("Current Password is required"),
  new_password: yup.string().required("New Password is required"),
});

const ChangePass = () => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const [changePassword, { isLoading, error, data }] =
    useChangePasswordMutation();

  const onSubmit = (data: any) => {
    changePassword(data);
    reset({ current_password: "", new_password: "" });
    // console.log(data, "Data");
  };

  useEffect(() => {
    if (!isLoading && data) {
      data.code >= 400
        ? toast.error(data.message)
        : toast.success(data.message);
    }
  }, [isLoading, error, data]);

  return (
    <Layout>
      <Grid>
        <Card
          style={{ maxWidth: 450, padding: "20px 5px", margin: "20px auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Change Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Controller
                    name="current_password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Current Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        error={!!errors.current_password}
                        helperText={errors.current_password?.message}
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="new_password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="New Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        error={!!errors.new_password}
                        helperText={errors.new_password?.message}
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
                {isEdit ? "Submit" : "Save Change"}
              </Button> */}

                  <LoadingButton
                    size="small"
                    type="submit"
                    loading={isLoading}
                    color="primary"
                    variant="contained"
                    sx={{ marginBottom: 5 }}
                    fullWidth
                  >
                    Submit
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

export default ChangePass;
