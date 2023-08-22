import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Alert,
  Text,
  Anchor,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSignUp } from "../../hooks/useSignUp";
import { SignUpSchema } from "../../utils/schemas";

type SignInInitialValues = {
  email: string;
  password: string;
};

const initialValues: SignInInitialValues = {
  email: "",
  password: "",
};

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { triggerSignUp, loading, error } = useSignUp();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    validateOnChange: false,
    onSubmit: async ({ email, password }) => {
      triggerSignUp(email, password);
    },
  });

  return (
    <Container size={420} my={40}>
      <form onSubmit={handleSubmit}>
        <Title
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          SIGN UP
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component="button" onClick={handleSignInClick}>
            Sign in
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {error && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Sign up Failed!"
              color="red"
            >
              {error}
            </Alert>
          )}
          <TextInput
            id="email"
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
