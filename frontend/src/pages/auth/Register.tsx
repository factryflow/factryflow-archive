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
import { Card } from "@mui/material";
import * as yup from "yup";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setUser } from "@/redux/features/authSlice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

export default function Register() {
  const [registerUser, { data, isLoading, isSuccess, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("required Frist Name"),
    last_name: yup.string().required("required Last Name"),
    email: yup.string().email("invalid email").required("required Email"),
    password: yup.string().required("required password"),
  });

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
      if (data?.code === 200) {
        toast.success("User Register Successfully");
        dispatch(
          setUser({
            token: data?.data?.token,
          })
        );
        navigate("/jobs");
      } else if (data?.code === 400) {
        toast.error(data.message);
      }
    }
  }, [isSuccess]);

  return (
    <Grid>
      <Container component="main" maxWidth="sm">
        <Card
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Frist Name"
                      variant="outlined"
                      error={!!errors.first_name}
                      margin="normal"
                      autoComplete="off"
                      helperText={errors.first_name?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      error={!!errors.last_name}
                      margin="normal"
                      autoComplete="off"
                      helperText={errors.last_name?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Email Address"
                      variant="outlined"
                      error={!!errors.email}
                      margin="normal"
                      autoComplete="off"
                      helperText={errors.email?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      error={!!errors.email}
                      margin="normal"
                      autoComplete="off"
                      helperText={errors.password?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <LoadingButton
              size="large"
              type="submit"
              loading={isLoading}
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?
                <Link href="/" variant="body2">
                  {"Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </Grid>
  );
}
