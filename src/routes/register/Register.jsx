import { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput, Space } from '@mantine/core';
import { useNavigate, useParams } from "react-router-dom";

function Register() {
    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            username: (value) => {
                return value.length <= 5 ? "Login musi składać się z minimum 6 znaków" : null;
            },
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                return emailRegex.test(value) ? null : "Niepoprawny adres email";
            },
            password: (value) => {
                if (!value || value.length < 8) {
                    return "Hasło musi składać się z minimum 8 znaków";
                }
                if (!/[a-z]/.test(value)) {
                    return "Hasło musi zawierać co najmniej 1 małą litere";
                }
                if (!/[A-Z]/.test(value)) {
                    return "Hasło musi zawierać co najmniej 1 dużą litere";
                }
                if (!/\d/.test(value)) {
                    return "Hasło musi zawierać co najmniej 1 cyfre";
                }
                if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
                    return "Hasło musi zawierać co najmniej 1 znak specjalny";
                }

                return null;
            },
            confirmPassword: (value, values) => {
                return value !== values.password ? 'Hasła nie pasują do siebie' : null;
            },
        },
    });

    const navigate = useNavigate();
    const { cinemaName } = useParams();

    const handleSubmit = (values) => {
        fetch('http://localhost:8080/api/auth/register', {
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

        <TextInput
          label="Email"
          placeholder='Email' 
          {...form.getInputProps('email')}
        />

        <PasswordInput
            label="Hasło"
            placeholder="Hasło"
            {...form.getInputProps('password')}
        />

        <PasswordInput
            mt="sm"
            label="Potwórz hasło"
            placeholder="Powtórz hasło"
            {...form.getInputProps('confirmPassword')}
        />

        <Space h="xs" />
        <Space h="xs" />

        <Group justify="center" mt="md">
            <Button type="submit" variant="filled" color="green" size="lg" radius="xl">Zarejestruj</Button>
        </Group>
        </form>
    </Box>
    );
}

export default Register;