import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

export default function Register() {
  if (localStorage.getItem("token")) {
    return <Navigate to="/jobs" />;
  }

  const [registerUser, { data, isLoading, isSuccess, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string().required("required username"),
    email: yup.string().email("invalid email").required("required Email"),
    password: yup.string().required("required password"),
  });

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    backgroundColor: "white",
  };

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = form;

  const onSubmit = async (data: any) => {
    if (!isChecked) {
      toast.error("You must accept the Terms & Conditions");
      return;
    }
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" className="main">
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            background: "#023E8A",
            backgroundImage: 'url("./src/assets/images/Effects.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="./src/assets/images/Group.png"
              alt="Image"
              style={{ width: "125px", height: "90px", marginRight: "16px" }}
            />
            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                textAlign: "center",
                fontSize: "105px",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            >
              FactryFlow
            </Typography>
          </Box>

          <Card
            sx={{
              width: "800px",
              maxWidth: "100%",
              height: "80%",
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              borderRadius: "12px",
              border: "1px solid #E1E3EA",
              px: "67px",
              py: "37px",
            }}
            style={boxStyle}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "#181C32",
                fontSize: "24px",
                textAlign: "center",
                fontWeight: 600,
                letterSpacing: "-0.24px",
                marginBottom: "35px",
              }}
            >
              Sign up for an account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{ color: "#181C32", fontWeight: 600, fontSize: "14px" }}
                  >
                    UserName
                  </InputLabel>
                  <Controller
                    name={"username"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        helperText={error ? error.message : null}
                        size="small"
                        type={"text"}
                        autoComplete="off"
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        placeholder={"Enter UserName"}
                        fullWidth
                        variant="outlined"
                        inputProps={{
                          style: {
                            borderRadius: "5px",
                            border: "1px solid #E1E3EA",
                            color: "#7E8299",
                            fontSize: "14px",
                            fontWeight: 600,
                            padding: "13px 12px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{ color: "#181C32", fontWeight: 600, fontSize: "14px" }}
                  >
                    Enter Email
                  </InputLabel>
                  <Controller
                    name={"email"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        helperText={error ? error.message : null}
                        size="small"
                        type={"email"}
                        autoComplete="off"
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        placeholder={"Enter Email Address"}
                        fullWidth
                        variant="outlined"
                        inputProps={{
                          style: {
                            borderRadius: "5px",
                            border: "1px solid #E1E3EA",
                            color: "#7E8299",
                            fontSize: "14px",
                            fontWeight: 600,
                            padding: "13px 12px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    sx={{ color: "#181C32", fontWeight: 600, fontSize: "14px" }}
                  >
                    Password
                  </InputLabel>
                  <Controller
                    name={"password"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        helperText={error ? error.message : null}
                        size="small"
                        type={"password"}
                        autoComplete="off"
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        placeholder={"Enter password"}
                        fullWidth
                        variant="outlined"
                        inputProps={{
                          style: {
                            borderRadius: "5px",
                            border: "1px solid #E1E3EA",
                            color: "#7E8299",
                            fontSize: "14px",
                            fontWeight: 600,
                            padding: "13px 12px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Box sx={{ display: "flex", margin: "20px 13px 0" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        id="accept-terms"
                      />
                    }
                    label="I Accept the Terms & Conditions"
                    htmlFor="accept-terms"
                    sx={{ color: "#181C32", fontWeight: 600, fontSize: "14px" }}
                  />
                </Box>
              </Grid>
              <LoadingButton
                size="large"
                type="submit"
                loading={isLoading}
                fullWidth
                variant="contained"
                sx={{
                  my: 2,
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
                <Grid item sx={{ display: "flex", gap: "5px" }}>
                  Already have an Account?
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#023E8A",
                      }}
                    >
                      Sign In
                    </Typography>
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
