import { useState, useEffect } from 'react';
import { Card, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import './select_cinema.css';

function SelectCinema() {
    const [cinemaNames, setCinemaNames] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/cinemas')
            .then(response => response.json())
            .then(data => {
                setCinemaNames(data);
            })
            .catch(error => {
                console.error('Error fetching cinema names:', error);
            });
    }, []);

    return (
        <div id='cinemas_container'>
            <h2>Wybierz kino</h2>

            <div className="cinemas">
                {cinemaNames.map((cinemaName, index) => (
                    <Link to={`/movies/${cinemaName}`} key={index}>
                        <Card shadow="sm" padding="xl" component="a">
                            <Text fw={500} size="lg" mt="md">
                                {cinemaName}
                            </Text>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SelectCinema;
