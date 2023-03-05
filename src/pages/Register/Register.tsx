import {Anchor, Button, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import {useLoginStyles} from "./Register.styles";
import {Link} from "react-router-dom";


export function Register() {
  const {classes} = useLoginStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Register To Creator Platform!
        </Title>

        <TextInput label="Username" placeholder="some_username" mt="md" size="md" required/>
        <TextInput label="First Name" placeholder="John Marcus" mt="md" size="md" required/>
        <TextInput label="Last Name" placeholder="Doe Smith" mt="md" size="md" required/>


        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" required/>

        <Button fullWidth mt="xl" size="md">
          Register
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{' '}
          <Anchor<typeof Link> component={Link} to={"/login"} weight={700}>
            Log In
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Register