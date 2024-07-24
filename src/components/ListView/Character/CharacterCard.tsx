import { FC } from 'react';
import styles from './Chatacter.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks.ts';
import {
  selectCharacter,
  unselectCharacter
} from '../../../store/slices/charactersSlice.ts';
import { CharacterWithSelectedProp } from '../../../pages/Main/MainPage-interface.ts';
export interface CharacterProps {
  characterData: CharacterWithSelectedProp;
}
export const CharacterCard: FC<CharacterProps> = ({ characterData }) => {
  const { image, name, selected } = characterData;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const onItemClick = () => {
    navigate(`${location.pathname}` + '/details/' + `${characterData.id}`);
    window.scroll({ top: 0 });
  };

  const onCheckboxChange = () => {
    if (selected) {
      dispatch(unselectCharacter(characterData));
    } else {
      dispatch(selectCharacter(characterData));
    }
  };
  return (
    <div
      className={styles.character_item}
      onClick={onItemClick}
      data-testid="character-card"
    >
      <img src={image} alt={name} className={styles.character_image} />
      <div className={styles.character_info}>
        <p className={styles.character_name}>{name}</p>
        <input
          type={'checkbox'}
          onChange={onCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          checked={selected}
          className={styles.checkbox}
        />
      </div>
    </div>
  );
};
