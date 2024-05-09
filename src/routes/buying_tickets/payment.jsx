import { useEffect, useState } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect } from '@mantine/core';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';

import './payment.css'
import logo from './a.png';
import seats from './b.png';

function Payment() {
    const form = useForm({
        initialValues: {
            email: '',
            paymentMethod: '',
        },

        validate: {
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                return emailRegex.test(value) ? null : "Niepoprawny adres email";
            },
            paymentMethod: (value) => {
                return value ? null : "Proszę wybrać metodę płatności";
            }
        },
    });

    const { cinemaName, movieId, scheduleId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [screening, setScreening] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(17);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/movie/${cinemaName}/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                const movie = data[0];
                const screening = movie.screeningDates.find(date => Number(date.id) === Number(scheduleId));
                movie.screeningDates = [screening];
                setScreening(screening);
                if (movie.type === "Familijny") {
                    setTicketPrice(14);
                }

                setMovieData(movie);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, [cinemaName, movieId, scheduleId]);

    useEffect(() => {
        const seatsFromLocalStorage = JSON.parse(localStorage.getItem('selectedSeats'));
        if (seatsFromLocalStorage) {
            setSelectedSeats(seatsFromLocalStorage);
        }
    }, []);

    if (!movieData || !screening) {
        return <div>Loading...</div>;
    }

    const calculatePrice = () => {
        return selectedSeats.length * ticketPrice;
    }

    const handleSubmit = async (values) => {
        const { email, paymentMethod } = values;
        console.log(formatDateTime(screening.date));
    
        try {
            const response = await fetch('http://localhost:8080/api/ticket/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: calculatePrice(),
                    seats: selectedSeats,
                    amount: selectedSeats.length,
                    user: null,
                    movie: movieData,
                    screeningSchedule: {
                        id: screening.id,
                        date: formatDateTime(screening.date),
                        format: screening.format
                    }
                }),
            });
    
            if (response.ok) {
                const bookedTicket = await response.json();
                navigate(`${bookedTicket.uuid}`);
            } else {
                console.error('Error booking ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error booking ticket:', error.message);
        }
    };

    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    return (
        <div id='payment_container'>
            <div>
                <div id="payment_leftside">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput
                            label="Email"
                            placeholder="Email"
                            {...form.getInputProps('email')}
                        />
                        <Space h="lg" />
                        <Select
                            label="Wybierz płatność"
                            placeholder="Wybierz płatność"
                            data={['PayPal', 'ING']}
                            {...form.getInputProps('paymentMethod')}
                        />
                        <Space h="lg" />
                        <Text>Ilość: {selectedSeats.length}</Text>
                        <Space h="lg" />
                        <Text>Cena: {calculatePrice()} PLN </Text>  
                        <Space h="lg" />

                        <Button type='submit' variant="filled" color="green" size="lg" radius="xl">Kup</Button>
                    </form>
                </div>

                <div id="payment_rightside">
                    <div class="selecting_seats_movie_details">
                        <div class="selecting_seats_movie_image">
                            <Link to={`/${cinemaName}/movies/${movieId}`}>
                                <Image
                                    radius="md"
                                    h={150}
                                    w="auto"
                                    fit="contain"
                                    src={logo}
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

                    <Space h="lg" />
            
                    <MultiSelect
                        label="Wybrane miejsca"
                        placeholder=""
                        data={selectedSeats.map(seat => ({ value: seat, label: seat }))}
                        value={selectedSeats}
                        hidePickedOptions
                        disabled
                    />
                    
                    <Space h="lg" />

                    <Image
                        radius="md"
                        h="400"
                        w="auto"
                        fit="contain"
                        src={seats}
                    />
                </div>
            </div>
        </div>
    );
}

export default Payment;
