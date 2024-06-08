import { Card, Image, Text, Space, Badge, Group } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import './movies.css';
import logo from './a.png';

function Movies() {
    const { cinemaName } = useParams();
    const [moviesData, setMoviesData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetch(`http://localhost:8080/api/movie/${cinemaName}/movies`)
            .then(response => response.json())
            .then(data => {
                setMoviesData(data);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const generateNextSevenDays = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const nextSevenDays = generateNextSevenDays();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filteredMovies = moviesData.filter(movie =>
        movie.screeningDates.some(screening => {
            const screeningDate = new Date(screening.date);
            return screeningDate.toDateString() === selectedDate.toDateString();
        })
    );

    return (
        <div className='movies_container'>
            <div className='movies_date_selector'>
                <Group className='movies_date_selector_panel' position="center" spacing="xs">
                    {nextSevenDays.map(date => (
                        <Card
                            shadow="sm"
                            padding="xl"
                            radius="lg"
                            withBorder
                            p="xl"
                            key={date.toDateString()}
                            onClick={() => handleDateChange(date)}
                            className={`date-card ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                        >
                            <Text fw={500} size="lg" mt="md">
                                {formatDate(date)}
                            </Text>
                        </Card>
                    ))}
                </Group>
            </div>

            <div className='movies_list'>
                {filteredMovies.map(movie => (
                    <div key={movie.id} className='movie'>
                        <div className='left_side'>
                            <div className="movies_image">
                                <Link to={`${movie.id}`}>
                                    <Image
                                        radius="md"
                                        h={300}
                                        w="auto"
                                        fit="contain"
                                        src={movie.imageUrl}
                                    />
                                </Link>
                            </div>

                            <div className='movies_details'>
                                <Link to={`${movie.id}`}>
                                    <h2>{movie.title}</h2>
                                </Link>
                                <Text>{movie.type}</Text>
                                {Array.from(new Set(movie.screeningDates
                                    .filter(screening => {
                                        const screeningDate = new Date(screening.date);
                                        return screeningDate.toDateString() === selectedDate.toDateString();
                                    })
                                    .map(screening => screening.format)))
                                    .map(format => (
                                        <Badge key={format} color={format === "Napisy" ? "#38a169" : "#4b3361"}>{format}</Badge>
                                    ))}
                            </div>
                        </div>

                        <div className="movies_hours">
                            {movie.screeningDates
                                .filter(screening => {
                                    const screeningDate = new Date(screening.date);
                                    return screeningDate.toDateString() === selectedDate.toDateString();
                                })
                                .map(screening => (
                                    <Link key={screening.id} to={`${movie.id}/${screening.id}`}>
                                        <Card
                                            shadow="sm"
                                            padding="xl"
                                            component="a"
                                            withBorder p="xl"
                                        >
                                            <Text fw={500} size="lg" mt="md">
                                                {new Date(screening.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Text>
                                            <Space h="xs" />
                                            <Badge color={screening.format === "Napisy" ? "#38a169" : "#4b3361"}>{screening.format}</Badge>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movies;
