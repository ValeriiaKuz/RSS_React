import { FC } from 'react';
import styles from './Error.module.css';
import { useRouteError } from 'react-router-dom';
interface ErrorProps {
  message?: string;
}
export const ErrorComponent: FC<ErrorProps> = ({ message }) => {
  const error = useRouteError() as Error;
  return (
    <div className={styles.error}>
      <p className={styles.error_message}>
        Something went wrong
        <br />
        {message || error.message}
      </p>
    </div>
  );
};
