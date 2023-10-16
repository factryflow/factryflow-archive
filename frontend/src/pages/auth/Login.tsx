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
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import type { Login } from "@/types/api.types";
import { FormInputText } from "@/components/form-components/FormInputText";

const LogIn = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/jobs" />;
  }

  const [loginUser, { data, error, isLoading, isSuccess }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    // email: yup.string().email("invalid email").required("required Email"),
    username: yup.string().required("required username"),
    password: yup.string().required("required password"),
  });

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
  };

  const defaultValues = {
    username: "",
    password: "",
  };

  const form = useForm({
    defaultValues: defaultValues,
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

  const from = ((location.state as any)?.from.pathname as string) || "/jobs";

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUser(data));
    }
    if (isSuccess) {
      toast.success("You successfully logged in");
      navigate(from);
    }
  }, [isLoading, data]);
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
            <Typography component="h1" variant="h5">
              Sign In for an account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInputText
                    name={"username"}
                    control={control}
                    label={"Username*"}
                    placeholder={"Enter Username"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    name={"password"}
                    control={control}
                    label={"Enter Password"}
                    placeholder={"Enter username"}
                    type={"password"}
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
        </Box>
      </Box>
    </Box>
  );
};
export default LogIn;
