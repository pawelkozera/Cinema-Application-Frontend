    import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './admin_style.css'

    function AdminDeleteMovieHours() {
        return (
            <div class='admin_container'>
                <div class="admin_form">
                    <Select
                        label="Wybierz godzinę"
                        placeholder="Wybierz godzinę"
                        data={['10:00 Dubbing Sala A', '10:00 Napisy Sala A', '10:0 Napisy Sala B']}
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Usuń godzinę</Button>
                </div>
            </div>
        );
    }

    export default AdminDeleteMovieHours;