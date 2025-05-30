import React, { useMemo, FC } from 'react';

// Подключение компонентов
import FeedSummaryBlock from '../feed-summary-block/feed-summary-block';
import FeedSummaryItem from '../feed-summary-item/feed-summary-item';

// Подключение Redux
import { useSelector } from '../../services/hooks';

// Подключение стилей и данных
import styles from './feed-summary.module.css';
import { ORDER_STATUSES } from '../../utils/constants';
import shallowEqual from '../../utils/shallowEqual';

// Основной компонент FeedSummary
const FeedSummary: FC = () => {
  // Получение данных из Redux-стейта с использованием хука useSelector
  const { total, totalToday, orders } = useSelector((state) => state.ordersData, shallowEqual);

  // Используем useMemo для мемоизации отфильтрованных заказов и предотвращения лишних вычислений при изменении других зависимостей
  const filteredOrders = useMemo(() => {
    // Функция для фильтрации заказов по статусу и возврата первых 10 элементов
    const filterOrdersByStatus = (status: string) => orders.filter((order) => order.status === status).slice(0, 10);

    // Возвращаем объект с отфильтрованными заказами для "Готовы" и "В работе"
    return {
      completedOrders: filterOrdersByStatus(ORDER_STATUSES.done),
      pendingOrders: filterOrdersByStatus(ORDER_STATUSES.pending),
    };
  }, [orders]);

  // Возвращаем JSX разметку
  return (
    // Контейнер с использованием стилей из внешнего файла
    <div className={styles.container}>
      {/* Рендеринг блоков для "Готовы" и "В работе" с использованием вспомогательных компонентов */}
      <div className={styles.line}>
        <FeedSummaryBlock title="Готовы:" data={filteredOrders.completedOrders} />
        <FeedSummaryBlock title="В работе:" data={filteredOrders.pendingOrders} />
      </div>

      {/* Рендеринг суммарной информации с использованием вспомогательных компонентов */}
      <FeedSummaryItem title="Выполнено за все время:" value={total} />
      <FeedSummaryItem title="Выполнено за сегодня:" value={totalToday} />
    </div>
  );
};

export default FeedSummary;
