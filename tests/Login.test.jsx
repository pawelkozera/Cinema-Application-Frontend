import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Login from '../src/routes/login/Login.jsx';

describe('Login Component', () => {
  it('renders login form elements correctly', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByLabelText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();

    const loginButtons = screen.getAllByRole('button', { name: /Zaloguj/i });
    
    loginButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });

    expect(screen.getByText(/Nie pamiętam hasła/i)).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MantineProvider>
    );

    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Hasło/i);
    
    const submitButtons = screen.getAllByRole('button', { name: /Zaloguj/i });

    const submitButton = submitButtons[0];

    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);
  });

  it('handles Google login click', () => {
    render(
      <MantineProvider> 
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MantineProvider>
    );

    const googleLoginButton = screen.getByRole('button', { name: /Zaloguj się za pomocą Google/i });
    fireEvent.click(googleLoginButton);

    expect(window.location.href).toBe('http://localhost:3000/');
  });
});
