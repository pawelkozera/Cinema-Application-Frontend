import { useEffect, useState } from 'react';
import { Card, Image, Text, Space, Badge } from '@mantine/core';
import { Link, useParams } from "react-router-dom";

import './movies_details.css'
import logo from './a.png';

function MoviesDetails() {
    const { cinemaName, movieId } = useParams();
    const [movieData, setMovieData] = useState([]);
    const [availableFormats, setAvailableFormats] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/movie/${cinemaName}/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                setMovieData(data);
                const formats = new Set(data.flatMap(movie => movie.screeningDates.map(screening => screening.format)));
                setAvailableFormats(Array.from(formats));
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div id='movies_container'>
            {movieData.map(movie => (
                <div id='movie'>
                    <div id="movie_image">
                        <Image
                            radius="md"
                            h={200}
                            w="auto"
                            fit="contain"
                            src={logo}
                        />
                    </div>

                    <div id="movie_information">
                        <div id="title">
                            <h1> {movie.title} </h1>
                            <Text id="category" c="dimmed">{movie.type}</Text>
                        </div>
                        <div id="movie_details">
                            <Text> {movie.category} </Text>
                            <Text> Od {movie.ageRating} lat </Text>
                            <Text> {movie.length} min </Text>
                            <Text> {movie.countryProduction} </Text>
                        </div>
                        <div id="movie_voice_type">
                            {availableFormats.map(format => (
                                <Badge key={format} color={format === "Napisy" ? "green" : "grape"}>{format}</Badge>
                            ))}
                        </div>

                        <div id="movie_hours">
                            <h2> Godziny </h2>
                            <div class="hours">
                                {movie.screeningDates.map(screening => (
                                    <div className='hour'>
                                        <Link to={`${screening.id}`}>
                                            <Card
                                                key={screening.date}
                                                shadow="sm"
                                                padding="xl"
                                                component="a"
                                            >
                                                <Text fw={500} size="lg" mt="md">
                                                    {new Date(screening.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </Text>
                                                <Space h="xs" />
                                                <Badge color={screening.format === "Napisy" ? "green" : "grape"}>{screening.format}</Badge>
                                            </Card>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div id="movie_description">
                            <h2> Opis </h2>
                            <Text> {movie.description} </Text>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MoviesDetails;