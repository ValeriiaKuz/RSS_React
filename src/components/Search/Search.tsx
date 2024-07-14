import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './Search.module.css';
import { useSearchQuery } from '../../helpers/hooks';
import { useNavigate } from 'react-router-dom';
interface SearchProps {
  onSubmit: (value: string) => void;
}
export const Search: FC<SearchProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery] = useSearchQuery();
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchValue = inputValue.trim();
    onSubmit(searchValue);
    if (searchValue) {
      navigate('/search/1');
    } else {
      navigate('/');
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className={styles.search_form} onSubmit={onFormSubmit}>
      <input
        type={'text'}
        placeholder={'Character . . .'}
        className={styles.input}
        value={inputValue}
        onChange={onInputChange}
      />
      <button type={'submit'} className={styles.button}>
        Search
      </button>
    </form>
  );
};
