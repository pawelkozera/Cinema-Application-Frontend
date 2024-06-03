import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput, Notification } from '@mantine/core';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import './admin_style.css';

function AdminEditMovie() {
    const { cinemaName } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMovieEdited, setIsMovieEdited] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const token = JSON.parse(localStorage.getItem('JWT'));
    const [moviesData, setMoviesData] = useState([]);
    const [screeningSchedules, setScreeningSchedules] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        ageRating: '',
        description: '',
        length: '',
        countryProduction: '',
        yearProduction: '',
        category: '',
        type: '',
        screeningScheduleIds: [],
        cinemaIds: []
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

    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/movie/${cinemaName}/movies`);
            const data = await response.json();
            setMoviesData(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
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

    useEffect(() => {
        const fetchRole = async () => {
            if (token) {
                const isAdmin = await checkRole('ADMIN');
                setIsAdmin(isAdmin);
            }
        };
        fetchRole();
    }, [token]);

    useEffect(() => {
        fetchMovies();
        fetchScreeningSchedules();
    }, []);

    const handleMultiSelectChange = (field, values) => {
        setFormData({ ...formData, [field]: values });
    };

    const handleMovieSelect = (movieId) => {
        const selectedMovie = moviesData.find(movie => String(movie.id) === movieId);
        setSelectedMovieId(movieId);
        if (selectedMovie) {
            setFormData({
                title: selectedMovie.title,
                ageRating: selectedMovie.ageRating,
                description: selectedMovie.description,
                length: selectedMovie.length,
                countryProduction: selectedMovie.countryProduction,
                yearProduction: selectedMovie.yearProduction,
                category: selectedMovie.category,
                type: selectedMovie.type,
                screeningScheduleIds: selectedMovie.screeningDates.map(schedule => String(schedule.id)),
                cinemaIds: selectedMovie.cinemaIds
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/movie/update/${selectedMovieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.jwtToken}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Movie edited successfully');
                setFormData({
                    title: '',
                    ageRating: '',
                    description: '',
                    length: '',
                    countryProduction: '',
                    yearProduction: '',
                    category: '',
                    type: '',
                    screeningScheduleIds: [],
                    cinemaIds: []
                });
                setIsMovieEdited(true);
            } else {
                console.error('Failed to edit movie');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const moviesOptions = moviesData.map(movie => ({
        value: String(movie.id),
        label: movie.title
    }));

    return (
        <div className='admin_container'>
            {isAdmin && (
                <div className="admin_form">
                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Wybierz film"
                            placeholder="Wybierz film"
                            data={moviesOptions}
                            onChange={(value) => handleMovieSelect(value)}
                        />

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

                        <Space h="lg" />
                        <Space h="lg" />
                        <Button type="submit" variant="filled" color="green" size="lg" radius="xl">Edytuj film</Button>

                        <Space h="lg" />
                        <Space h="lg" />
                        {isMovieEdited && 
                            <Notification
                                onClose={() => setIsMovieEdited(false)}
                                color="green"
                                radius="lg"
                                title="Informacja"
                            >
                                Film został edytowany!
                            </Notification>
                        }
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminEditMovie;
