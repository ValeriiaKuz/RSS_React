import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectedItemsSection } from './SelectedItemsSection';
import { unselectAll } from '../../store/slices/charactersSlice';

vi.mock('../../store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn()
}));

vi.mock('../CSV/CSV', () => ({
  CSV: () => <div>CSV Component</div>
}));

describe('SelectedItemsSection component', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly when there are selected characters', () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      selectedCharacters: [{ id: 1 }]
    });

    render(<SelectedItemsSection />);

    expect(screen.getByText(/1 character is selected/i)).toBeInTheDocument();
  });

  test('renders correctly with multiple selected characters', () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      selectedCharacters: [{ id: 1 }, { id: 2 }]
    });

    render(<SelectedItemsSection />);

    expect(screen.getByText(/2 characters are selected/i)).toBeInTheDocument();
  });

  test('calls unselectAll when Reset all button is clicked', () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      selectedCharacters: [{ id: 1 }]
    });
    (useAppDispatch as vi.Mock).mockReturnValue(dispatch);

    render(<SelectedItemsSection />);

    fireEvent.click(screen.getByText(/Reset all/i));

    expect(dispatch).toHaveBeenCalledWith(unselectAll());
  });
});
