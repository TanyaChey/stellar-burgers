import React, { useMemo, FC } from 'react';

// Подключение компонентов
import Ingredient from '../ingredient/ingredient';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей и данных
import styles from './ingredients-row.module.css';
import shallowEqual from '../../utils/shallowEqual';

interface IIngredientsRowProps {
  data: {
    tabKey: string;
    tabName: string;
  };
  rowRef: React.RefObject<HTMLLIElement>;
}

// Компонент строки с ингредиентами для конкретной вкладки
const IngredientsRow: FC<IIngredientsRowProps> = ({ data, rowRef }) => {
  // Получение списка всех ингредиентов
  const { ingredients: allIngredients } = useSelector((state) => state.ingredientsData, shallowEqual);

  // Разделение данных вкладки на ключ и название
  const { tabKey, tabName } = data;

  // Фильтрация ингредиентов для текущей вкладки
  const filteredIngredients = useMemo(() => allIngredients.filter((ingredient) => ingredient.type === tabKey), [allIngredients, tabKey]);

  // Создание компонентов ингредиентов для текущей вкладки
  const ingredientComponents = useMemo(() => filteredIngredients.map((ingredient) => <Ingredient key={ingredient._id} data={ingredient} />), [filteredIngredients]);

  return (
    // Компонент строки списка ингредиентов
    <li ref={rowRef} id={tabKey} className={styles.row}>
      {/* Название вкладки */}
      <h2 className={'mb-6 text text_type_main-medium'}>{tabName}</h2>
      {/* Список компонентов ингредиентов */}
      <ul className={`${styles.list} mt-6`}>{ingredientComponents}</ul>
    </li>
  );
};

export default IngredientsRow;
