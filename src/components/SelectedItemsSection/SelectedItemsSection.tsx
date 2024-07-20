import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import styles from './SelectedItemsSection.module.css';
import { unselectAll } from '../../store/slices/charactersSlice.ts';
import { useEffect, useState } from 'react';

export const SelectedItemsSection = () => {
  const { selectedCharacters } = useAppSelector(
    (state) => state.selectedCharacters
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(Boolean(selectedCharacters.length));
  }, [selectedCharacters.length]);

  const dispatch = useAppDispatch();

  const onResetClick = () => {
    dispatch(unselectAll());
  };

  const onArrowClick = () => {
    setIsVisible((prevState) => !prevState);
  };

  if (!selectedCharacters.length) {
    return null;
  }

  return (
    <section
      className={`${styles.selected_items} ${isVisible ? styles.visible : ''}`}
    >
      <span className={styles.arrow} onClick={onArrowClick} />
      <span>
        {selectedCharacters.length === 1
          ? '1 character is selected'
          : `${selectedCharacters.length} characters are selected`}
      </span>
      <div className={styles.buttons_wrapper}>
        <button className={styles.button}>Save</button>
        <button className={styles.button} onClick={onResetClick}>
          Reset all
        </button>
      </div>
    </section>
  );
};
