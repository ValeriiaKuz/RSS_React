import './App.css';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ThemeContext } from './context/themeContext';
import { useState } from 'react';
import { ThemeWrapper } from './components/ThemeWrapper/ThemeWrapper.tsx';
import { Theme } from './pages/Main/MainPage-interface.ts';

export const App = () => {
  const [theme, setTheme] = useState(Theme.light);
  const toggleTheme = () => {
    setTheme((prevState) =>
      prevState === Theme.light ? Theme.dark : Theme.light
    );
  };
  return (
    <ErrorBoundary fallback={<ErrorComponent message={''} />}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeWrapper />
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
};
