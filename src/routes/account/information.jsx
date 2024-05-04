    import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect, PasswordInput } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './information.css'
    import './account.css'

    function Information() {
        return (
            <div class='account_container'>
                <div class="account_leftside_menu">
                    <Link to={""}>
                        <Text> Dane </Text>
                    </Link>

                    <Link to={""}>
                        <Text> Historia </Text>
                    </Link>
                </div>
                <div class="account_rightside">
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
        );
    }

    export default Information;