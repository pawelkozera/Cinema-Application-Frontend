    import { Card, Image, Text, Space, Badge, TextInput, NumberInput, Select, Textarea, Button, MultiSelect, PasswordInput } from '@mantine/core';
    import { Link } from "react-router-dom";

    import './admin_style.css'

    function AdminDeleteMovie() {
        return (
            <div class='admin_container'>
                <div class="admin_form">
                    <Select
                        label="Wybierz film"
                        placeholder="Wybierz film"
                        data={['Film 1', 'Film 2', 'Film 3']}
                    />
                    
                    <Space h="lg" />
                    <Space h="lg" />
                    <Button variant="filled" color="green" size="lg" radius="xl">Usuń film</Button>
                </div>
            </div>
        );
    }

    export default AdminDeleteMovie;