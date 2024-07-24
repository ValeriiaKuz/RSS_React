import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Header } from './Header';
import { Theme } from '../../pages/Main/MainPage-interface';
import { ThemeContext } from '../../context/themeContext';

const mockToggleTheme = vi.fn();

const renderWithContext = (theme: Theme) => {
  render(
    <ThemeContext.Provider value={{ theme, toggleTheme: mockToggleTheme }}>
      <Header />
    </ThemeContext.Provider>
  );
};

describe('Header component', () => {
  test('checkbox is checked when theme is light', () => {
    renderWithContext(Theme.light);

    const checkbox = screen.getByTestId('toggle');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is unchecked when theme is dark', () => {
    renderWithContext(Theme.dark);

    const checkbox = screen.getByTestId('toggle');
    expect(checkbox).not.toBeChecked();
  });

  test('calls toggleTheme when checkbox is clicked', () => {
    renderWithContext(Theme.light);

    const checkbox = screen.getByTestId('toggle');
    fireEvent.click(checkbox);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
