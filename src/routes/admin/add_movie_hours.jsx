import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Link, useParams } from "react-router-dom";
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import CustomNotification from '../../components/CustomNotification';

import './admin_style.css'

function AdminAddMovieHours() {
    const { cinemaName } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = JSON.parse(localStorage.getItem('JWT'));
    const [rooms, setRooms] = useState([]);
    const [isHourAdded, setIsHourAdded] = useState(false);

    const form = useForm({
        initialValues: {
            date: '',
            format: '',
            roomId: '',
        },
        validate: {
        },
    });

    const checkRole = async (role) => {
        try {
            const response = await fetch(`http://localhost:8080/api/checkRole?role=${role}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            return response.ok;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    useEffect(() => {
        const fetchRole = async () => {
            if (token) {
                const isAdmin = await checkRole('ADMIN');
                setIsAdmin(isAdmin);
            }
        };

        fetchRole();
    }, [token]);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/room/byCinemaName/${cinemaName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRooms(data);
                console.log(data);
            }
            else if (response.status === 204) {
                console.log('No content');
            }
            else {
                console.error('Failed to fetch screening schedules');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSubmit = (values) => {
        const formattedValues = {
            ...values,
            date: dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss')
        };

        console.log(formattedValues);

        fetch(`http://localhost:8080/api/screeningSchedule/add/${formattedValues.roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.jwtToken}`
            },
            body: JSON.stringify(formattedValues),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setIsHourAdded(true);
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className='admin_container'>
            {isAdmin && (
                <div className="admin_form">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <DateTimePicker
                            valueFormat="YYYY-MM-DD HH:mm:ss"
                            label="Godzina filmu"
                            placeholder="Godzina filmu"
                            {...form.getInputProps('date')}
                        />

                        <Select
                            label="Typ filmu"
                            placeholder="Wybierz typ filmu"
                            data={['Napisy', 'Dubbing']}
                            {...form.getInputProps('format')}
                        />

                        <Select
                            label="Sala"
                            placeholder="Wybierz sale"
                            data={rooms.map(room => ({ value: room.id.toString(), label: room.name }))}
                            {...form.getInputProps('roomId')}
                        />
                        
                        <Space h="lg" />
                        <Space h="lg" />
                        <Button type='submit' variant="filled" color="green" size="lg" radius="xl">Dodaj godzinę</Button>
                    </form>

                    <Space h="lg" />
                    <Space h="lg" />
                    
                    {isHourAdded && 
                            <CustomNotification
                            onClose={() => setIsHourAdded(false)}
                            color="green"
                            radius="lg"
                            title="Informacja"
                            >
                                Nowa godzina została dodana!
                            </CustomNotification>
                        }
                </div>
            )}
        </div>
    );
}

export default AdminAddMovieHours;
