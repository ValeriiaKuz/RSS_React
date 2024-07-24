import styles from './Header.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext.tsx';
import { Theme } from '../../pages/Main/MainPage-interface.ts';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <div className={styles.theme_toggler}>
        <input
          type="checkbox"
          id="toggle"
          className={styles.theme_toggler__checkbox}
          checked={theme === Theme.light}
          onChange={toggleTheme}
          data-testId={'toggle'}
        />
        <span
          aria-hidden="true"
          className={styles.theme_toggler__switch}
        ></span>
      </div>
    </header>
  );
};
