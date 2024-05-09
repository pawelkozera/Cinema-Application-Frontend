import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
import { Link } from "react-router-dom";

import './admin_style.css'

function AdminAddMovieHours() {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = JSON.parse(localStorage.getItem('JWT'));

    const checkRole = async (role) => {
        try {
            const response = await fetch(`http://localhost:8080/api/checkRole?role=${role}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                return true;
            } else {
                return false;
            }
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

    return (
        <div class='admin_container'>
            {isAdmin && (
                <div class="admin_form">
                    <TextInput
                        label="Godzina filmu"
                        placeholder="Godzina filmu"
                    />

                    <Select
                        label="Typ filmu"
                        placeholder="Wybierz typ filmu"
                        data={['Napisy', 'Dubbing']}
                    />

                    <Select
                        label="Sala"
                        placeholder="Wybierz sale"
                        data={['Sala A', 'Sala B']}
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Dodaj godzinę</Button>
                </div>
            )}
        </div>
    );
}

export default AdminAddMovieHours;