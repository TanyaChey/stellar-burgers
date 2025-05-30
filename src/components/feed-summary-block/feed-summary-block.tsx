import React, { FC } from 'react';

// Подключение стилей и данных
import styles from './feed-summary-block.module.css';

interface IFeedSummaryBlockProps {
  title: string;
  data: {
    number: number
  }[];
}

// Компонент для отображения блока с кратким обзором данных
const FeedSummaryBlock: FC<IFeedSummaryBlockProps> = ({ title, data }) => {
  // Формирование класса контейнера с использованием стилей и отступа вниз
  const containerClassName = `${styles.container} mb-15`;
  // Формирование класса списка с использованием стилей и отступа вверх
  const listClassName = `${styles.list} mt-6`;

  return (
    // Основной контейнер блока
    <div className={containerClassName}>
      {/* Заголовок блока */}
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      {/* Список данных */}
      <ul className={listClassName}>
        {/* Рендеринг элементов списка */}
        {data.map(({ number }) => (
          // Элемент списка с уникальным ключом, стилями и цветом текста
          <li key={number} className="text text_type_digits-default text_color_success">
            {/* Отображение числа */}
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedSummaryBlock;
