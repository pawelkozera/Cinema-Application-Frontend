import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button, Space, Text } from '@mantine/core';

function Pay() {
    const location = useLocation();
    const [queryParams, setQueryParams] = useState(null);
    const ticketId = JSON.parse(localStorage.getItem('ticketId'));
    const ticketInformation = JSON.parse(localStorage.getItem('ticketInformation'));
    const { cinemaName } = useParams();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('JWT'));

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const params = {};
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        setQueryParams(params);
    }, [location.search]);

    const handleSubmit = async () => {
        if (!queryParams || !queryParams.paymentId || !queryParams.PayerID) {
            console.error('Missing queryParams');
            return;
        }

        if (!ticketInformation) {
            console.error('No ticket information found');
            return;
        }

        if (!ticketId) {
            console.error('No ticket id found');
            return;
        }
    
        try {
            const dataToSend = JSON.stringify({
                uuid: ticketId,
            });

            const response = await fetch(`http://localhost:8080/api/payment/execute?paymentId=${queryParams.paymentId}&PayerID=${queryParams.PayerID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token.jwtToken}` })
                },
                body: dataToSend
            });
    
            if (response.ok) {
                const bookedTicket = await response.json();
                navigate(`/${cinemaName}/payment/${bookedTicket.uuid}`);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div id='pay'>
            <Text>Cena: {ticketInformation.price} PLN </Text>  
            <Space h="lg" />

            <Text>Miejsca: {ticketInformation.seats.join(', ')} </Text>  
            <Space h="lg" />

            <Text>Liczba biletów: {ticketInformation.amount} </Text>  
            <Space h="lg" />

            <Text>Tytuł filmu: {ticketInformation.movie.title} </Text>  
            <Space h="lg" />

            <Text>Data: {formatDate(ticketInformation.screeningSchedule.date)} </Text>  
            <Space h="lg" />

            <Text>Format: {ticketInformation.screeningSchedule.format} </Text>  
            <Space h="lg" />

            <Button onClick={handleSubmit}> Potwierdź zamówienie </Button>
        </div>
    );
}

export default Pay;
