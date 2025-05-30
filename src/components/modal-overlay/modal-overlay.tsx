import React, { FC } from 'react';

// Подключение стилей и данных
import styles from './modal-overlay.module.css';

interface IRenderContentProps {
  onClose: () => void;
}

// Компонент оверлея модального окна
const ModalOverlay: FC<IRenderContentProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
