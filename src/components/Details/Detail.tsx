import { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCharacter } from '../../api/api';
import { ErrorComponent } from '../Error/ErrorComponent';
import { Character } from 'rickmortyapi';
import { getStatusImage } from '../../helpers/mappers';
export const Detail = () => {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [characterData, setCharacterData] = useState<null | Character>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterData = async () => {
      if (params.id) {
        try {
          setIsLoaded(false);
          setIsError(false);
          const result = await fetchCharacter(Number(params.id));
          setCharacterData(result);
          setIsLoaded(true);
        } catch (error) {
          setIsLoaded(true);
          setIsError(true);
        }
      }
    };

    fetchCharacterData();
  }, [params]);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <ErrorComponent />;
  }

  const onCloseClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.detail}>
      <div className={styles.close} onClick={onCloseClick}></div>
      {characterData && (
        <>
          <img
            src={characterData.image}
            alt={characterData.name}
            className={styles.character_image}
          />
          <div className={styles.character_info}>
            <p>Name: {characterData.name}</p>
            <div className={styles.character_status}>
              <p>Status: {characterData.status}</p>
              <img
                src={getStatusImage(characterData.status)}
                alt={characterData.status}
              />
            </div>
            <p>Gender: {characterData.gender}</p>
            <p>Species: {characterData.species}</p>
          </div>
        </>
      )}
    </div>
  );
};
