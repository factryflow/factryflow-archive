import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useLoginUserMutation } from "../../service/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
import { setUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const LogIn = () => {
  const [loginUser, { data, error, isSuccess, isLoading }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(data, "login Data");
  const validationSchema = yup.object().shape({
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
    await loginUser(data);
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(
        setUser({
          token: data.data?.token,
        })
      );
      navigate("/jobs");
      data.code >= 400
        ? toast.error(data.message)
        : toast.success(data.message);
    }
    if (!isLoading && error) {
      console.error(error);
      // toast.error(data.message);
    }
  }, [isLoading, data, error]);

  return (
    <Grid>
      <Container component="main" maxWidth="sm">
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOpenIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  autoComplete="email"
                  helperText={errors.email?.message}
                  fullWidth
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  error={!!errors.password}
                  margin="normal"
                  autoComplete="email"
                  helperText={errors.password?.message}
                  fullWidth
                  {...field}
                />
              )}
            />
            <LoadingButton
              size="large"
              type="submit"
              loading={isLoading}
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                Don't have an account?
                <Link href="/signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </Grid>
  );
};
export default LogIn;
