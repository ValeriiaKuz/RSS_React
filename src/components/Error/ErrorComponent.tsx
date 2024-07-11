import { FC } from 'react';
import styles from './Error.module.css';
interface ErrorProps {
  message: string;
}
export const ErrorComponent: FC<ErrorProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <p className={styles.error_message}>
        Something went wrong
        <br />
        {message}
      </p>
    </div>
  );
};
