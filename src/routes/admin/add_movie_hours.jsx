    import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './admin_style.css'

    function AdminAddMovieHours() {
        return (
            <div class='admin_container'>
                <div class="admin_form">
                    <TextInput
                        label="Godzina filmu"
                        placeholder="Godzina filmu"
                    />

                    <Select
                        label="Typ filmu"
                        placeholder="Wybierz typ filmu"
                        data={['Napisy', 'Dubbing']}
                    />

                    <Select
                        label="Sala"
                        placeholder="Wybierz sale"
                        data={['Sala A', 'Sala B']}
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Dodaj godzinę</Button>
                </div>
            </div>
        );
    }

    export default AdminAddMovieHours;