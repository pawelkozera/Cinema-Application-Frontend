import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminAddMovie from '../src/routes/admin/add_movie';
import { MantineProvider } from '@mantine/core';

describe('AddMovie component', () => {
    it('renders movie details correctly', async () => {

        render(
          <MantineProvider>
          <MemoryRouter>
            <AdminAddMovie />
          </MemoryRouter>
          </MantineProvider>
        );
    });

});
