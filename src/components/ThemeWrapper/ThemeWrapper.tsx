import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext.tsx';
import styles from './ThemeWrapper.module.css';
import { Outlet } from 'react-router-dom';
import { Theme } from '../../pages/Main/MainPage-interface.ts';

export const ThemeWrapper = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === Theme.light ? styles.light : styles.dark}>
      <Outlet />
    </div>
  );
};
