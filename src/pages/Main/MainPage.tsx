import { FC, useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import { Search } from '../../components/Search/Search';
import { ListView } from '../../components/ListView/ListView';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
import { useCharacters, useSearchQuery } from '../../helpers/hooks';
import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { Overlay } from '../../components/Overlay/Overlay';

export const MainPage: FC = () => {
  const { state, getAllCharacters, getSearchedValue } = useCharacters();
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const navigate = useNavigate();
  const pageFromParams = Number(useParams<{ page: string }>().page);
  const [currentPage, setCurrentPage] = useState(pageFromParams || 1);
  const { error, isLoaded, items, info } = state;
  const hasOutlet = useOutlet();

  useEffect(() => {
    if (searchQuery && currentPage) {
      getSearchedValue(searchQuery, currentPage);
      navigate(`/search/${currentPage}`);
    } else {
      getAllCharacters(currentPage);
      navigate(`/${currentPage || ''}`);
    }
  }, [getSearchedValue, getAllCharacters, searchQuery, currentPage, navigate]);

  const onFormSubmit = (value: string) => {
    setSearchQuery(value);
    if (value) {
      getSearchedValue(value);
      setCurrentPage(1);
    } else {
      getAllCharacters();
      setCurrentPage(1);
    }
  };

  const handlePrevClick = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const onOverlayClick = () => {
    navigate(-1);
  };
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
        <section
          className={`${styles.content__section} ${hasOutlet ? styles.with_outlet : ''}`}
        >
          <div className={styles.main__content}>
            {hasOutlet && <Overlay onOverlayClick={onOverlayClick} />}
            <ListView data={items} />
            {info && (
              <Pagination
                totalCount={info.count}
                currentPage={currentPage}
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
              />
            )}
          </div>
          {hasOutlet && (
            <div className={styles.outlet_content}>
              <Outlet />
            </div>
          )}
        </section>
      )}
    </main>
  );
};
