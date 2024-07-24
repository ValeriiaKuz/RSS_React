import { screen } from '@testing-library/react';
import { Detail } from './Detail';
import { describe, test, expect } from 'vitest';
import { renderWithProviders } from '../../helpers/testUtiles';

describe('Detail component', () => {
  test('shows loading message when data is loading', () => {
    renderWithProviders(<Detail />, {
      route: '/details/1',
      preloadedState: {
        rickAndMorty: {
          queries: {
            'getCharacter(1)': {
              data: null,
              error: null,
              status: 'pending'
            }
          }
        }
      }
    });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
