import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MoviesDetails from '../src/routes/movies_details/movies_details';
import { MantineProvider } from '@mantine/core';

const mockMovieData = [{
  title: 'Test Movie',
  type: 'Action',
  category: 'Action',
  ageRating: 12,
  length: 120,
  countryProduction: 'USA',
  imageUrl: 'test-image-url',
  description: 'Test',
  screeningDates: [
      { id: '1', date: '2024-06-21T10:00:00Z', format: 'Dubbing' },
      { id: '2', date: '2024-06-22T15:30:00Z', format: 'Napisy' }
  ]
}];

global.fetch = async () => ({
json: async () => mockMovieData
});
describe('MoviesDetails component', () => {
    it('renders movie details correctly', async () => {

        render(
          <MantineProvider>
          <MemoryRouter>
            <MoviesDetails />
          </MemoryRouter>
          </MantineProvider>
        );

        await screen.findByText('Test Movie');

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Od 12 lat')).toBeInTheDocument();
        expect(screen.getByText('120 min')).toBeInTheDocument();
        expect(screen.getByText('USA')).toBeInTheDocument();

        const temp = screen.getAllByText('Napisy');
    
        temp.forEach(temp => {
          expect(temp).toBeInTheDocument();
        });

        expect(screen.getByText('Opis')).toBeInTheDocument();
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

});
