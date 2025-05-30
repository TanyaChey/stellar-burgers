import React, { useEffect, FC } from 'react';

// Подключение компонентов
import RenderContent from '../../components/render-content/render-content';
import FeedList from '../../components/feed-list/feed-list';
import FeedSummary from '../../components/feed-summary/feed-summary';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { wsOrdersConnectionStart, wsOrdersConnectionClosed } from '../../services/actions/orders';

// Подключение стилей и данных
import styles from './feed.module.css';
import { ERRORS } from '../../utils/constants';

const FeedPage: FC = () => {
  const dispatch = useDispatch();

  // Получение состояний из Redux
  const { isLoading, hasConnectionFailed, orders } = useSelector((state) => state.ordersData);

  // Запуск WebSocket соединения при монтировании компонента
  useEffect(() => {
    dispatch(wsOrdersConnectionStart());
    // Функция, вызываемая при размонтировании компонента для закрытия WebSocket соединения
    return () => {
      dispatch(wsOrdersConnectionClosed());
    };
  }, [dispatch]); // Зависимость только от dispatch, так как используются функции из замыкания

  // Класс заголовка ленты
  const headingClass = 'mb-5 text text_type_main-large';

  return (
    <div className={`${styles.container} pt-10 pb-10`}>
      <RenderContent isLoading={isLoading} hasError={hasConnectionFailed} error={ERRORS.allOrders}>
        <h1 className={headingClass}>Лента заказов</h1>
        <div className={styles.information}>
          <FeedList data={orders} /> {/* Компонент списка заказов */}
          <FeedSummary /> {/* Компонент сводной информации о заказах */}
        </div>
      </RenderContent>
    </div>
  );
};

export default FeedPage;
