import React, { useEffect, useMemo, FC } from 'react';
import { useParams } from 'react-router-dom';

// Подключение компонентов
import RenderContent from '../render-content/render-content';

// Подключение Redux
import { useDispatch, useSelector } from '../../services/hooks';
import { getInformationOrder } from '../../services/thunk/order';

// Подключение стилей
import styles from './feed-status.module.css';
import { ERRORS } from '../../utils/constants';
import successImg from '../../assets/images/done.gif';
import getStatusMessage from '../../utils/getStatusMessage';
import shallowEqual from '../../utils/shallowEqual';

// Основной компонент для информации об ингридиенте
// Экспортируем компонент по умолчанию
const FeedStatus: FC = () => {
  // Получаем функцию dispatch из библиотеки react-redux
  const dispatch = useDispatch();
  // Извлекаем параметр feedNumber из URL с помощью хука useParams
  const { feedNumber } = useParams();

  // Извлекаем данные из глобального состояния с помощью хука useSelector
  const { information, request, requestFailed } = useSelector(({ orderData }) => orderData, shallowEqual);

  // Хук useEffect используется для выполнения действий после рендера компонента
  useEffect(() => {
    // Диспатчим экшн getInformationOrder с номером заказа при монтировании компонента
    dispatch(getInformationOrder(feedNumber));
  }, [dispatch, feedNumber]);

  // Деструктурируем объект information для удобства работы с данными заказа
  const { number = '', status = '' } = information;
  // Используем хук useMemo для мемоизации результатов функции getStatusMessage
  const statusData = useMemo(() => getStatusMessage(status), [status]);

  // Возвращаем компонент с использованием RenderContent для обработки состояний загрузки и ошибок
  return (
    <RenderContent isLoading={request} hasError={requestFailed} error={ERRORS.orderStatus}>
      <div className={styles.container}>
        <div className={styles.info}>
          {/* Отображаем номер заказа */}
          <p className={`${styles.number} text text_type_digits-large mt-4 mb-6`}>{number}</p>
          {/* Отображаем информацию об идентификаторе заказа */}
          <p className="text text_type_main-medium mt-6 mb-10">идентификатор заказа</p>
          {/* Отображаем изображение успешного выполнения заказа */}
          <img className={`${styles.img} mt-10 mb-10`} src={successImg} alt="success" />
          {/* Отображаем статус заказа */}
          <p className="text text_type_main-default mt-10 mb-2">{statusData.title}</p>
          {/* Отображаем текстовое описание статуса заказа */}
          <p className="text text_type_main-default text_color_inactive mt-2">{statusData.text}</p>
        </div>
      </div>
    </RenderContent>
  );
};

export default FeedStatus;
