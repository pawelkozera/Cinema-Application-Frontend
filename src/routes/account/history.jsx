import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Space, Badge, Button } from '@mantine/core';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import './account.css'
import './history.css'
import logo from './a.png';

function History() {
    const { cinemaName } = useParams();
    const token = JSON.parse(localStorage.getItem('JWT'));
    const [moviesHistory, setMoviesHistory] = useState([]);

    const fetchMoviesHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/ticket/history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setMoviesHistory(data);
            } else {
                console.error('Failed to fetch cinemas');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchMoviesHistory();
    }, []);

    return (
        <div className='account_container'>
            <div className="account_leftside_menu">
                <Link to={`/${cinemaName}/account`}>
                    <Text> Dane </Text>
                </Link>

                <Link to={""}>
                    <Text> Historia </Text>
                </Link>
            </div>
            <div className="account_rightside">
                <Text> Liczba obejrzanych filmów: {moviesHistory.length}</Text>
                <Space h="lg" />
                <Space h="lg" />

                {moviesHistory.map((movie, index) => (
                    <div key={index} className="account_movies_watched">
                        <Image
                            radius="md"
                            h={150}
                            w="auto"
                            fit="contain"
                            src={movie.imageUrl || logo}
                        />
                        <div>
                            <h2>{movie.title}</h2>
                            <Badge color="green">{movie.type}</Badge>
                        </div>
                        <Button 
                            variant="filled" 
                            color="green" 
                            size="lg" 
                            radius="xl"
                            onClick={() => window.location.href = `/${cinemaName}/payment/${movie.ticketUUID}`}
                        >
                            Pobierz bilet
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;