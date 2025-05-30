import React, { useRef, FC } from 'react';
import { useSearchParams } from 'react-router-dom';

// Подключение компонентов
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { deleteIngredient, sortIngredients } from '../../services/actions/burger';

// Подключение Drag and Drop
import { useDrag, useDrop } from 'react-dnd';

// Подключение стилей
import styles from './burger-ingredient.module.css';

// Импорт пользовательских PropTypes
import shallowEqual from '../../utils/shallowEqual';
import { IUuid } from '../../utils/types/types';
import { IIngredient } from '../../utils/types/ingredients';

interface IIngredientProps {
  position?: 'top' | 'bottom';
  isIconVisible: boolean;
  data: IIngredient & IUuid;
}

// Компонент ингридиента бургера
const Ingredient: FC<IIngredientProps> = ({ position, isIconVisible, data }) => {
  // Получение диспетчера Redux
  const dispatch = useDispatch();

  // Получение массива ингредиентов из Redux-состояния
  const { ingredients: burgerIngredients } = useSelector((state) => state.burgerData, shallowEqual);

  // Получаем объект searchParams и метод для его обновления через react-router-dom
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // Деструктуризация данных ингредиента
  const { name, uuid, price, image } = data;

  // Определение видимости иконки для перетаскивания ингредиентов
  const iconVisibilityClass = isIconVisible ? styles.icon_visible : styles.icon_hidden;

  // Функция для обработки удаления ингредиента
  const handleIngredientDelete = () => {
    dispatch(deleteIngredient(uuid));

    // Находим индекс элемента в массиве burgerIngredients по uuid
    const ingredientIndex = burgerIngredients.findIndex((item: IUuid) => item.uuid === uuid);
    if (ingredientIndex !== -1) {
      // Удаляем ингредиент из массива burgerIngredients
      const updatedBurgerIngredients = [...burgerIngredients];
      updatedBurgerIngredients.splice(ingredientIndex, 1);

      // Обновляем параметры поиска в URL с новым порядком ингредиентов
      const ingredientsIdsString = updatedBurgerIngredients.map((ingredient) => ingredient._id).join(',');
      urlSearchParams.set('ingredients', ingredientsIdsString);
      setUrlSearchParams(urlSearchParams.toString());
    }
  };

  // Хук для перетаскивания
  const [{ isDragging }, drag] = useDrag({
    type: 'sort-ingredient',
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Хук для обработки бросания
  const [, drop] = useDrop({
    accept: 'sort-ingredient',
    hover: (item: IUuid) => {
      const { uuid: sourceUuid } = item;
      const targetUuid = uuid;

      if (sourceUuid && targetUuid && sourceUuid !== targetUuid) {
        // Создаем копию массива ингредиентов
        const updatedBurgerIngredients = [...burgerIngredients];

        // Находим индексы элементов в массиве
        const sourceIndex = updatedBurgerIngredients.findIndex((item) => item.uuid === sourceUuid);
        const targetIndex = updatedBurgerIngredients.findIndex((item) => item.uuid === targetUuid);

        // Меняем местами объекты в массиве по найденным индексам
        const [movedItem] = updatedBurgerIngredients.splice(sourceIndex, 1);
        updatedBurgerIngredients.splice(targetIndex, 0, movedItem);

        // Диспетчер Redux для обновления порядка ингредиентов
        dispatch(sortIngredients(updatedBurgerIngredients));

        // Обновляем параметры поиска в URL с новым порядком ингредиентов
        const ingredientsIdsString = updatedBurgerIngredients.map((ingredient) => ingredient._id).join(',');
        urlSearchParams.set('ingredients', ingredientsIdsString);
        setUrlSearchParams(urlSearchParams.toString());
      }
    },
  });

  // Создаем общий реф для использования в перетаскивании и бросании
  const sharedRef = useRef<HTMLLIElement>(null);
  // Привязываем общий реф к обоим хукам, если иконка видима
  if (isIconVisible) {
    drag(sharedRef);
    drop(sharedRef);
  }

  return (
    <li
      className={`${styles.burger} ${position === 'top' || position === 'bottom' ? 'pr-4' : 'pr-2'}`}
      ref={sharedRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Иконка для перетаскивания ингредиентов */}
      <div className={iconVisibilityClass} ref={isIconVisible ? drag : null}>
        <DragIcon type="primary" />
      </div>

      {/* Элемент конструктора с информацией об ингредиенте */}
      <ConstructorElement
        handleClose={handleIngredientDelete}
        extraClass={styles.element}
        type={position}
        isLocked={position !== undefined}
        text={name + (position === 'top' ? ' (верх)' : '') + (position === 'bottom' ? ' (низ)' : '')}
        price={price}
        thumbnail={image}
      />
    </li>
  );
};

export default Ingredient;
