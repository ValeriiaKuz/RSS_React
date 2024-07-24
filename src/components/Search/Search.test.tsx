import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Search } from './Search';
import { useSearchQuery } from '../../helpers/hooks';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

vi.mock('../../helpers/hooks', () => ({
  useSearchQuery: () => ['']
}));

describe('Search component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<Search onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Character . . ./i);
    const button = screen.getByRole('button', { name: /Search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('calls onSubmit with input value', () => {
    render(<Search onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Character . . ./i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'Rick Sanchez' } });

    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith('Rick Sanchez');
  });
});
