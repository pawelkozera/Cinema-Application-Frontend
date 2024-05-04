    import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect, PasswordInput } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './account.css'
    import './history.css'

    function History() {
        return (
            <div class='account_container'>
                <div class="account_leftside_menu">
                    <Link to={"/account"}>
                        <Text> Dane </Text>
                    </Link>

                    <Link to={""}>
                        <Text> Historia </Text>
                    </Link>
                </div>
                <div class="account_rightside">
                    <Text> Liczba obejrzanych filmów: 2</Text>
                    <Space h="lg" />
                    <Space h="lg" />

                    <div class="account_movies_watched">
                        <Image
                            radius="md"
                            h={150}
                            w="auto"
                            fit="contain"
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                        />
                        <div>
                            <h2> Tytuł </h2>
                            <Badge color="green">Napisy</Badge>
                        </div>
                        <Button variant="filled" color="green" size="lg" radius="xl">Pobierz bilet</Button>
                    </div>
                </div>
            </div>
        );
    }

    export default History;