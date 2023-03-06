import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useLoginStyles } from "./Register.styles";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useLayoutEffect } from "react";

interface RegisterForm {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
}

export function Register() {
  const { classes } = useLoginStyles();
  const navigate = useNavigate();

  const form = useForm<RegisterForm>({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  useLayoutEffect(() => {
    // If the token exists in localStorage, navigate to the videos page
    if (localStorage.getItem("access_token")) {
      navigate("/videos");
    }
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Register To Creator Platform!
        </Title>

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Username"
            placeholder="someUsername"
            mt="md"
            size="md"
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Email"
            type={"email"}
            placeholder="john.doe@gmail.com"
            mt="md"
            size="md"
            required
            {...form.getInputProps("email")}
          />
          <TextInput
            label="First Name"
            placeholder="John Marcus"
            mt="md"
            size="md"
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe Smith"
            mt="md"
            size="md"
            required
            {...form.getInputProps("lastName")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            required
            {...form.getInputProps("password")}
          />

          <Button
            fullWidth
            mt="xl"
            size="md"
            type={"submit"}
            component={Link}
            to={"/login"}
          >
            Register
          </Button>
        </form>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor<typeof Link> component={Link} to={"/login"} weight={700}>
            Log In
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Register;
