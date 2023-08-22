import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Container,
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSignIn } from "../../hooks/useSignIn";
import { SignInSchema } from "../../utils/schemas";

type SignInInitialValues = {
  email: string;
  password: string;
};

const initialValues: SignInInitialValues = {
  email: "",
  password: "",
};

export const SignInPage = () => {
  const navigate = useNavigate();
  const { triggerSignIn, loading, error } = useSignIn();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: SignInSchema,
    validateOnChange: false,
    onSubmit: async ({ email, password }) => {
      await triggerSignIn(email, password);
    },
  });

  return (
    <Container size={420} my={40}>
      <form onSubmit={handleSubmit}>
        <Title
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          SIGN IN
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don't have an account?{" "}
          <Anchor size="sm" component="button" onClick={handleSignUpClick}>
            Sign up
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {error && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Sign in failed!"
              color="red"
            >
              {error}
            </Alert>
          )}
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter email"
            required
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter password"
            required
            mt="md"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Group position="apart" mt="lg">
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
