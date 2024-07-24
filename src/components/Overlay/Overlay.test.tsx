import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Overlay } from './Overlay';

describe('Overlay component', () => {
  test('calls onOverlayClick when clicked', () => {
    const mockOnOverlayClick = vi.fn();

    render(<Overlay onOverlayClick={mockOnOverlayClick} />);

    const overlayElement = screen.getByTestId('overlay');
    fireEvent.click(overlayElement);

    expect(mockOnOverlayClick).toHaveBeenCalled();
  });
});
