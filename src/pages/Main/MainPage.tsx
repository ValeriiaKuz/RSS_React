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
import { useAppSelector } from '../../store/hooks.ts';
import { CharacterWithSelectedProp } from './MainPage-interface.ts';
import { Header } from '../../components/Header/Header.tsx';

export const MainPage: FC = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const navigate = useNavigate();
  const pageFromParams = Number(useParams<{ page: string }>().page);
  const [currentPage, setCurrentPage] = useState(pageFromParams || 1);
  const { data, error, isLoading } = useGetCharactersQuery({
    name: searchQuery,
    page: currentPage
  });
  const { selectedCharacters } = useAppSelector(
    (state) => state.selectedCharacters
  );
  const hasOutlet = useOutlet();
  const items: CharacterWithSelectedProp[] =
    data?.results?.map((item) => ({
      ...item,
      selected: selectedCharacters.includes(item.id)
    })) || [];
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
    <>
      <Header />
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
              {items && <ListView data={items} />}
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
    </>
  );
};
