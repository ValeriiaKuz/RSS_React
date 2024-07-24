import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider
} from 'react-router-dom';
import { CharacterCard } from './CharacterCard';
import { CharacterWithSelectedProp } from '../../../pages/Main/MainPage-interface';
import { test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Detail } from '../../Details/Detail';

describe('Character card', () => {
  const mockData: CharacterWithSelectedProp = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
    episode: [''],
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3'
    },
    selected: false
  };

  test('renders the specified data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterCard characterData={mockData} />
        </BrowserRouter>
      </Provider>
    );

    const nameElement = screen.getByText(/Rick Sanchez/i);
    expect(nameElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });
  test('navigates to character detail page on click', async () => {
    const routes = [
      {
        path: '/1',
        element: <CharacterCard characterData={mockData} />
      },
      {
        path: '/1/details/:id',
        element: <Detail />
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/1']
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const user = userEvent.setup();

    const cardElement = screen.getByTestId('character-card');

    await user.click(cardElement);

    await waitFor(() => {
      expect(screen.getByTestId('detail')).toBeInTheDocument();
    });
  });
});
