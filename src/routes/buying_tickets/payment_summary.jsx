import { useEffect, useState } from 'react';
import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import CustomNotification from '../../components/CustomNotification';
import { useForm } from '@mantine/form';

import './payment_summary.css'
import logo from './a.png';

function PaymentSummary() {
    const { cinemaName, movieId, scheduleId, ticketUUID } = useParams();
    const [ticket, setTicket] = useState(null);
    const [showTicketDownloadNotification, setShowTicketDownloadNotification] = useState(false);
    const [showRefundNotification, setShowRefundNotification] = useState(false);

    const downloadTicketForm = useForm({});

    const refundForm = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                return emailRegex.test(value) ? null : "Niepoprawny adres email";
            },
        },
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/ticket/${ticketUUID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTicket(data);
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }, [ticketUUID]);

    if (!ticket) {
        return <div>Loading...</div>;
    }

    const handleSubmitDownloadTicket = (values) => {
        setShowTicketDownloadNotification(true);
    };

    const handleSubmitRefundTicket = (values) => {
        setShowRefundNotification(true);
    };

    return (
        <div id='payment_summary_container'>
            <div id='payment_summary_leftside'>
                <div class="selecting_seats_movie_details">
                    <div class="selecting_seats_movie_image">
                        <Image
                            radius="md"
                            h={150}
                            w="auto"
                            fit="contain"
                            src={logo}
                        />
                    </div>

                    <div class='selecting_seats_movie_information'>
                        <h1> {ticket.movieTitle} </h1>
                    </div>
                    <Card
                        shadow="sm"
                        padding="xl"
                        >

                        <Text fw={500} size="lg" mt="md">
                            {new Date(ticket.screeningDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </Text>
                        <Space h="xs" />
                        <Badge color={ticket.screeningFormat === "Napisy" ? "green" : "grape"}>{ticket.screeningFormat}</Badge>
                    </Card> 
                </div>

                <Space h="lg" />
                <Space h="lg" />
                <Text> Status transakcji: Zapłacono</Text>
                <Space h="lg" />
                <Space h="lg" />

                <Text> Ilość: {ticket.amount} </Text>
                <MultiSelect
                    label="Wybrane miejsca"
                    placeholder=""
                    data={ticket.seats.map(seat => ({ value: seat, label: seat }))}
                    value={ticket.seats}
                    hidePickedOptions
                    disabled
                />
                <Space h="lg" />
                <Text> Cena: {ticket.price} PLN </Text>

                <Space h="lg" />
                <Space h="lg" />
                <form onSubmit={downloadTicketForm.onSubmit((values) => handleSubmitDownloadTicket(values))}>
                    <Button type='submit' variant="filled" color="green" size="lg" radius="xl">Pobierz bilet</Button>
                </form>

                <Space h="xs" />
                <Space h="xs" />

                {showTicketDownloadNotification && (
                    <CustomNotification
                        onClose={() => setShowTicketDownloadNotification(false)}
                        color="green"
                        radius="lg"
                        title="Informacja"
                    >
                        Bilet został ponownie wysłany na podany przy zakupie adres email!
                    </CustomNotification>
                )}
            </div>

            <div id='payment_summary_rightside'>
                <form onSubmit={refundForm.onSubmit((values) => handleSubmitRefundTicket(values))}> 
                    <Text> Czas na zwrot biletu: </Text>
                    <Space h="xs" />
                    <Text> Pozostało 4 dni 2 godziny </Text>
                    <Space h="lg" />
                    <TextInput
                        label="Email"
                        placeholder='Email' 
                        {...refundForm.getInputProps('email')}
                    />
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button type='submit' variant="filled" color="green" size="lg" radius="xl">Zwrot biletu</Button>
                </form>

                <Space h="xs" />
                <Space h="xs" />

                {showRefundNotification && (
                    <CustomNotification
                        onClose={() => setShowRefundNotification(false)}
                        color="green"
                        radius="lg"
                        title="Informacja"
                    >
                        Potwierdzenie zwrotu biletu zostało wysłane na podany adres email!
                    </CustomNotification>
                )}
            </div>
        </div>
    );
}

export default PaymentSummary;