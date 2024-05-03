    import { Card, Image, Text, Space, Badge } from '@mantine/core';

    import './movies_details.css'

    function MoviesDetails() {
    return (
        <div id='movies_container'>
            <div id='movie'>
                <div id="movie_image">
                    <Image
                        radius="md"
                        h={200}
                        w="auto"
                        fit="contain"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                    />
                </div>

                <div id="movie_information">
                    <div id="title">
                        <h1>Tytuł</h1>
                        <Text id="category" c="dimmed">Familijny</Text>
                    </div>
                    <div id="movie_details">
                        <Text> Komedia </Text>
                        <Text> Od 13 lat </Text>
                        <Text> 122 min </Text>
                        <Text> USA (2024) </Text>
                    </div>
                    <div id="movie_voice_type">
                        <Badge color="green">Napisy</Badge>
                        <Badge color="grape">Dubbing</Badge>  
                    </div>

                    <div id="movie_hours">
                        <h2> Godziny </h2>
                        <div class="hours">
                            <Card
                                shadow="sm"
                                padding="xl"
                                component="a"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                target="_blank"
                                >

                                <Text fw={500} size="lg" mt="md">
                                    10:00
                                </Text>
                                <Space h="xs" />
                                <Badge color="green">Napisy</Badge>
                            </Card>

                            <Card
                                shadow="sm"
                                padding="xl"
                                component="a"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                target="_blank"
                                >

                                <Text fw={500} size="lg" mt="md">
                                    12:30
                                </Text>
                                <Space h="xs" />
                                <Badge color="grape">Dubbing</Badge>  
                            </Card>

                            <Card
                                shadow="sm"
                                padding="xl"
                                component="a"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                target="_blank"
                                >

                                <Text fw={500} size="lg" mt="md">
                                    14:15
                                </Text>
                                <Space h="xs" />
                                <Badge color="green">Napisy</Badge>
                            </Card>
                        </div>
                    </div>

                    <div id="movie_description">
                        <h2> Opis </h2>
                        <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam odio, auctor in lorem eget, ornare semper lorem. 
                            Maecenas bibendum commodo velit id suscipit. Praesent eros mi, lacinia sit amet magna a, molestie fermentum diam. 
                            Etiam lobortis ante nec nisl rutrum suscipit. Nam tempor dolor enim, nec pellentesque ex imperdiet eget. 
                            Donec viverra, turpis eget sollicitudin eleifend, urna enim tincidunt ipsum, ut suscipit massa eros id eros. 
                            Phasellus nec porta elit. Duis imperdiet urna a neque molestie convallis. Nam tempus dui malesuada leo egestas, in gravida dolor scelerisque. 
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
    }

    export default MoviesDetails;