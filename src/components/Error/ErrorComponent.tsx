import { FC } from 'react';
import styles from './Error.module.css';
import { useNavigate, useRouteError } from 'react-router-dom';
interface ErrorProps {
  message?: string;
}
export const ErrorComponent: FC<ErrorProps> = ({ message }) => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  return (
    <div className={styles.error}>
      <p className={styles.error_message}>
        Something went wrong
        <br />
        {message || error.message}
      </p>
      <button onClick={() => navigate('/')}>Back to main page</button>
    </div>
  );
};
