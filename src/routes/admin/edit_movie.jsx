    import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './admin_style.css'

    function AdminEditMovie() {
        return (
            <div class='admin_container'>
                <div class="admin_form">
                    <Select
                        label="Wybierz film"
                        placeholder="Wybierz film"
                        data={['Film 1', 'Film 2', 'Film 3']}
                    />

                    <TextInput
                        label="Tytuł filmu"
                        placeholder="Tytuł filmu"
                    />

                    <MultiSelect
                        label="Wybierz godziny"
                        placeholder="Wybierz godziny"
                        data={['10:00 Dubbing Sala A', '10:00 Napisy Sala A', '10:0 Napisy Sala B']}
                    />

                    <NumberInput
                        label="Od lat"
                        placeholder="Od lat"
                    />

                    <Textarea
                        label="Opis"
                        placeholder="Opis"
                    />

                    <NumberInput
                        label="Długość filmu"
                        placeholder="Długość filmu"
                    />

                    <TextInput
                        label="Kraj produkcji"
                        placeholder="Kraj produkcji"
                    />

                    <NumberInput
                        label="Rok produkcji"
                        placeholder="Rok produkcji"
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Edytuj film</Button>
                </div>
            </div>
        );
    }

    export default AdminEditMovie;