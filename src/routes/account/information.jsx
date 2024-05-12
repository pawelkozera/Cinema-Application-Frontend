import { useState } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect, PasswordInput, Group } from '@mantine/core';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from '@mantine/form';
import CustomNotification from '../../components/CustomNotification';

import './information.css'
import './account.css'

function Information() {
    const [showNotification, setShowNotification] = useState(false);
    const { cinemaName } = useParams();

    const changePasswordForm = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },

        validate: {
            oldPassword: (value) => {
                if (!value) {
                    return "Hasło nie może być puste";
                }

                return null;
            },
            newPassword: (value) => {
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
            confirmNewPassword: (value, values) => {
                return value !== values.newPassword ? 'Hasła nie pasują do siebie' : null;
            },
        },
    });

    const handleSubmitChangePassword = (values) => {
        setShowNotification(true);
    };

    return (
        <div class='account_container'>
            <div class="account_leftside_menu">
                <Link to={""}>
                    <Text> Dane </Text>
                </Link>

                <Link to={`/${cinemaName}/history`}>
                    <Text> Historia </Text>
                </Link>
            </div>
            <div class="account_rightside">
                <div id='account_information_details'>
                    <Text> Email: test@gmail.com</Text>
                    <Space h="lg" />
                    <Space h="lg" />

                    <form onSubmit={changePasswordForm.onSubmit((values) => handleSubmitChangePassword(values))}>
                        <PasswordInput
                            label="Stare hasło"
                            placeholder="Stare hasło"
                            {...changePasswordForm.getInputProps('oldPassword')}
                        />

                        <PasswordInput
                            label="Nowe hasło"
                            placeholder="Nowe hasło"
                            {...changePasswordForm.getInputProps('newPassword')}
                        />

                        <PasswordInput
                            mt="sm"
                            label="Potwórz nowe hasło"
                            placeholder="Powtórz nowe hasło"
                            {...changePasswordForm.getInputProps('confirmNewPassword')}
                        />

                        <Space h="lg" />
                        <Space h="lg" />

                        <Button type='submit' variant="filled" color="green" size="lg" radius="xl">Zmień hasło</Button>
                    </form>
                </div>

                <Space h="lg" />
                <Space h="lg" />

                <Link to={`/${cinemaName}/remember/password`}>
                    <Text> Nie pamiętam hasła </Text>
                </Link>

                <Space h="lg" />
                <Space h="lg" />

                {showNotification && (
                <CustomNotification
                    onClose={() => setShowNotification(false)}
                    color="green"
                    radius="lg"
                    title="Informacja"
                >
                    Hasło zostało zmienione!
                </CustomNotification>
            )}
            </div>
        </div>
    );
}

export default Information;