import React, { useMemo, FC } from 'react';
import { useLocation } from 'react-router-dom';

// Подключение компонентов
import FeedItem from '../feed-item/feed-item';
import EmptyBurgerMessage from '../empty-burger-message/empty-burger-message';

// Подключение стилей и данных
import styles from './feed-list.module.css';
import { IOrder } from '../../utils/types/order';

interface IFeedListProps {
  data: IOrder[];
}

// Компонент, отображающий список заказов
const FeedList: FC<IFeedListProps> = ({ data }) => {
  const location = useLocation();
  // Формирование класса для списка заказов с применением стилей и кастомной прокруткой
  const listClass = `${styles.list} pr-2 custom-scroll`;

  const feedItems = useMemo(() => {
    return data.map((orderData) => <FeedItem key={orderData._id} data={orderData} />);
  }, [data, location.pathname]);

  // Возвращение JSX разметки компонента
  return (
    <div className={styles.container}>
      {/* Список заказов, отображаемых с использованием компонента FeedItem */}
      {data.length === 0 ? (
        <EmptyBurgerMessage message="Список заказов пуст" />
      ) : (
        <ul className={listClass}>{feedItems}</ul>
      )}
    </div>
  );
};

export default FeedList;
