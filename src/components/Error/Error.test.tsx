import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ErrorComponent } from './ErrorComponent';
import { useNavigate, useRouteError } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useRouteError: vi.fn()
}));

describe('ErrorComponent', () => {
  const navigate = (useNavigate as vi.Mock).mockImplementation(() => vi.fn());

  test('displays default error message', () => {
    (useRouteError as vi.Mock).mockImplementation(
      () => new Error('Default error message')
    );

    render(<ErrorComponent />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Default error message/i)).toBeInTheDocument();
  });
});
