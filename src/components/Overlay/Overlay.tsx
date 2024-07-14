import React, { FC } from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
  onOverlayClick: () => void;
}
export const Overlay: FC<OverlayProps> = ({ onOverlayClick }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onOverlayClick();
  };
  return <div className={styles.overlay} onClick={handleOverlayClick}></div>;
};
