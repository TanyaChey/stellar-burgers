import React, { useMemo, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Подключение компонентов
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector, useDispatch } from '../../services/hooks';
import { sendNewOrder } from '../../services/thunk/burger';

// Подключение стилей и данных
import styles from './burger-price.module.css';
import isEmpty from '../../utils/isEmpty';
import shallowEqual from '../../utils/shallowEqual';
import { IUuid } from '../../utils/types/types';
import { IIngredient } from '../../utils/types/ingredients';

// Компонент для отображения цены бургера и кнопки оформления заказа
const PriceBox: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { bun: selectedBun, ingredients: selectedIngredients } = useSelector((state) => state.burgerData, shallowEqual);
  const { information: userInfo } = useSelector((state) => state.userData, shallowEqual);

  // Создаем массив идентификаторов ингредиентов для заказа
  const orderItems = useMemo(() => {
    const bunId = selectedBun?._id;
    const ingredientIds = selectedIngredients.map((ingredient: IIngredient & IUuid) => ingredient._id);
    return bunId ? [bunId, ...ingredientIds] : ingredientIds;
  }, [selectedBun, selectedIngredients]);

  // Рассчитываем общую стоимость бургера с помощью useMemo
  const totalPrice = useMemo(() => {
    const bunPrice = selectedBun ? selectedBun.price : 0;
    const ingredientsPrice = selectedIngredients.reduce(
      (total: number, ingredient: IIngredient & IUuid) => total + ingredient.price,
      0,
    );
    return bunPrice * 2 + ingredientsPrice;
  }, [selectedBun, selectedIngredients]);

  // Обработчик клика по кнопке оформления заказа
  const handleOrderButtonClick = () => {
    if (isEmpty(userInfo)) {
      navigate('/login');
      return;
    }
    // Отправляем заказ в Redux
    const state = { background: location };
    navigate('/new-feed', { state, replace: true });

    dispatch(sendNewOrder(orderItems));
  };

  // Проверяем, есть ли выбранные булочка и ингредиенты
  const isBurgerEmpty = isEmpty(selectedBun) || isEmpty(selectedIngredients);

  return (
    <div className={styles.container}>
      <p className={`${styles.price} text text_type_digits-medium`}>
        {totalPrice} {/* Иконка валюты */}
        <CurrencyIcon type="primary" />
      </p>
      {/* Кнопка для оформления заказа */}
      <Button
        type="primary"
        size="large"
        htmlType="button"
        onClick={handleOrderButtonClick}
        // Кнопка неактивна, если бургер не выбран
        disabled={isBurgerEmpty}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default PriceBox;
