import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useRegisterUserMutation } from "../../service/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
import { setUser } from "../../features/authSlice";
const Register = () => {
  const [registerUser, { data, isSuccess, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(data, "register Data");
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required Frist Name"),
    last_name: yup.string().required("required Last Name"),
    email: yup.string().email("invalid email").required("required Email"),
    password: yup.string().required("required password"),
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: any) => {
    await registerUser(values);
  };

  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("user") || "{}");
  //     if (user?.token) {
  //       navigate("/home");
  //     } else {
  //       navigate("/");
  //     }
  //   }, []);

  useEffect(() => {
    if (isSuccess) {
      if (data?.code === 200) {
        toast.success("User Login Successfully");
        dispatch(
          setUser({
            token: data?.data?.token,
            name: data?.data?.first_name.concat(" ", data?.data?.last_name),
          })
        );
        navigate("/home");
      } else if (data?.code === 400) {
        toast.error(data.message);
      }
    }
  }, [isSuccess]);

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
                Register
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Frist Name"
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                margin="normal"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                autoComplete="off"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                margin="normal"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                autoComplete="off"
              />
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 5 }}
              >
                Register
              </Button>
              <Typography>
                Change To
                <Link to="/" color="inherit">
                  {" "}
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
