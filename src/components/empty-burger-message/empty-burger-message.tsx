import React, { FC } from 'react';

// Подключение компонентов
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение стилей и данных
import styles from './empty-burger-message.module.css';

// Компонент для отображения сообщения о том, что бургер-меню пусто
const EmptyBurgerMessage: FC<{ message: string }> = ({ message }) => {
  return (
    // Общий контейнер для компонента
    <div className={styles.container}>
      {/* Логотип, отображается в верхней части контейнера */}
      <div className={`${styles.logo}`}>
        <Logo />
      </div>
      {/* Сообщение о том, что бургер-меню пусто */}
      <p className={`${styles.message} text text_type_main-default text_color_inactive`}>{message}</p>
    </div>
  );
};

export default EmptyBurgerMessage;
