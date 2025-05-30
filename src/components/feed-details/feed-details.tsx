import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';

// Подключение компонентов
import FeedItemPrice from '../feed-item-price/feed-item-price';
import FeedIngredient from '../feed-ingredient/feed-ingredient';
import RenderContent from '../render-content/render-content';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { getInformationOrder } from '../../services/thunk/order';

// Подключение стилей и данных
import styles from './feed-details.module.css';
import { ERRORS } from '../../utils/constants';
import formatDateTime from '../../utils/formatDateTime';
import getStatusMessage from '../../utils/getStatusMessage';
import mapIngredientsToCountArray from '../../utils/mapIngredientsToCountArray';
import shallowEqual from '../../utils/shallowEqual';

const FeedDetails: FC = () => {
  // Инициализация диспетчера для отправки действий в Redux
  const dispatch = useDispatch();
  const { information, isRequesting, hasRequestFailed } = useSelector((state) => state.orderData, shallowEqual);

  // Получение параметра feedNumber из URL с использованием хука useParams
  const { feedNumber } = useParams();

  // Использование хука useEffect для выполнения действия при монтировании компонента
  useEffect(() => {
    // Запрос информации о заказе с использованием Redux action
    dispatch(getInformationOrder(feedNumber));
  }, [dispatch, feedNumber]);

  if (!information) return null;

  // Деструктуризация данных о заказе из Redux state
  const { number, name, status, ingredients, createdAt: date } = information;
  // Получение сообщения и класса статуса с помощью функции getStatusMessage
  const statusData = getStatusMessage(status);
  // Преобразование ингредиентов в массив объектов с количеством
  const ingredientCountArray = mapIngredientsToCountArray(ingredients);

  // Возвращение компонента с данными заказа
  return (
    <RenderContent isLoading={isRequesting} hasError={hasRequestFailed} error={ERRORS.allOrders}>
      <div className={styles.container}>
        <div className={styles.info}>
          {/* Отображение номера заказа */}
          <p className={`${styles.number} text text_type_digits-default mb-10`}>{number}</p>
          {/* Отображение названия заказа */}
          <h1 className="text text_type_main-medium mt-10 mb-3">{name}</h1>
          {/* Отображение статуса заказа */}
          <p className={`text ${statusData.className} text_type_main-small mt-3 mb-15`}>{statusData.message}</p>
          {/* Заголовок для списка ингредиентов */}
          <h2 className="text text_type_main-medium mt-15 mb-6">Состав:</h2>
          {/* Список ингредиентов с использованием компонента FeedIngredient */}
          <ul className={`${styles.list} mt-6 mb-10 pr-6 custom-scroll`}>
            {ingredientCountArray.map(({ ingredient, count }) => (
              <FeedIngredient key={ingredient} id={ingredient} count={count} />
            ))}
          </ul>
          {/* Отображение времени создания заказа и общей стоимости */}
          <div className={`${styles.line} mt-10`}>
            <p className="text text_type_main-small text_color_inactive">{formatDateTime(date)}</p>
            <FeedItemPrice data={ingredients} />
          </div>
        </div>
      </div>
    </RenderContent>
  );
};

export default FeedDetails;
