import { FC, useState } from 'react';
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
  const { image, name } = characterData;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isSelected, setSelected] = useState(characterData.selected);
  const onItemClick = () => {
    navigate(`${location.pathname}` + '/details/' + `${characterData.id}`);
    window.scroll({ top: 0 });
  };

  const onCheckboxChange = () => {
    setSelected((prevState) => !prevState);
    if (isSelected) {
      dispatch(unselectCharacter(characterData.id));
    } else {
      dispatch(selectCharacter(characterData.id));
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
          checked={isSelected}
          className={styles.checkbox}
        />
      </div>
    </div>
  );
};
