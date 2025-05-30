import React, { useMemo, FC } from 'react';
import PropTypes from 'prop-types';

// Подключение стилей и данных
import styles from './feed-icon.module.css';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей и данных
import shallowEqual from '../../utils/shallowEqual';

interface IFeedIconProps {
  id: string;
  zIndex?: number;
  col?: number;
  hover?: boolean;
}

// Компонент FeedIcon, представляющий иконку ингредиента в ленте
const FeedIcon: FC<IFeedIconProps> = ({ id, zIndex, col }) => {
  // Получение списка ингредиентов из глобального состояния приложения
  const { ingredients } = useSelector((state) => state.ingredientsData, shallowEqual);

  // Поиск ингредиента по id и извлечение из него необходимых данных (изображение и имя)
  const findIngredient = useMemo(() => ingredients.find((ingredient) => ingredient._id === id), [ingredients, id]);

  const { image_mobile: image, name } = findIngredient || {};

  // Формирование класса изображения на основе условий (добавление класса при наличии col)
  const imageClassName = `${styles.image} ${col && styles.image_black}`;

  // Возвращение разметки компонента
  return (
    <div className={styles.container} style={{ zIndex }}>
      {/* Отображение изображения ингредиента */}
      <img className={imageClassName} src={image} alt={name} />

      {/* Отображение текста (если передан параметр col) */}
      {col && <p className={`${styles.text} text text_type_main-default`}>{col}</p>}
    </div>
  );
};

export default FeedIcon;
