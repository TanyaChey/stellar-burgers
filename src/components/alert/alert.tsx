import React, { FC } from 'react';

// Подключение стилей и данных
import styles from './alert.module.css';
import { IImage } from '../../utils/types/types';

// Интерфейс для свойств компонента Alert
interface IAlertProps {
  title: string;
  text: string;
  image: IImage;
}

// Компонент Alert принимает три свойства: title, text и image.
const Alert: FC<IAlertProps> = ({ title, text, image }) => {
  // Извлекаем свойства src и alt из объекта image.
  const { src, alt } = image;

  // Возвращаем JSX разметку компонента Alert.
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {/* Выводим изображение с классом styles.image и добавляем отступ mb-6. */}
        <img className={`${styles.image} mb-6`} src={src} alt={alt} />

        {/* Заголовок с классом styles.text, текстовым стилем text_type_main-medium и отступом mb-6. */}
        <h1 className={`${styles.text} text text_type_main-medium mb-6`}>{title}</h1>

        {/* Параграф с классом styles.text, текстовым стилем text_type_main-default и неактивным цветом текста. */}
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{text}</p>
      </div>
    </div>
  );
};

export default Alert;
