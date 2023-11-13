import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { FormInputText } from "@/components/form-components/FormInputText";

const validationSchema = yup.object().shape({
  current_password: yup.string().required("Current Password is required"),
  new_password: yup.string().required("New Password is required"),
});

const ChangePass = () => {
  const form = useForm({
    defaultValues: { current_password: "", new_password: "" },
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [changePassword, { isLoading, isSuccess, error, data }] =
    useChangePasswordMutation();

  const onSubmit = (data: any) => {
    changePassword(data);
    reset();
  };

  useEffect(() => {
    if (!isLoading && data) toast.success(data.message);
    if (error) console.log(error, "error");
  }, [error, isLoading]);

  return (
    <Layout>
      <Grid>
        <Card
          style={{
            boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)",
            padding: "20px",
            backgroundColor: "white",
            width: "100%",
          }}
          sx={{ padding: 2, height: "auto", borderRadius: "12px" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Change Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <FormInputText
                    name={"current_password"}
                    control={control}
                    label={"Current Password"}
                    placeholder={"Enter current password"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputText
                    name={"new_password"}
                    control={control}
                    label={"New Password"}
                    placeholder={"Enter new  password"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <LoadingButton
                      size="large"
                      type="submit"
                      loading={isLoading}
                      color="primary"
                      variant="contained"
                    >
                      Submit
                    </LoadingButton>
                  </Box>
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
