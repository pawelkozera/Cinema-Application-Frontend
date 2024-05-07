    import { Card, Image, Text, Space, Badge, MultiSelect, Button } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './selecting_seats.css'
    import logo from './a.png';
    import seats from './b.png';

    function SelectSeats() {
        return (
            <div id='selecting_seats_container'>
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
                            <Link to={"/movies/id"}>
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

                    <div id="selecting_seats_transaction_details">
                        <MultiSelect
                            label="Wybierz miejsca"
                            placeholder="Wybierz miejsca"
                            data={["1", "2", "3", "4"]}
                            hidePickedOptions
                        />
                        <Space h="lg" />
                        <Text>Cena: </Text>
                        <Space h="lg" />
                        <Link to={"payment"}>
                            <Button variant="filled" color="green" size="lg" radius="xl">Dalej</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    export default SelectSeats;