import React, { useMemo, FC } from 'react';
import { useParams } from 'react-router-dom';

// Подключение компонентов
import EnergyItem from '../energy-item/energy-item';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей
import styles from './ingredient-details.module.css';
import { DEFAULT_INFO_INGREDIENT } from '../../utils/constants';
import shallowEqual from '../../utils/shallowEqual';

// Основной компонент для информации об ингридиенте
const IngredientDetails: FC = () => {
  // Получение id ингредиента из URL с использованием хука useParams
  const { ingredientId } = useParams();

  // Получение данных об ингредиентах из Redux
  const { ingredients } = useSelector((state) => state.ingredientsData, shallowEqual);

  // Поиск ингредиента по id
  let selectedIngredient = ingredients.find((ingredient) => ingredient._id === ingredientId);

  // Используем значение по умолчанию, если ингредиент не найден
  if (!selectedIngredient) {
    selectedIngredient = { ...DEFAULT_INFO_INGREDIENT };
  }

  // Извлечение необходимых данных об ингредиенте
  const { proteins, fat, carbohydrates, calories, image, name } = selectedIngredient;

  // Подготовка данных об энергетической ценности
  const energyInfo = {
    'Белки,\u00A0г': proteins,
    'Жиры,\u00A0г': fat,
    'Углеводы,\u00A0г': carbohydrates,
    'Калории,\u00A0ккал': calories,
  };

  // Преобразование объекта в массив пар [ключ, значение]
  const energyArray = Object.entries(energyInfo);

  // Мемоизация массива компонентов EnergyItem
  const memoizedEnergyItems = useMemo(() => {
    // Итерация по массиву энергетической информации и создание компонентов
    return energyArray.map(([label, amount], index) => <EnergyItem key={index} data={{ label, amount }} />);
  }, [energyArray]);

  // Возвращение JSX компонента
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img className={`${styles.image} pl-5 pr-5 mb-4`} src={image} alt={name} />
        <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
        <ul className={`${styles.list} mt-8`}>{memoizedEnergyItems}</ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
