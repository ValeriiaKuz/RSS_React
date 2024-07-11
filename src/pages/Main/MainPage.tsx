import { FC, useEffect } from 'react';
import styles from './MainPage.module.css';
import { Search } from '../../components/Search/Search';
import { ListView } from '../../components/ListView/ListView';
import { ComponentWithError } from '../../components/Error/ComponentWithError';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
import { useCharacters, useSearchQuery } from '../../helpers/hooks';

export const MainPage: FC = () => {
  const { state, getAllCharacters, getSearchedValue, dispatch } =
    useCharacters();
  const [searchQuery, setSearchQuery] = useSearchQuery();

  useEffect(() => {
    if (searchQuery) {
      getSearchedValue(searchQuery);
    } else {
      getAllCharacters();
    }
  }, [getSearchedValue, getAllCharacters, searchQuery]);

  const onFormSubmit = (value: string) => {
    setSearchQuery(value);
    if (value) {
      getSearchedValue(value);
    } else {
      getAllCharacters();
    }
  };
  const throwError = () => {
    dispatch({ type: 'SET_CLICKED_ERROR', payload: true });
  };

  const { error, isLoaded, items, clickedError } = state;
  return (
    <main className={styles.main_content__wrapper}>
      <section className={styles.search__section}>
        <Search onSubmit={onFormSubmit} />
      </section>
      {error ? (
        <ErrorComponent message={error.message} />
      ) : !isLoaded ? (
        <div>Loading...</div>
      ) : (
        <section className={styles.content__section}>
          <ListView data={items} />
          <button onClick={throwError} className={styles.button}>
            Throw error
          </button>
          {clickedError && <ComponentWithError />}
        </section>
      )}
    </main>
  );
};
