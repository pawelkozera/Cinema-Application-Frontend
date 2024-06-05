import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect, PasswordInput, Group } from '@mantine/core';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from '@mantine/form';
import CustomNotification from '../../components/CustomNotification';

import './information.css'
import './account.css'

function Information() {
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationWrongPassword, setShowNotificationWrongPassword] = useState(false);
    const { cinemaName } = useParams();
    const [email, setEmail] = useState('');
    const token = JSON.parse(localStorage.getItem('JWT'));

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

    const fetchEmail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/getEmail`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                setEmail(data);
            } else {
                console.error('Failed to fetch cinemas');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchEmail();
    }, []);

    const handleSubmitChangePassword = (values) => {
        fetch('http://localhost:8080/api/changePassword', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    changePasswordForm.reset();
                    setShowNotificationWrongPassword(true);
                    throw new Error('Wrong old password');
                }
                else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
            changePasswordForm.reset();
            setShowNotification(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
                    <Text> {email} </Text>
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
                {showNotificationWrongPassword && (
                    <CustomNotification
                        onClose={() => setShowNotificationWrongPassword(false)}
                        color="red"
                        radius="lg"
                        title="Błąd"
                    >
                        Stare hasło jest niepoprawne!
                    </CustomNotification>
                )}
            </div>
        </div>
    );
}

export default Information;