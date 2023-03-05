import {Anchor, Button, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import {useLoginStyles} from "./Login.styles";
import {Link} from "react-router-dom";


export function Login() {
  const {classes} = useLoginStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome To Creator Platform!
        </Title>

        <TextInput label="Username" placeholder="some_username" size="md" required/>
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" required/>
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}

          <Anchor<typeof Link> component={Link} to={"/register"} weight={700}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Login