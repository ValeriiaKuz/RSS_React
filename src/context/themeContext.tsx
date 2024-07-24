import { createContext } from 'react';
import { Theme } from '../pages/Main/MainPage-interface.ts';

export const ThemeContext = createContext({
  theme: Theme.light,
  toggleTheme: () => {}
});
