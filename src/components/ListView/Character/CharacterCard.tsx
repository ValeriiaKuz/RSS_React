import { FC } from 'react';
import { Character as CharacterType } from 'rickmortyapi';
import styles from './Chatacter.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
export interface CharacterProps {
  characterData: CharacterType;
}
export const CharacterCard: FC<CharacterProps> = ({ characterData }) => {
  const { image, name } = characterData;
  const navigate = useNavigate();
  const location = useLocation();
  const onItemClick = () => {
    navigate(`${location.pathname}` + '/details/' + `${characterData.id}`);
    window.scroll({ top: 0 });
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
      </div>
    </div>
  );
};
