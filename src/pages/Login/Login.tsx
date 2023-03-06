import {
  Alert,
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useLoginStyles } from "./Login.styles";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import axiosInstance from "../../axiosInstance";
import { AxiosError } from "axios";
import { IconAlertCircle } from "@tabler/icons-react";
import { useEffect, useLayoutEffect } from "react";

interface ILoginMutationData {
  token: string;
}

interface ILoginMutationErrorData {
  message: string;
}

interface IloginMutationParams {
  username: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();

  const loginForm = useForm<IloginMutationParams>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation<
    ILoginMutationData,
    AxiosError<ILoginMutationErrorData>,
    IloginMutationParams
  >(async (userToLoggedIn) => {
    const data = await axiosInstance.post<ILoginMutationData>(
      "/user/signin",
      userToLoggedIn
    );
    return data.data;
  }); // Use the useMutation hook to handle the login API call and manage the async data

  const onSubmitLoginForm = loginForm.onSubmit(async (values) => {
    await mutation.mutateAsync(values); // Call the API with form data
  });

  useEffect(() => {
    if (mutation.data) {
      // If successful, set the token to localStorage and navigate to the videos page
      localStorage.setItem("access_token", mutation.data.token);
      navigate("/videos");
    }
  }, [mutation.data]);

  useLayoutEffect(() => {
    // If the token exists in localStorage, navigate to the videos page
    if (localStorage.getItem("access_token")) {
      navigate("/videos");
    }
  });

  const { classes } = useLoginStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome To Creator Platform!
        </Title>

        <form onSubmit={onSubmitLoginForm}>
          {/* Show an error message if the API call fails */}
          {mutation.isError ? (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Bummer!"
              color="red"
              mb={"xs"}
            >
              <div>
                An error occurred: {mutation.error?.response?.data.message}
              </div>
            </Alert>
          ) : null}

          <TextInput
            placeholder="some_username"
            size="md"
            required
            {...loginForm.getInputProps("username")}
          />
          <PasswordInput
            placeholder="Your password"
            mt="md"
            size="md"
            required
            {...loginForm.getInputProps("password")}
          />
          <Button
            fullWidth
            mt="xl"
            size="md"
            loading={mutation.isLoading}
            type={"submit"}
          >
            Login
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<typeof Link> component={Link} to={"/register"} weight={700}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Login;
