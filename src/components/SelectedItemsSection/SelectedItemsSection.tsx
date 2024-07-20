import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import styles from './SelectedItemsSection.module.css';
import { unselectAll } from '../../store/slices/charactersSlice.ts';

export const SelectedItemsSection = () => {
  const { selectedCharacters } = useAppSelector(
    (state) => state.selectedCharacters
  );
  const dispatch = useAppDispatch();

  const onResetClick = () => {
    dispatch(unselectAll());
  };
  if (!selectedCharacters.length) {
    return null;
  }
  return (
    <section className={styles.selected_items}>
      <div className={styles.selected_items__list}>
        <span>
          {selectedCharacters.length === 1
            ? '1 character is selected: '
            : `${selectedCharacters.length} characters are selected: `}
        </span>
        {selectedCharacters.map((item) => {
          return <span key={item.id}>{item.name},</span>;
        })}
      </div>
      <div className={styles.buttons_wrapper}>
        <button className={styles.button}>Save</button>
        <button className={styles.button} onClick={onResetClick}>
          Reset all
        </button>
      </div>
    </section>
  );
};
