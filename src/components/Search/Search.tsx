import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './Search.module.css';
import { useSearchQuery } from '../../helpers/hooks';
interface SearchProps {
  onSubmit: (value: string) => void;
}
export const Search: FC<SearchProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery] = useSearchQuery();

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchValue = inputValue.trim();
    onSubmit(searchValue);
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
