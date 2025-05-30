import React, { FC, useRef } from 'react';

// Подключение компонентов
import Tabs from '../tabs/tabs';
import Ingredients from '../ingredients/ingredients';

// Подключение стилей
import styles from './burger-ingredients.module.css';

// Основной компонент для страницы с ингредиентами
const BurgerIngredients: FC = () => {
  const rowsRefObj = {
    bun: useRef<HTMLLIElement>(null),
    sauce: useRef<HTMLLIElement>(null),
    main: useRef<HTMLLIElement>(null),
  };

  // Отображение компонента, если нет ошибок и данные загружены
  return (
    <section className={`${styles.ingredients} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <Tabs rowsRefObj={rowsRefObj} /> {/* Отображение вкладок */}
      <Ingredients rowsRefObj={rowsRefObj} /> {/* Отображение ингредиентов */}
    </section>
  );
};

export default BurgerIngredients;
