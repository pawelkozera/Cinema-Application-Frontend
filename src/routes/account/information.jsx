import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect, PasswordInput } from '@mantine/core';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import './information.css'
import './account.css'

function Information() {
    const { cinemaName } = useParams();

    return (
        <div class='account_container'>
            <div class="account_leftside_menu">
                <Link to={""}>
                    <Text> Dane </Text>
                </Link>

                <Link to={`/${cinemaName}/history`}>
                    <Text> Historia </Text>
                </Link>
            </div>
            <div class="account_rightside">
                <div id='account_information_details'>
                    <Text> Email: test@gmail.com</Text>
                    <Space h="lg" />
                    <Space h="lg" />

                    <PasswordInput
                        label="Stare hasło"
                        placeholder="Stare hasło"
                    />
                    <Space h="lg" />

                    <PasswordInput
                        label="Nowe hasło"
                        placeholder="Nowe hasło"
                    />
                    <Space h="lg" />

                    <PasswordInput
                        label="Powtórz nowe hasło"
                        placeholder="Powtórz nowe hasło"
                    />
                    <Space h="lg" />
                    <Space h="lg" />

                    <Button variant="filled" color="green" size="lg" radius="xl">Zmień hasło</Button>
                </div>
            </div>
        </div>
    );
}

export default Information;