import React, { useState, useEffect } from 'react';
import { TextInput, NumberInput, Textarea, Button, MultiSelect, Space } from '@mantine/core';

import './admin_style.css';

function AdminAddMovie() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [screeningSchedules, setScreeningSchedules] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: [],
        ageRating: '',
        description: '',
        length: '',
        countryProduction: '',
        yearProduction: '',
    });
    const token = JSON.parse(localStorage.getItem('JWT'));

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

    const fetchScreeningSchedules = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/screeningSchedule/getSchedules', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const formattedData = data.map(schedule => {
                    const date = new Date(schedule.date);
                    return {
                        value: String(schedule.id),
                        label: `${date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${schedule.format}`
                    };
                });
                setScreeningSchedules(formattedData);
                console.log(formattedData);
            } else {
                console.error('Failed to fetch screening schedules');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const isAdmin = await checkRole('ADMIN');
                setIsAdmin(isAdmin);
                if (isAdmin) {
                    await fetchScreeningSchedules();
                }
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (value) => {
        value.preventDefault();
        console.log(formData.title); 
        try {
            const response = await fetch('http://localhost:8080/api/movie/addMovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.jwtToken}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    ageRating: formData.ageRating,
                    description: formData.description,
                    length: formData.length,
                    countryProduction: formData.countryProduction,
                    yearProduction: formData.yearProduction,
                })
            });
            if (response.ok) {
                console.log('Movie added successfully');
            } else {
                console.error('Failed to add movie');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMultiSelectChange = (selected) => {
        setFormData({ ...formData, date: selected });
    };

    return (
        <div className='admin_container'>
            {isAdmin && (
                <div className="admin_form">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Tytuł filmu"
                            placeholder="Tytuł filmu"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />

                        <MultiSelect
                            label="Wybierz godziny"
                            placeholder="Wybierz godziny"
                            data={screeningSchedules}
                            value={formData.date}
                            onChange={handleMultiSelectChange}
                        />

                        <NumberInput
                            label="Od lat"
                            placeholder="Od lat"
                            value={formData.ageRating}
                            onChange={(value) => setFormData({ ...formData, ageRating: value })}
                        />

                        <Textarea
                            label="Opis"
                            placeholder="Opis"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />

                        <NumberInput
                            label="Długość filmu"
                            placeholder="Długość filmu"
                            value={formData.length}
                            onChange={(value) => setFormData({ ...formData, length: value })}
                        />

                        <TextInput
                            label="Kraj produkcji"
                            placeholder="Kraj produkcji"
                            value={formData.countryProduction}
                            onChange={(e) => setFormData({ ...formData, countryProduction: e.target.value })}
                        />

                        <NumberInput
                            label="Rok produkcji"
                            placeholder="Rok produkcji"
                            value={formData.yearProduction}
                            onChange={(value) => setFormData({ ...formData, yearProduction: value })}
                        />
                        
                        <Space h="lg" />
                        <Space h="lg" />
                        <Button type="submit" variant="filled" color="green" size="lg" radius="xl">Dodaj film</Button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminAddMovie;
