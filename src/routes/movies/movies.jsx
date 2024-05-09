import { Card, Image, Text, Space, Badge } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import './movies.css'
import logo from './a.png';

function Movies() {
    const { cinemaName } = useParams();
    const [moviesData, setMoviesData] = useState([]);
    const [availableFormats, setAvailableFormats] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/movie/${cinemaName}/movies`)
            .then(response => response.json())
            .then(data => {
                setMoviesData(data);
                const formats = new Set(data.flatMap(movie => movie.screeningDates.map(screening => screening.format)));
                setAvailableFormats(Array.from(formats));
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className='movies_container'>
            {moviesData.map(movie => (
                <div key={movie.id} className='movie'>
                    <div className="movies_image">
                        <Link to={`${movie.id}`}>
                            <Image
                                radius="md"
                                h={200}
                                w="auto"
                                fit="contain"
                                src={logo}
                            />
                        </Link>
                    </div>

                    <div className='movies_details'>
                        <Link to={`${movie.id}`}>
                            <h2>{movie.title}</h2>
                        </Link>
                        <Text>{movie.type}</Text>
                        {availableFormats.map(format => (
                            <Badge key={format} color={format === "Napisy" ? "green" : "grape"}>{format}</Badge>
                        ))}
                    </div>

                    <div className="movies_hours">
                        {movie.screeningDates.map(screening => (
                            <Link to={`${movie.id}/${screening.id}`}>
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
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Movies;
