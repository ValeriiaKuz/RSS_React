import { FC, useEffect } from 'react';
import styles from './MainPage.module.css';
import { Search } from '../../components/Search/Search';
import { ListView } from '../../components/ListView/ListView';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
import { useCharacters, useSearchQuery } from '../../helpers/hooks';
import { Outlet } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';

export const MainPage: FC = () => {
  const { state, getAllCharacters, getSearchedValue } = useCharacters();
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

  const { error, isLoaded, items, info } = state;
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
          <Pagination totalCount={info.count} page={1} />
        </section>
      )}
      <Outlet />
    </main>
  );
};
