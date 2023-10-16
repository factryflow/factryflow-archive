import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Box, Card } from "@mui/material";
import * as yup from "yup";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setUser } from "@/redux/features/authSlice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { FormInputText } from "@/components/form-components/FormInputText";

export default function Register() {
  const [registerUser, { data, isLoading, isSuccess, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    username: yup.string().required("required username"),
    email: yup.string().email("invalid email").required("required Email"),
    password: yup.string().required("required password"),
  });

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
  };

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = async (data: any) => {
    await registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        toast.success("User Register Successfully");
        navigate("/");
      }
    }
  }, [isSuccess]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" className="main">
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            background: "#023E8A",
          }}
        >
          <Card
            sx={{
              width: 800,
              height: 500,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              borderRadius: 2,
              px: 6,
              py: 6,
            }}
            style={boxStyle}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Sign up for an account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInputText
                    name={"email"}
                    control={control}
                    label={"Email Address*"}
                    placeholder={"Enter Email Address"}
                    type={"email"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    name={"username"}
                    control={control}
                    label={"User Name"}
                    placeholder={"Enter username"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputText
                    name={"password"}
                    control={control}
                    label={"Password*"}
                    placeholder={"password"}
                    type={"password"}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                size="large"
                type="submit"
                loading={isLoading}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 3,
                  padding: 2,
                  backgroundColor: "#023E8A",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "6px",
                }}
              >
                Sign Up
              </LoadingButton>
              <Grid container justifyContent="center">
                <Grid item>
                  Already have an account?
                  <Link href="/" variant="body2">
                    {"Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
