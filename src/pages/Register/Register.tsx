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
import { useRegisterStyles } from "./Register.styles";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import axiosInstance from "../../axiosInstance";
import User from "../../types/api/user.interface";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";

interface IRegisterForm {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export function Register() {
  const { classes } = useRegisterStyles();
  const navigate = useNavigate();

  const signUpUserMutation = useMutation<
    User,
    AxiosError<{ message: string }>,
    IRegisterForm
  >(async (newUser) => {
    const data = await axiosInstance.post<User>("user/signup", newUser);
    return data.data;
  }); // Use the useMutation hook to handle the login API call and manage the async data

  const registerForm = useForm<IRegisterForm>({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = registerForm.onSubmit(async (values) => {
    await signUpUserMutation.mutateAsync(values);
  });

  useEffect(() => {
    if (signUpUserMutation.data) {
      // Show notification to remind of username just created
      notifications.show({
        title: `User ${signUpUserMutation.data.username} was created`,
        message: `${signUpUserMutation.data.firstName} ${signUpUserMutation.data.lastName} - ${signUpUserMutation.data.email}`,
        color: "teal",
      });
      // go to login
      navigate("/login");
    }
  }, [signUpUserMutation.data, navigate]);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Register To Creator Platform!
        </Title>

        {/* Show an error message if the API call fails */}
        {signUpUserMutation.isError ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
            mb={"xs"}
          >
            <div>
              An error occurred:{" "}
              {signUpUserMutation.error?.response?.data.message}
            </div>
          </Alert>
        ) : null}

        <form onSubmit={onSubmit}>
          <TextInput
            label="Username"
            placeholder="someUsername"
            mt="md"
            size="md"
            required
            {...registerForm.getInputProps("username")}
          />
          <TextInput
            label="Email"
            type={"email"}
            placeholder="john.doe@gmail.com"
            mt="md"
            size="md"
            required
            {...registerForm.getInputProps("email")}
          />
          <TextInput
            label="First Name"
            placeholder="John Marcus"
            mt="md"
            size="md"
            required
            {...registerForm.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe Smith"
            mt="md"
            size="md"
            required
            {...registerForm.getInputProps("lastName")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            required
            {...registerForm.getInputProps("password")}
          />

          <Button fullWidth mt="xl" size="md" type={"submit"}>
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
