import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput, Text, Space } from '@mantine/core';
import { useNavigate, useParams, Link } from "react-router-dom";

import './login.css'

function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => {
        return value.length <= 0 ? "Należy wpisać login" : null;
      },
      password: (value) => {
        return value.length <= 0 ? "Należy wpisać hasło" : null;
      },
    },
  });

  const navigate = useNavigate();
  const { cinemaName } = useParams();

  const handleSubmit = (values) => {
    
        fetch('http://localhost:8080/api/auth/authenticate', {
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
            localStorage.setItem('JWT', JSON.stringify(data));
            console.log('Success:', data);
            navigate(`/${cinemaName}/movies`);
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
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Hasło"
          placeholder="Hasło"
          {...form.getInputProps('password')}
        />

        
        <Space h="xs" />
        <Space h="xs" />
        <Group justify="center" mt="md">
          <Button type="submit" variant="filled" color="green" size="lg" radius="xl">Zaloguj</Button>
        </Group>
      </form>

        <div id='passwordRemember'>
            <Link to={`/${cinemaName}/remember/password`}>
                <Text> Nie pamiętam hasła </Text>
            </Link>
        </div>
    </Box>
  );
}

export default Login;