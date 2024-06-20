import React, { useState, useEffect } from 'react';
import { TextInput, NumberInput, Textarea, Button, MultiSelect, Select, Space } from '@mantine/core';
import { useParams } from 'react-router-dom';
import CustomNotification from '../../components/CustomNotification';

import './admin_style.css';

function AdminAddMovie() {
    const { cinemaName } = useParams();

    const [isMovieAdded, setIsMovieAdded] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [screeningSchedules, setScreeningSchedules] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        ageRating: '',
        description: '',
        length: '',
        countryProduction: '',
        yearProduction: '',
        category: '',
        type: '',
        imageUrl: '',
        screeningScheduleIds: [],
        cinemaIds: []
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
            const response = await fetch('http://localhost:8080/api/screeningSchedule/getUpcomingSchedules', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const formattedData = data.map(schedule => ({
                    value: String(schedule.id),
                    label: `${new Date(schedule.date).toLocaleString()} ${schedule.format}`
                }));
                setScreeningSchedules(formattedData);
            } else {
                console.error('Failed to fetch screening schedules');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchCinemas = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/getCinemaByName/${cinemaName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const formattedData = [{
                    value: String(data.id),
                    label: data.name
                }];
                setCinemas(formattedData);
            } else {
                console.error('Failed to fetch cinemas');
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
                    await fetchCinemas();
                }
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/movie/addMovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.jwtToken}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Movie added successfully');
                setFormData({
                    title: '',
                    ageRating: '',
                    description: '',
                    length: '',
                    countryProduction: '',
                    yearProduction: '',
                    category: '',
                    type: '',
                    imageUrl: '',
                    screeningScheduleIds: [],
                    cinemaIds: []
                });
                setIsMovieAdded(true);
            } else {
                console.error('Failed to add movie');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMultiSelectChange = (field, values) => {
        setFormData({ ...formData, [field]: values });
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
                            value={formData.screeningScheduleIds}
                            onChange={(values) => handleMultiSelectChange('screeningScheduleIds', values)}
                        />

                        <MultiSelect
                            label="Wybierz kina"
                            placeholder="Wybierz kina"
                            data={cinemas}
                            value={formData.cinemaIds}
                            onChange={(values) => handleMultiSelectChange('cinemaIds', values)}
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

                        <TextInput
                            label="Kategoria"
                            placeholder="Kategoria"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />

                        <TextInput
                            label="Typ"
                            placeholder="Typ"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        />

                        <TextInput
                            label="Link do miniatury"
                            placeholder="Link do miniatury"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />

                        <Space h="lg" />
                        <Space h="lg" />
                        <Button type="submit" variant="filled" color="green" size="lg" radius="xl">Dodaj film</Button>

                        <Space h="lg" />
                        <Space h="lg" />
                        {isMovieAdded && 
                            <CustomNotification
                            onClose={() => setIsMovieAdded(false)}
                            color="green"
                            radius="lg"
                            title="Informacja"
                            >
                                Nowy film został dodany!
                            </CustomNotification>
                        }
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminAddMovie;
