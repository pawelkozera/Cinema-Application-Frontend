import { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput, Space } from '@mantine/core';
import { useNavigate, useParams } from "react-router-dom";

function RememberPassword() {
    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                return emailRegex.test(value) ? null : "Niepoprawny adres email";
            },
        },
    });

    const navigate = useNavigate();
    const { cinemaName } = useParams();

    const handleSubmit = (values) => {
    };
    
    return (
    <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Podaj email"
          placeholder='Email' 
          {...form.getInputProps('email')}
        />

        <Space h="xs" />
        <Space h="xs" />

        <Group justify="center" mt="md">
            <Button type="submit" variant="filled" color="green" size="lg" radius="xl">Przypomnij hasło</Button>
        </Group>
        </form>
    </Box>
    );
}

export default RememberPassword;