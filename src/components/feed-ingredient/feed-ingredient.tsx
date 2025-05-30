import React, { useMemo, FC } from 'react';

// Подключение компонентов
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedIcon from '../feed-icon/feed-icon';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей и данных
import styles from './feed-ingredient.module.css';
import shallowEqual from '../../utils/shallowEqual';
import { IIngredient } from '../../utils/types/ingredients';

interface IFeedIngredientProps {
  id: string;
  count: number;
}

// Компонент FeedIngredient принимает id и count в качестве свойств
const FeedIngredient: FC<IFeedIngredientProps> = ({ id, count }) => {
  // Получение списка ингредиентов из состояния Redux
  const { ingredients } = useSelector((state) => state.ingredientsData, shallowEqual);
  // Использование useMemo для мемоизации данных об ингредиенте по id
  const ingredient: IIngredient | undefined = useMemo(
    () => ingredients.find((ingredients) => ingredients._id === id),
    [ingredients, id],
  );

  if (!ingredient) return null;

  // Деструктуризация данных об ингредиенте
  const { name, price } = ingredient;

  // Визуальное представление компонента
  return (
    <li className={styles.container}>
      <FeedIcon id={id} />
      <h3 className={`${styles.name} text text_type_main-small`}>{name}</h3>
      <p className={`${styles.price} text text_type_digits-default`}>
        <span>{`${count} x ${price}`}</span>
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default FeedIngredient;
