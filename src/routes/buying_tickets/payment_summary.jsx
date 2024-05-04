    import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './payment_summary.css'

    function PaymentSummary() {
        return (
            <div id='payment_summary_container'>
                <div id='payment_summary_leftside'>
                    <div class="selecting_seats_movie_details">
                        <div class="selecting_seats_movie_image">
                            <Link to={"/movies/id"}>
                                <Image
                                    radius="md"
                                    h={150}
                                    w="auto"
                                    fit="contain"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                                />
                            </Link>
                        </div>

                        <div class='selecting_seats_movie_information'>
                            <Link to={"/movies/id"}> <h1>Tytuł</h1> </Link>
                        </div>
                        <Card
                            shadow="sm"
                            padding="xl"
                            >

                            <Text fw={500} size="lg" mt="md">
                                10:00
                            </Text>
                            <Space h="xs" />
                            <Badge color="green">Napisy</Badge>
                        </Card> 
                    </div>

                    <Space h="lg" />
                    <Space h="lg" />
                    <Text> Status transakcji: Zapłacono</Text>
                    <Space h="lg" />
                    <Space h="lg" />

                    <Text> Ilość: 2 </Text>
                    <MultiSelect
                        label="Wybrane miejsca"
                        placeholder=""
                        data={["1", "2", "3", "4"]}
                        defaultValue={['3', '4']}
                        hidePickedOptions
                        disabled
                    />
                    <Space h="lg" />
                    <Text> Cena: 13 PLN </Text>

                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Pobierz bilet</Button>
                </div>

                <div id='payment_summary_rightside'>
                    <Text> Czas na zwrot biletu: </Text>
                    <Space h="xs" />
                    <Text> Pozostało 4 dni 2 godziny </Text>
                    <Space h="lg" />
                    <TextInput
                        label="Email"
                        placeholder="Email"
                    />
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Zwrot biletu</Button>
                </div>
            </div>
        );
    }

    export default PaymentSummary;