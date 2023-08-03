import { useNavigate } from "react-router-dom"; // Import useHistory

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Text,
  Alert,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSignIn } from "./useSignIn";

export function SignIn() {
  const { register: signin, loading, error } = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const success = await signin(values.username, values.password);
    if (success) {
      navigate("/");
    }
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: isEmail("Invalid email"),
    },
  });

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/signup")}
          >
            Sign up
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
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
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
}
