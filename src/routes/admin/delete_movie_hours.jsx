import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
import { Link } from "react-router-dom";

import './admin_style.css'

function AdminDeleteMovieHours() {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = JSON.parse(localStorage.getItem('JWT'));
    const [scheduleData, setScheduleData] = useState([]);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);

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

    const fetchSchedules = async () => {
        try {
            
            const response = await fetch(`http://localhost:8080/api/screeningSchedule/getSchedules`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setScheduleData(data);
                console.log(data);
            } else {
                console.error('Failed to delete movie');
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    
    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleDeleteSchedule = async () => {
        if (!selectedScheduleId) return;
    
        try {
            const response = await fetch(`http://localhost:8080/api/screeningSchedule/delete/${selectedScheduleId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                console.log('Schedule deleted successfully');
                setSelectedScheduleId(null);
            } else {
                console.error('Failed to delete schedule');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div class='admin_container'>
            {isAdmin && (
                <div class="admin_form">
                    <Select
                        label="Wybierz godzinę"
                        placeholder="Wybierz godzinę"
                        data={scheduleData.map(schedule => ({
                            value: schedule.id.toString(),
                            label: new Date(schedule.date).toLocaleString()
                        }))}
                        value={selectedScheduleId}
                        onChange={setSelectedScheduleId}
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="red" size="lg" radius="xl" onClick={handleDeleteSchedule}>Usuń godzinę</Button>
                </div>
            )}
        </div>
    );
}

export default AdminDeleteMovieHours;