import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MainPage } from './MainPage';
import { renderWithProviders } from '../../helpers/testUtiles';

describe('MainPage component', () => {
  test('renders correctly', () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
