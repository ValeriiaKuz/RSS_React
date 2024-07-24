import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ThemeWrapper } from './ThemeWrapper';
import { Theme } from '../../pages/Main/MainPage-interface';
import { ThemeContext } from '../../context/themeContext';
import styles from './ThemeWrapper.module.css';

vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Mocked Outlet</div>
}));

describe('ThemeWrapper component', () => {
  test('add light class when theme is light', () => {
    const theme = Theme.light;

    render(
      <ThemeContext.Provider value={{ theme }}>
        <ThemeWrapper />
      </ThemeContext.Provider>
    );

    const wrapperElement = screen.getByText('Mocked Outlet').parentElement;
    expect(wrapperElement).toHaveClass(styles.light);
  });
});
