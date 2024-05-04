    import { Card, Image, Text, Space, Badge, TextInput, Select, Button, MultiSelect } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './payment.css'

    function Payment() {
        return (
            <div id='payment_container'>
                <div id="payment_leftside">
                    <TextInput
                        label="Email"
                        placeholder="Email"
                    />
                    <Space h="lg" />
                    <Select
                        label="Wybierz płatność"
                        placeholder="Wybierz płatność"
                        data={['PayPal', 'ING']}
                    />
                    <Space h="lg" />
                    <Text>Ilość: 2</Text>
                    <Space h="lg" />
                    <Text>Cena: 13 PLN </Text>
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Kup</Button>
                </div>

                <div id="payment_rightside">
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
            
                    <MultiSelect
                        label="Wybrane miejsca"
                        placeholder=""
                        data={["1", "2", "3", "4"]}
                        defaultValue={['3', '4']}
                        hidePickedOptions
                        disabled
                    />
                    <Space h="lg" />

                    <Image
                        radius="md"
                        h="400"
                        w="auto"
                        fit="contain"
                        src="https://plymouthartscinema.org/wp-content/uploads/2021/09/Access-seating-plan-Sep-2021-1000x752.png"
                    />
                </div>
            </div>
        );
    }

    export default Payment;