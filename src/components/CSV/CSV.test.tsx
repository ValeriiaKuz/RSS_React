import { screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { CSV } from './CSV';
import { renderWithProviders } from '../../helpers/testUtiles';

describe('CSV component', () => {
  test('does not display link when there are no selected characters', () => {
    renderWithProviders(<CSV />, {
      preloadedState: {
        selectedCharacters: { selectedCharacters: [] }
      }
    });
    expect(screen.queryByText(/Download CSV/i)).toBeNull();
  });
  test(' display link when there are no selected characters', () => {
    renderWithProviders(<CSV />, {
      preloadedState: {
        selectedCharacters: { selectedCharacters: ['1', '2'] }
      }
    });
    expect(screen.queryByText(/Download CSV/i)).toBeInTheDocument();
  });
});
