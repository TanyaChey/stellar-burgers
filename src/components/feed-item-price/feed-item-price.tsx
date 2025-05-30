import React, { FC } from 'react';

// Подключение компонентов
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей и данных
import styles from './feed-item-price.module.css';
import shallowEqual from '../../utils/shallowEqual';

interface IFeedItemPriceProps {
  data: string[];
}

// Компонент, отображающий цену для элемента ленты
const FeedItemPrice: FC<IFeedItemPriceProps> = ({ data = [] }) => {
  // Получаем доступ к данным о ингредиентах из хранилища
  const ingredients = useSelector((state) => state.ingredientsData.ingredients, shallowEqual);

  // Создаем объект-карту, сопоставляющий идентификатор ингредиента его цене
  const ingredientMap = ingredients.reduce((map: { [key: string]: number }, ingredient) => {
    map[ingredient._id] = ingredient.price;
    return map;
  }, {});

  // Вычисляем общую стоимость элемента ленты на основе данных и цен ингредиентов
  const totalPrice = data
    .map((ingredient) => ingredientMap?.[ingredient] || 0)
    .reduce((acc, price) => acc + price, 0);

  // Возвращаем отформатированный HTML с отображением цены и иконки валюты
  return (
    <p className={`${styles.price} text text_type_digits-default`}>
      <span>{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </p>
  );
};

export default FeedItemPrice;
