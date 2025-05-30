import React, { FC } from 'react';

// Подключение компонентов
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение стилей
import styles from './modal-header.module.css';

interface IModalHeaderProps {
  title?: string;
  close: () => void;
}

// Компонент шапки модального окна
const ModalHeader: FC<IModalHeaderProps> = ({ title, close }) => {
  return (
    <div className={styles.header}>
      {title && <p className={`${styles.title} text text_type_main-large`}>{title}</p>}
      <div className={styles.button}>
        <CloseIcon type="primary" onClick={close} />
      </div>
    </div>
  );
};

export default ModalHeader;
