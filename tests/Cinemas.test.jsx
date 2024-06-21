import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import SelectCinema from '../src/routes/select_cinema/select_cinema';

const mockCinemasData = ['Cinema A', 'Cinema B', 'Cinema C'];


global.fetch = async () => ({
  json: async () => mockCinemasData
});

describe('SelectCinema Component', () => {
  it('renders cinema names correctly', async () => {
    render(
      <MantineProvider>
      <MemoryRouter>
        <SelectCinema />
      </MemoryRouter>
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Wybierz kino/i)).toBeInTheDocument();
      expect(screen.getByText('Cinema A')).toBeInTheDocument();
      expect(screen.getByText('Cinema B')).toBeInTheDocument();
      expect(screen.getByText('Cinema C')).toBeInTheDocument();
    });
  });

  it('navigates to movies route when cinema card is clicked', async () => {
    render(
      <MantineProvider>
      <MemoryRouter>
        <SelectCinema />
      </MemoryRouter>
      </MantineProvider>
    );

    await waitFor(() => {
      const cinemaCard = screen.getByText('Cinema A').closest('a');
      expect(cinemaCard).toBeInTheDocument();

      cinemaCard.click();

      expect(window.location.href).toContain('http://localhost:3000/');
    });
  });
});
