import { Box, Button, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useLoginUserMutation } from "../../service/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
import { setUser } from "../../features/authSlice";
const Login = () => {
  const [loginUser, { data, error, isSuccess, isLoading }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(data, "login Data");
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required Email"),
    password: yup.string().required("required password"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: any) => {
    await loginUser(values);
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(
        setUser({
          token: data.data?.token,
        })
      );
      navigate("/home");
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
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={400}
              alignItems="center"
              justifyContent="center"
              margin="auto"
              marginTop={5}
              padding={3}
              borderRadius={5}
              border={1}
            >
              <Typography variant="h4" padding={3} textAlign="center">
                Login
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onChange={handleChange}
                value={values.email}
                name="email"
                margin="normal"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                autoComplete="off"
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                margin="normal"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                autoComplete="off"
              />
              <LoadingButton
                size="small"
                type="submit"
                loading={isLoading}
                color="primary"
                variant="contained"
                sx={{ marginBottom: 5 }}
              >
                Login
              </LoadingButton>
              {/* <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 5 }}
              >
                Login
              </Button> */}
              <Typography>
                Change To
                <Link to="/signup" color="inherit">
                  {" "}
                  Register
                </Link>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
