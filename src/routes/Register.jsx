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
            login: (value) => {
                return value.length <= 5 ? "Login must be at least 6 characters long" : null;
            },
            password: (value) => {
                if (!value || value.length < 8) {
                    return "Password must be at least 8 characters long";
                }
                if (!/[a-z]/.test(value)) {
                    return "Password must contain at least one lowercase letter";
                }
                if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                }
                if (!/\d/.test(value)) {
                    return "Password must contain at least one digit";
                }
                if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
                    return "Password must contain at least one special character";
                }
                
                return null;
            },
            confirmPassword: (value, values) => {
                return value !== values.password ? 'Passwords did not match' : null;
            },
        },
        onSuccess: (values) => handleSuccess(values)
    });

    const handleSuccess = (values) => {
        console.log('Poprawna walidacja! Wartości:', values);
    };
    
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