import React, { useState, useEffect } from 'react';
import { Select, Space, Button } from '@mantine/core';
import { useParams } from "react-router-dom";

import './admin_style.css'

function AdminDeleteMovie() {
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

    const { cinemaName } = useParams();
    const [moviesData, setMoviesData] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/movie/${cinemaName}/movies`)
            .then(response => response.json())
            .then(data => {
                setMoviesData(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleDeleteMovie = async () => {
        if (!selectedMovieId) return;

        try {
            const response = await fetch(`http://localhost:8080/api/movie/delete/${selectedMovieId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                console.log('Movie deleted successfully');
            } else {
                console.error('Failed to delete movie');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='admin_container'>
            {isAdmin && (
                <div className="admin_form">
                    <Select
                        label="Wybierz film"
                        placeholder="Wybierz film"
                        data={moviesData.map(movie => ({
                            value: movie.id.toString(),
                            label: movie.title
                        }))}
                        value={selectedMovieId}
                        onChange={setSelectedMovieId}
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="red" size="lg" radius="xl" onClick={handleDeleteMovie}>Usuń film</Button>
                </div>
            )}
        </div>
    );
}

export default AdminDeleteMovie;
