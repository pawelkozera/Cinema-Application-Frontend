    import { Card, Image, Text, Space, Badge } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './select_cinema.css'

    function SelectCinema() {
        return (
            <div id='cinemas_container'>
                <h2>Wybierz kino</h2>

                <div class="cinemas">
                    <Link to={"/movies"}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            >   

                            <Text fw={500} size="lg" mt="md">
                                Kino Kielce
                            </Text>
                        </Card>
                    </Link>

                    <Link to={"/movies"}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            >   

                            <Text fw={500} size="lg" mt="md">
                                Kino Radom
                            </Text>
                        </Card>
                    </Link>

                    <Link to={"/movies"}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            >   

                            <Text fw={500} size="lg" mt="md">
                                Kino Warszawa
                            </Text>
                        </Card>
                    </Link>
                </div>
            </div>
        );
    }

    export default SelectCinema;