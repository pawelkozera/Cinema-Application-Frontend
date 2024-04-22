    import { Card, Image, Text, Space, Badge } from '@mantine/core';

    import './movies.css'

    function Movies() {
    return (
        <div class='movies_container'>
            <div class='movie'>
                <div class="movies_image">
                    <Image
                        radius="md"
                        h={200}
                        w="auto"
                        fit="contain"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                    />
                </div>

                <div class='movies_details'>
                    <h2>Tytuł</h2>
                    <Text>Familijny</Text>
                    <Badge color="green">Napisy</Badge>
                    <Badge color="grape">Dubbing</Badge>    
                </div>

                <div class="movies_hours">
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

            <div class='movie'>
                <div class="movies_image">
                    <Image
                        radius="md"
                        h={200}
                        w="auto"
                        fit="contain"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                    />
                </div>

                <div class='movies_details'>
                    <h2>Tytuł</h2>
                    <Text>Familijny</Text>
                    <Badge color="green">Napisy</Badge>
                    <Badge color="grape">Dubbing</Badge>  
                </div>

                <div class="movies_hours">
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
                            13:00
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
                            16:00
                        </Text>
                        <Space h="xs" />
                        <Badge color="green">Napisy</Badge>
                    </Card>
                </div>
            </div>
        </div>
    );
    }

    export default Movies;