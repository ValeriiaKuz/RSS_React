import { FC, useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import { Search } from '../../components/Search/Search';
import { ListView } from '../../components/ListView/ListView';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
import { useSearchQuery } from '../../helpers/hooks';
import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { Overlay } from '../../components/Overlay/Overlay';
import { useGetCharactersQuery } from '../../store/api';

export const MainPage: FC = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const navigate = useNavigate();
  const pageFromParams = Number(useParams<{ page: string }>().page);
  const [currentPage, setCurrentPage] = useState(pageFromParams || 1);
  const { data, error, isLoading } = useGetCharactersQuery({
    name: searchQuery,
    page: currentPage
  });
  const hasOutlet = useOutlet();

  useEffect(() => {
    if (searchQuery && currentPage) {
      navigate(`/search/${currentPage}`);
    } else {
      navigate(`/${currentPage || ''}`);
    }
  }, [searchQuery, currentPage, navigate]);

  const onFormSubmit = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
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
        <ErrorComponent />
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <section
          className={`${styles.content__section} ${hasOutlet ? styles.with_outlet : ''}`}
        >
          <div className={styles.main__content}>
            {hasOutlet && <Overlay onOverlayClick={onOverlayClick} />}
            {data.results && <ListView data={data.results} />}
            {data.info && (
              <Pagination
                totalCount={data.info.count}
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
      ) : null}
    </main>
  );
};
