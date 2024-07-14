import { FC, useState } from 'react';
import { ITEM_PER_PAGE } from '../../constants/constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  totalCount: number;
  currentPage: number;
}
export const Pagination: FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onNextClick,
  onPrevClick
}) => {
  const [pages] = useState(Math.round(totalCount / ITEM_PER_PAGE));
  return (
    <div className={styles.paginator}>
      <button
        className={styles.arrow}
        type="button"
        onClick={onPrevClick}
        disabled={currentPage <= 1}
      >
        {'<'}
      </button>
      <ul className={styles.pages_list}>
        <li className={styles.pages_item}>{currentPage}</li>
        <li className={styles.pages_item}>|</li>
        <li className={styles.pages_item}>{pages}</li>
      </ul>
      <button
        className={styles.arrow}
        type="button"
        onClick={onNextClick}
        disabled={currentPage >= pages}
      >
        {'>'}
      </button>
    </div>
  );
};
