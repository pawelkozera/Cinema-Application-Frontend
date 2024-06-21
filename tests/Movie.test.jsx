import { it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Movies from '../src/routes/movies/movies.jsx';

it('Movies component rendering', async () => {
  const mockMoviesData = [
    {
      id: 1,
      title: 'Movie 1',
      type: 'Action',
      imageUrl: 'https://example.com/movie1.jpg',
      screeningDates: [{ id: 1, date: new Date().toISOString(), format: 'Napisy' }]
    },
    {
      id: 2,
      title: 'Movie 2',
      type: 'Comedy',
      imageUrl: 'https://example.com/movie2.jpg',
      screeningDates: [{ id: 2, date: new Date().toISOString(), format: 'Dubbing' }]
    }
  ];

  global.fetch = async () => ({
    json: async () => mockMoviesData
  });

  render(
    <MantineProvider>
      <MemoryRouter initialEntries={['/cinemaName']}>
        <Routes>
          <Route path="/:cinemaName" element={<Movies />} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>
  );

  const movie1Title = await screen.findByText(/Movie 1/i);
  const movie2Title = await screen.findByText(/Movie 2/i);

  expect(movie1Title).toBeInTheDocument();
  expect(movie2Title).toBeInTheDocument();

  const movie1Type = screen.getByText('Action');
  const movie2Type = screen.getByText('Comedy');

  expect(movie1Type).toBeInTheDocument();
  expect(movie2Type).toBeInTheDocument();

  const tomorrowCard = screen.getByText('Jutro');
  fireEvent.click(tomorrowCard);
});
