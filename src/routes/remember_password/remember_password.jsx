import { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput, Space } from '@mantine/core';
import { useNavigate, useParams } from "react-router-dom";
import CustomNotification from '../../components/CustomNotification';

function RememberPassword() {
    const [showNotification, setShowNotification] = useState(false);
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
        setShowNotification(true);
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

            <Space h="xs" />
            <Space h="xs" />

            {showNotification && (
                <CustomNotification
                    onClose={() => setShowNotification(false)}
                    color="green"
                    radius="lg"
                    title="Informacja"
                >
                    Przypomnienie hasła zostało wysłane na podany adres email!
                </CustomNotification>
            )}
        </Box>
    );
}

export default RememberPassword;
