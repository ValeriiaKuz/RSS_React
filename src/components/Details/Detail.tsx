import styles from './Detail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorComponent } from '../Error/ErrorComponent';
import { getStatusImage } from '../../helpers/mappers';
import { useGetCharacterQuery } from '../../store/api';
export const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCharacterQuery(Number(params.id));
  const onCloseClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorComponent />;
  }
  return (
    <div className={styles.detail}>
      <div className={styles.close} onClick={onCloseClick}></div>
      {data && (
        <>
          <img
            src={data.image}
            alt={data.name}
            className={styles.character_image}
          />
          <div className={styles.character_info}>
            <p>Name: {data.name}</p>
            <div className={styles.character_status}>
              <p>Status: {data.status}</p>
              <img src={getStatusImage(data.status)} alt={data.status} />
            </div>
            <p>Gender: {data.gender}</p>
            <p>Species: {data.species}</p>
          </div>
        </>
      )}
    </div>
  );
};
