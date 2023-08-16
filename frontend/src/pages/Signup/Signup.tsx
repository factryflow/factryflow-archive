/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom"; // Import useHistory

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
import { useSignup } from "./useSignup";
import { useForm, isEmail } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";

export function Signup() {
  const { register, loading, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const success = await register(values.email, values.password);
    if (success) {
      navigate("/");
      // Redirect to login page
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      // Minimum eight characters, at least one letter and one number:
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : "Minimum eight characters, at least one letter and one number",
    },
  });

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/signin")}
          >
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
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
