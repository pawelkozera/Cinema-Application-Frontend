import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Register from '../src/routes/register/Register';

describe('Register Component', () => {
  it('renders register form elements correctly', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByLabelText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    const passwords = screen.getAllByLabelText(/Hasło/i);
    
    passwords.forEach(pass => {
      expect(pass).toBeInTheDocument();
    });
    
    expect(screen.getByLabelText(/Potwórz hasło/i)).toBeInTheDocument();

    const registerButtons = screen.getAllByRole('button', { name: /Zarejestruj/i });
    registerButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  it('submits form with correct data', async () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </MantineProvider>
    );

    const usernameInput = screen.getByLabelText(/Login/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInputs = screen.getAllByLabelText(/Hasło/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    
    const submitButtons = screen.getAllByRole('button', { name: /Zarejestruj/i });
    const submitButton = submitButtons[0];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@1234' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test@1234' } });
    fireEvent.click(submitButton);
  });

  it('shows validation errors for invalid form data', async () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </MantineProvider>
    );

    const usernameInput = screen.getByLabelText(/Login/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInputs = screen.getAllByLabelText(/Hasło/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    
    const submitButtons = screen.getAllByRole('button', { name: /Zarejestruj/i });
    const submitButton = submitButtons[0];

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'mismatch' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Login musi składać się z minimum 6 znaków/i)).toBeInTheDocument();
    expect(await screen.findByText(/Niepoprawny adres email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Hasło musi składać się z minimum 8 znaków/i)).toBeInTheDocument();
    expect(await screen.findByText(/Hasła nie pasują do siebie/i)).toBeInTheDocument();
  });
});
