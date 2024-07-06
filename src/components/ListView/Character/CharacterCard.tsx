import { Component } from 'react';
import { Character as CharacterType } from 'rickmortyapi';
import styles from './Chatacter.module.css';
import { getStatusImage } from '../../../helpers/mappers';
interface CharacterProps {
  characterData: CharacterType;
}
export class CharacterCard extends Component<CharacterProps> {
  constructor(props: CharacterProps) {
    super(props);
  }
  render() {
    const { image, name, status } = this.props.characterData;
    return (
      <div className={styles.character_item}>
        <img src={image} alt={name} className={styles.character_image} />
        <div className={styles.character_info}>
          <p className={styles.character_name}>{name}</p>
          <div className={styles.character_status}>
            <p className={styles.status_text}>{status}</p>
            <img src={getStatusImage(status)} alt={status} />
          </div>
        </div>
      </div>
    );
  }
}
