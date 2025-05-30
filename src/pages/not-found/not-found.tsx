import React from 'react';
import { Link } from 'react-router-dom';

// Подключение стилей и данных
import styles from './not-found.module.css';

// Компонент для отображения страницы "404 Страница не найдена"
export default function NotFoundPage() {
  return (
    // Обертка страницы с определенными стилями
    <div className={styles.container}>
      {/* Изображение для страницы 404 */}
      <img className={styles.image} src="https://lh3.googleusercontent.com/..." alt="Ошибка 404" />
      {/* Контейнер с информацией о 404 ошибке */}
      <div className={`${styles.info} text text_color_inactive`}>
        {/* Заголовок страницы */}
        <h1 className={`${styles.text} text_type_main-large text_color_primary`}>404 Страница не найдена</h1>
        {/* Текстовые блоки с пояснениями */}
        <div className={styles.texts}>
          {/* Первый текстовый блок */}
          <p className={`${styles.text} text_type_main-medium`}>Извините, но такой страницы нет на нашем сайте.</p>
          {/* Второй текстовый блок */}
          <p className={`${styles.text} text_type_main-medium`}>
            Возможно, вы ввели неправильный адрес или страница была удалена.
          </p>
        </div>
        {/* Переход на главную страницу */}
        <p className={`${styles.text} text_type_main-medium text_color_primary`}>
          Попробуйте вернуться на{' '}
          <Link className={`${styles.link} text_color_accent`} to="/">
            Главную страницу
          </Link>
        </p>
      </div>
    </div>
  );
}
