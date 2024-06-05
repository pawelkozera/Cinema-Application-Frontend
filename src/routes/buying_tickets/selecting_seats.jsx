import { useEffect, useState } from 'react';
import { Card, Image, Text, Space, Badge, MultiSelect, Button } from '@mantine/core';
import { Link, useParams } from "react-router-dom";

import './selecting_seats.css'
import logo from './a.png';
import seats from './b.png';

function SelectSeats() {
    const { cinemaName, movieId, scheduleId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [screening, setScreening] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [takenSeats, setTakenSeats] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(17);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/movie/${cinemaName}/movies/${movieId}`);
                const data = await response.json();
                const movie = data[0];
                const screening = movie.screeningDates.find(date => Number(date.id) === Number(scheduleId));
                console.log(movie);
                movie.screeningDates = [screening];
                setScreening(movie.screeningDates[0]);
                
                if (movie.type === "Familijny") {
                    setTicketPrice(14);
                }

                setMovieData(movie);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovieData();
    }, [cinemaName, movieId, scheduleId]);

    useEffect(() => {
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    }, [selectedSeats]);

    useEffect(() => {
        const initializeSeats = async () => {
            const seatsFromLocalStorage = JSON.parse(localStorage.getItem('selectedSeats'));
            if (seatsFromLocalStorage) {
                setSelectedSeats(seatsFromLocalStorage);
            }

            const takenSeats = await fetchTakenSeats();
            const availableSeats = await fetchAvailableSeats();

            const availableSeatsWithoutTaken = availableSeats.filter(seat => !takenSeats.includes(seat));
            setAvailableSeats(availableSeatsWithoutTaken);
        };

        initializeSeats();
    }, []);

    const fetchTakenSeats = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/screeningSchedule/getTakenSeats/${scheduleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTakenSeats(data.takenSeats);
                return data.takenSeats;
            } else {
                console.error('Failed to fetch taken seats');
                return [];
            }
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };

    const fetchAvailableSeats = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/room/getAvailableSeats/${scheduleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAvailableSeats(data.seats);
                return data.seats;
            } else {
                console.error('Failed to fetch available seats');
                return [];
            }
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };

    if (!movieData || !screening) {
        return <div>Loading...</div>;
    }

    const calculatePrice = () => {
        return selectedSeats.length * ticketPrice;
    }

    const canProceed = selectedSeats.length > 0;

    return (
        <div id='selecting_seats_container'>
            <div>
                <div id="selecting_seats_left_side">
                    <Image
                        radius="md"
                        h="400"
                        w="auto"
                        fit="contain"
                        src={seats}
                    />
                </div>
                <div id="selecting_seats_right_side">
                    <div class="selecting_seats_movie_details">
                        <div class="selecting_seats_movie_image">
                            <Link to={`/${cinemaName}/movies/${movieId}`}>
                                <Image
                                    radius="md"
                                    h={300}
                                    w="auto"
                                    fit="contain"
                                    src={movieData.imageUrl}
                                />
                            </Link>
                        </div>

                        <div class='selecting_seats_movie_information'>
                            <Link to={`/${cinemaName}/movies/${movieId}`}> <h1> {movieData.title} </h1> </Link>
                        </div>
                        <Card shadow="sm" padding="xl">
                            <Text fw={500} size="lg" mt="md">
                                {new Date(screening.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Text>
                            <Space h="xs" />
                            <Badge color={screening.format === "Napisy" ? "green" : "grape"}>
                                {screening.format}
                            </Badge>
                        </Card> 
                    </div>

                    <div id="selecting_seats_transaction_details">
                        <MultiSelect
                            label="Wybierz miejsca"
                            placeholder="Wybierz miejsca"
                            data={availableSeats}
                            value={selectedSeats}
                            onChange={setSelectedSeats}
                            hidePickedOptions
                        />
                        <Space h="lg" />
                        <Text>Cena: {calculatePrice()} zł</Text>
                        <Space h="lg" />
                        <Link to={canProceed ? "payment" : "#"}>
                            <Button variant="filled" color="green" size="lg" radius="xl" disabled={!canProceed}>Dalej</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectSeats;
