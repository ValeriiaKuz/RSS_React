import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Pagination } from './Pagination';
import { ITEM_PER_PAGE } from '../../constants/constants';

describe('Pagination component', () => {
  test('renders correctly ', () => {
    render(
      <Pagination
        totalCount={ITEM_PER_PAGE * 3}
        currentPage={1}
        onPrevClick={vi.fn()}
        onNextClick={vi.fn()}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('disables previous button on the first page', () => {
    const mockOnPrevClick = vi.fn();
    const mockOnNextClick = vi.fn();

    render(
      <Pagination
        totalCount={ITEM_PER_PAGE * 5}
        currentPage={1}
        onPrevClick={mockOnPrevClick}
        onNextClick={mockOnNextClick}
      />
    );

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on the last page', () => {
    const mockOnPrevClick = vi.fn();
    const mockOnNextClick = vi.fn();

    render(
      <Pagination
        totalCount={ITEM_PER_PAGE * 5}
        currentPage={5}
        onPrevClick={mockOnPrevClick}
        onNextClick={mockOnNextClick}
      />
    );

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPrevClick when previous button is clicked', () => {
    const mockOnPrevClick = vi.fn();
    const mockOnNextClick = vi.fn();

    render(
      <Pagination
        totalCount={ITEM_PER_PAGE * 5}
        currentPage={3}
        onPrevClick={mockOnPrevClick}
        onNextClick={mockOnNextClick}
      />
    );

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockOnPrevClick).toHaveBeenCalled();
  });

  test('calls onNextClick when next button is clicked', () => {
    const mockOnPrevClick = vi.fn();
    const mockOnNextClick = vi.fn();

    render(
      <Pagination
        totalCount={ITEM_PER_PAGE * 5}
        currentPage={3}
        onPrevClick={mockOnPrevClick}
        onNextClick={mockOnNextClick}
      />
    );

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockOnNextClick).toHaveBeenCalled();
  });
});
