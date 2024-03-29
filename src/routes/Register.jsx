import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput } from '@mantine/core';

function Register() {
    const form = useForm({
        initialValues: {
            login: '',
            password: 'secret',
            confirmPassword: 'sevret',
        },

        validate: {
            confirmPassword: (value, values) =>
            value !== values.password ? 'Passwords did not match' : null,
        },
    });
    
    return (
    <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Login"
          placeholder='Login' 
          {...form.getInputProps('login')}
        />

        <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
        />

        <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
        />

        <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
        </Group>
        </form>
    </Box>
    );
}

export default Register;