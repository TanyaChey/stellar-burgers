import React, { useMemo, FC } from 'react';
import { useSearchParams } from 'react-router-dom';

// Подключение компонентов
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import EmptyBurgerMessage from '../empty-burger-message/empty-burger-message';

// Подключение Redux
import { useSelector, useDispatch } from '../../services/hooks';
import { addIngredient, addBun } from '../../services/actions/burger';

// Подключение Drag and Drop
import { useDrop } from 'react-dnd';

// Подключение стилей и данных
import styles from './burger.module.css';
import isEmpty from '../../utils/isEmpty';
import shallowEqual from '../../utils/shallowEqual';

import { IUuid } from '../../utils/types/types';
import { IIngredient } from '../../utils/types/ingredients';

// Компонент для ингредиентов бургера
const Burger: FC = () => {
  // Получение диспетчера Redux и данных о булочке и ингредиентах из Redux-стейта
  const dispatch = useDispatch();
  const { bun: burgerBun, ingredients: burgerIngredients } = useSelector((state) => state.burgerData, shallowEqual);

  // Получаем объект searchParams и метод для его обновления
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // Проверка наличия булки и ингредиентов
  const hasBun = !isEmpty(burgerBun);
  const hasIngredients = !isEmpty(burgerIngredients);

  // Мемоизированный список отрисованных ингредиентов
  const renderedIngredients = useMemo(() => {
    if (hasIngredients) {
      return burgerIngredients.map((ingredient: IIngredient & IUuid) => (
        <BurgerIngredient isIconVisible={true} data={ingredient} key={ingredient.uuid} />
      ));
    }
    return null;
  }, [burgerIngredients]);

  // Drag-and-drop хуки для обработки перетаскивания ингредиентов
  const [{ isHover }, drop] = useDrop({
    accept: 'choose-ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: IIngredient & IUuid) {
      // Обработка перетаскивания булки или ингредиента
      if (item.type === 'bun') {
        dispatch(addBun(item));
        urlSearchParams.set('bun', item._id);
      } else {
        dispatch(addIngredient(item));
        burgerIngredients.push(item);
        urlSearchParams.set(
          'ingredients',
          burgerIngredients.map((ingredient: IIngredient & IUuid) => ingredient._id).join(','),
        );
      }
      setUrlSearchParams(urlSearchParams.toString());
    },
  });

  return (
    <ul ref={drop} style={{ opacity: isHover ? 0.5 : 1 }} className={styles.burgerList}>
      {!isEmpty(hasBun) ? (
        <>
          {/* Верхняя часть булки */}
          <BurgerIngredient position="top" isIconVisible={false} data={burgerBun} />
          {hasIngredients ? (
            // Список ингредиентов с прокруткой
            <ul className={`${styles.ingredientsList} pr-2 custom-scroll`}>{renderedIngredients}</ul>
          ) : (
            // Сообщение о пустом бургере без начинки
            <EmptyBurgerMessage message="Булочки без начинки - это невкусно! Добавьте начинку и соусы, чтобы было пожирней, повкусней!" />
          )}
          {/* Нижняя часть булки */}
          <BurgerIngredient position="bottom" isIconVisible={false} data={burgerBun} />
        </>
      ) : (
        // Сообщение о несобранном бургере
        <EmptyBurgerMessage message="Соберите свой бургер. Начните с булок и не забудьте о начинке и соусах! Давайте, перетаскивайте сюда скорее всё самое вкусное!" />
      )}
    </ul>
  );
};

export default Burger;
