import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { App } from './App';
import styles from './components/ThemeWrapper/ThemeWrapper.module.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  test('renders App without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('theme')).toBeInTheDocument();
  });

  test('has default theme light', () => {
    render(<App />);

    expect(screen.getByTestId('theme')).toHaveClass(styles.light);
  });

  test('ErrorBoundary displays ErrorComponent on error', () => {
    const ErrorBoundaryMock = () => {
      throw new Error('Test Error');
    };
    const MockErrorComponent = ({ message }: { message: string }) => (
      <div>{message}</div>
    );

    render(
      <BrowserRouter>
        <ErrorBoundary fallback={<MockErrorComponent message={'Test'} />}>
          <ErrorBoundaryMock />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });
});
