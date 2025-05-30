import React, { FC } from 'react';

// Подключение компонентов
import PriceBox from '../burger-price/burger-price';
import Burger from '../burger/burger';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей и данных
import styles from './burger-constructor.module.css';
import isEmpty from '../../utils/isEmpty';
import shallowEqual from '../../utils/shallowEqual';

// Основной компонент для страницы с ингредиентами бургера
const BurgerConstructor: FC = () => {
  // Используем хук useSelector для получения данных из Redux-стейта
  const { bun: burgerBun, ingredients: burgerIngredients } = useSelector((state) => state.burgerData, shallowEqual);

  // Проверка на наличие булки и ингредиентов перед отображением PriceBox
  const shouldRenderPriceBox = !isEmpty(burgerBun) && !isEmpty(burgerIngredients);

  return (
    // Основной контейнер для компонента конструктора
    <section className={`${styles.constructor} pt-25 pb-10`}>
      {/* Отображение компонента Burger */}
      <Burger />
      {/* Отображение компонента PriceBox, если необходимо */}
      {shouldRenderPriceBox && <PriceBox />}
    </section>
  );
};

export default BurgerConstructor;
