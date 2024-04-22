import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput } from '@mantine/core';

function Login() {
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validate: {
      login: (value) => {
        return value.length <= 0 ? "Należy wpisać login" : null;
      },
      password: (value) => {
        return value.length <= 0 ? "Należy wpisać hasło" : null;
      },
    },
  });

  const handleSubmit = (values) => {
        fetch('http://localhost:8080/api/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Login"
          placeholder='Login' 
          {...form.getInputProps('login')}
        />

        <PasswordInput
          label="Hasło"
          placeholder="Hasło"
          {...form.getInputProps('password')}
        />

        <Group justify="center" mt="md">
          <Button type="submit" radius="xl">Zaloguj</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Login;