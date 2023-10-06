import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
import { setUser } from "@/redux/features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import type { Login } from "@/types/api.types";
const LogIn = () => {
  const [loginUser, { data, error, isSuccess, isLoading }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  console.log(data, "login Data");
  const validationSchema = yup.object().shape({
    // email: yup.string().email("invalid email").required("required Email"),
    username: yup.string().required("required username"),
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

  const onSubmit: SubmitHandler<Login> = async (data) => {
    await loginUser(data);
  };

  // const from = ((location.state as any)?.from.pathname as string) || "/jobs";

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      toast.success("You successfully logged in");
      navigate("/jobs");
    }
  }, [isLoading, data]);

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
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="username"
                  variant="outlined"
                  error={!!errors.username}
                  margin="normal"
                  autoComplete="email"
                  helperText={errors.username?.message}
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
