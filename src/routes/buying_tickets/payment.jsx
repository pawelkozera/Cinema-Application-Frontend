import { useEffect, useState } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect, em } from '@mantine/core';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { useUser } from '../../context/userContext';

import './payment.css'
import logo from './a.png';
import seats from './b.png';

function Payment() {
    const { email } = useUser();
    const [initialEmail, setInitialEmail] = useState(email);

    useEffect(() => {
        setInitialEmail(email);
    }, [email]);

    const form = useForm({
        initialValues: {
            email: initialEmail || '',
            paymentMethod: '',
        },

        validate: {
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                return emailRegex.test(value) ? null : "Niepoprawny adres email";
            }
        },
    });

    const { cinemaName, movieId, scheduleId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [screening, setScreening] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(17);
    const token = JSON.parse(localStorage.getItem('JWT'));

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
        const ticketPrice = calculatePrice();

        const ticketInformation = {
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
        }

        const order = {
            price: ticketPrice,
            currency: "PLN",
            method: "paypal",
            intent: "sale",
            description: "description",
            id: movieId,
            ticket: ticketInformation,
        };

        localStorage.setItem('ticketInformation', JSON.stringify(ticketInformation));
    
        try {
            const response = await fetch(`http://localhost:8080/api/payment/pay?cinemaName=${cinemaName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token.jwtToken}` })
                },
                body: JSON.stringify(order),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("PayPal approval URL:", data.approvalUrl);
                localStorage.setItem('ticketId', JSON.stringify(data.ticketId));

                window.location.href = data.approvalUrl;
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
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
                                    h={300}
                                    w="auto"
                                    fit="contain"
                                    src={movieData.imageUrl}
                                />
                            </Link>
                        </div>

                        <div class='selecting_seats_movie_information'>
                            <Link to={`/${cinemaName}/movies/${movieId}`}> <h1 className='movie_title'> {movieData.title} </h1> </Link>
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
